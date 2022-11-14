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
import { ChatMessage } from '../../../types/index';

const { username, room } = defineProps({
  username: String,
  room: String,
});

if (!room || room.trim() === '') {
  throw new Error('incorrect room');
}

const { socket } = useSocketIO('http://localhost:3000', room);

const messages: Ref<ChatMessage[]> = ref([]);
const messageInput = ref('');

const handleSendMessage = () => {
  if (messageInput.value !== '') {
    socket.emit('message', {
      sender: username,
      room,
      messageText: messageInput.value,
    });
    messageInput.value = '';
  }
};

socket.on('messageClient', (message: ChatMessage) => {
  console.log('receiving message', message);
  messages.value.push(message);
});
</script>

<style scoped></style>
