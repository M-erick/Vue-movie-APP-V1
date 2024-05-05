<template>
  <div class="registration-form">
    <h2>Register</h2>
    <form @submit.prevent="registerUser">
     
     <!-- display messages here:errors and succes messages -->
       <div v-if="successMessage">{{ successMessage }}</div>
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="firstName" required>
      </div>
      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="lastName" required>
      </div>
       <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
            <p id="info">Already have an Account? <router-link to="/login"> SignIn</router-link></p>


      <button type="submit">Register</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const firstName =ref('');
    const lastName = ref('');

    // variable holding message 
    const successMessage = ref('');

    const error = ref('');

    const registerUser = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/users/register', {
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
    });

    successMessage.value = response.data.message;
  //  assessing the token from the local storage
   

    router.push('/');
  } catch (err) {
    error.value = err.response.data.message || 'An error occurred';
  }
};

    return { email, password,firstName,lastName, error, registerUser };
  }
};
</script>

<style scoped>
h2{
  text-align: center;
}
.registration-form {
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
