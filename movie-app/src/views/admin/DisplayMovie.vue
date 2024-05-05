<!-- ReadMovies.vue -->
<template>
  <div>
    <h2>Movies</h2>
    <ul>
      <li v-for="movie in movies" :key="movie.id">
        <h3>{{ movie.title }}</h3>
        <p>{{ movie.description }}</p>
        <button @click="deleteMovie(movie.id)">Delete</button>
        <button @click="editMovie(movie.id)">Edit</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const movies = ref([]);

async function fetchMovies() {
  try {
    const response = await axios.get('http://localhost:3000/api/movies');
    movies.value = response.data;
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    movies.value = [];
  }
}

onMounted(fetchMovies);

async function deleteMovie(movieId) {
  try {
    await axios.delete(`http://localhost:3000/api/movies/${movieId}`);
    fetchMovies();
  } catch (error) {
    console.error('Failed to delete movie:', error);
  }
}

function editMovie(movieId) {
  // Implement edit functionality, e.g., redirect to edit page or show modal
}
</script>
