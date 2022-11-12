<template>
  <div>
    <div v-if="!hasJoinedChat">
      <form @submit.prevent="handleJoinChat">
        <input id="username" required type="text" v-model="username" />
        <label for="username">Username</label>
        <input id="room" required type="text" v-model="room" />
        <label for="room">Room</label>
        <button>join</button>
      </form>
    </div>
    <div v-else>
      <TestChat :username="username" :room="room" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import TestChat from './TestChat.vue';

const hasJoinedChat: Ref<boolean> = ref(false);
const username: Ref<string> = ref('');
const room: Ref<string> = ref('');

const handleJoinChat = () => {
  if (username.value.trim() !== '' && room.value.trim() !== '') {
    hasJoinedChat.value = true;
  }
};
</script>
