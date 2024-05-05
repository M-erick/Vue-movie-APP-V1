<template>
  <div>
    <header>
      <router-link to="/">
        <h1><span>LITE</span>Movies</h1>
      </router-link>
      <div class="user-details">
        <router-link v-if="!isLoggedIn" to="/login" @click="login">
          <h5>Login</h5>
        </router-link>
        <router-link v-else to="/logout" @click="logout">
          <h5>Logout</h5>
        </router-link>
        <router-link v-if="isLoggedIn" to="/profile">
          <h5>Profile</h5>
        </router-link>
      </div>
    </header>
    <!-- display data here -->
    <div class="bodySpace">
      <router-view/>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isLoggedIn = ref(false); 
const router = useRouter(); 

const logout=()=> {
  isLoggedIn.value = false;
  router.push('/login'); 
}
// const login=()=>{
//   isLoggedIn.value=false;
//   router.push('/login');
// }

const checkLoginStatus=()=> {
  const token = localStorage.getItem('token'); 
  isLoggedIn.value = !!token; 
}

checkLoginStatus();
</script>

<style lang="scss">
*{
  margin:0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;

&::selection{
  background: transparentize(#42B883,0.5);
}
}
body{
  background-color: white;
}
a {
  text-decoration: none;
}
header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding:10px 16px;
  background-color: #2C3D4E;
  box-shadow: 0px 0px 6px rgba(0,0,0,0.1);

h1 {
  color:#FFF;
  font-size: 28px;
  span {
    color:crimson;
  }
}
h5{
  color: #FFF;
}
.user-details{
  display: flex;
  justify-content: space-around;
  align-items: right;
  gap: 10px;
}
}
</style>
