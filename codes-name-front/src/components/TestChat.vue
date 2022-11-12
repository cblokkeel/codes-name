<template>
  <div>
    <ul>
      <li v-for="message of messages" :key="message.sender">
        {{ message.sender }}: {{ message.messageText }}
      </li>
    </ul>
    <form @submit.prevent="handleSendMessage">
      <input type="text" id="messageInput" v-model="messageInput" />
      <label for="messageInput"></label>
      <button>send</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
import { useSocketIO } from '../customHooks/useSocketIO';
import { ChatMessage } from '../types/index';

const { username, room } = defineProps({
  username: String,
  room: String,
});

const { socket } = useSocketIO('http://localhost:3000');

const messages: Ref<ChatMessage[]> = ref([]);
const messageInput = ref('');

const handleSendMessage = () => {
  if (messageInput.value !== '') {
    socket.send('message', { sender: username, room, message: messageInput });
  }
};

socket.on('messageClient', (message: ChatMessage) => {
  messages.value.push(message);
  messageInput.value = '';
});

onMounted(() => {
  socket.send('joinRoom', room);
});
</script>

<style scoped></style>
