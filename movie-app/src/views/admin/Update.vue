<!-- UpdateMovie.vue -->
<template>
  <div>
    <h2>Edit Movie</h2>
    <form @submit.prevent="updateMovie" class="movie-form">
      <div class="form-group">
        <label for="title">Title:</label>
        <input id="title" v-model="formData.title" placeholder="Title">
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="formData.description" placeholder="Description"></textarea>
      </div>
      <div class="form-group">
        <label for="genre">Genre:</label>
        <input id="genre" v-model="formData.genre" placeholder="Genre">
      </div>
      <div class="form-group">
        <label for="releaseDate">Release Date:</label>
        <input type="date" id="releaseDate" v-model="formData.releaseDate" placeholder="Release Date">
      </div>
      <div class="form-group">
        <label for="rating">Rating:</label>
        <input type="number" id="rating" v-model.number="formData.rating" min="1" max="10" placeholder="Rating">
      </div>
      <button type="submit">Update</button>
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

async function updateMovie() {
  try {
    await axios.put(`http://localhost:3000/api/movies/${movieId.value}`, formData.value);
    // Optionally, you can redirect to the movies list page or show a success message
  } catch (error) {
    console.error('Failed to update movie:', error);
  }
}
</script>

<style scoped>
.movie-form {
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: bold;
}

input[type="text"],
input[type="number"],
textarea,
input[type="date"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
