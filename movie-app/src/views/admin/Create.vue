<!-- CreateMovie.vue -->
<template>
  <div>
    <h2>Create Movie</h2>
    <form @submit.prevent="createMovie">
      <input v-model="formData.title" placeholder="Title">
      <input v-model="formData.description" placeholder="Description">
      <input v-model="formData.genre" placeholder="Genre">
      <input type="date" v-model="formData.releaseDate" placeholder="Release Date">
      <input type="number" v-model.number="formData.rating" min="1" max="10" placeholder="Rating">
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const formData = ref({
  title: '',
  description: '',
  genre: '',
  releaseDate: '',
  rating: null
});

async function createMovie() {
  try {
    await axios.post('http://localhost:3000/api/movies', formData.value);
    // Optionally, you can redirect to the movies list page or show a success message
    setTimeout(() => {
      router.push('/movies'); // Redirect to the movies list page
    }, 2000); // Redirect after 2 seconds (2000 milliseconds)
  } catch (error) {
    console.error('Failed to create movie:', error);
  }
}
</script>
