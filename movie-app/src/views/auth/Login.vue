<template>
  <div class="login-form">
    <h2>Login</h2>
    <form @submit.prevent="loginUser">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <p id="info"> Do not  have an account?  <router-link to="/register"> Register</router-link></p>
      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
 import{ useRouter} from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const error = ref('');
    const  router = useRouter();

   const loginUser = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/users/login', {
      email: email.value,
      password: password.value
    });
    const token = response.data.token;

    localStorage.setItem('token', token);

    // Redirect the user to the home page 
    router.push('/');
  } catch (err) {
    error.value = err.response.data.message || 'An error occurred';
  }
};


    return { email, password, error, loginUser };
  }
};
</script>

<style scoped>
h2 {
    text-align: center;
}
.login-form {
  max-width: 400px;
  margin: 30px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
#info{
    padding-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.error {
  color: red;
}
</style>
