<template>
  <div class="logout">
    <button @click="logoutUser">Logout</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const error = ref('');

    const logoutUser = async () => {
    try {
        // Clear the JWT token from local storage
        localStorage.removeItem('token');
        console.log('Logged out successfully');
    } catch (err) {
        console.error('Logout error:', err);
    }
};


    return { error, logoutUser };
  }
};
</script>

<style scoped>
.logout {
  text-align: center;
}
button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
