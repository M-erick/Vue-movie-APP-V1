<template>
  <div>
    <h2>Create Movie</h2>
    <form @submit.prevent="createMovie" class="movie-form">
      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="formData.title" placeholder="Title">
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="formData.description" placeholder="Description"></textarea>
      </div>
      <div class="form-group">
        <label for="genre">Genre:</label>
        <input  type="text" id="genre" v-model="formData.genre" placeholder="Genre">
      </div>
      <div class="form-group">
        <label for="releaseDate">Release Date:</label>
        <input type="date" id="releaseDate" v-model="formData.releaseDate" placeholder="Release Date">
      </div>
      <div class="form-group">
        <label for="rating">Rating:</label>
        <input type="number" id="rating" v-model.number="formData.rating" min="1" max="10" placeholder="Rating">
      </div>
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const movieId = ref(null);
const formData = ref({
  title: '',
  description: '',
  genre: '',
  releaseDate: '',
  rating: null
});

async function createMovie() {
  try {
    await axios.post(`http://localhost:3000/api/movies`, formData.value);
  //  Redirect to the movies list page after 2 seconds
    setTimeout(()=>{
      router.push('/');
    },2000);
  } catch (error) {
    console.error('Failed to create movie:', error);
  }
}
</script>

<style scoped>
h2{
  text-align: center;
  padding-top: 10px;
  padding-bottom:2px;
}
.movie-form {
  max-width: 400px;
  margin: 30px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}


.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="number"],
textarea,
input[type="date"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  display: block;
  background-color: crimson;
  color: #fff;
  border: none;
  padding:10px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #0056b3;
}
</style>
