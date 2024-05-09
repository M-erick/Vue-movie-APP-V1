<template>
  <div class="movies-container">
    <h2>Movies</h2>
    <ul class="movies-list">
      <li v-for="movie in movies" :key="movie.id" class="movie-item">
        <div class="movie-info">
          <h3>{{ movie.title }}</h3>
          <p>{{ movie.description }}</p>
          <!-- fetching  from DB -->
          <img :src="getMovieImageUrl(movie.image_url)" alt="Movie Image" class="movie-image" />
        </div>
        <div class="movie-buttons">
          <button class="delete-button" @click="deleteMovie(movie.id)">Delete</button>
          <button class="edit-button" @click="editMovie(movie.id)">Edit</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const movies = ref([]);
const router = useRouter();

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

function getMovieImageUrl(imagePath) {
  return `http://localhost:3000/${imagePath}`;
}
async function editMovie(movieId) {
  // Implement edit functionality, e.g., redirect to edit page or show modal
  router.push(`/update/${movieId}/edit`);
}
</script>

<style scoped>
.movies-container {
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.movies-list {
  list-style: none;
  padding: 0;
}

.movie-item {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.movie-info {
  flex-grow: 1;
}

.movie-buttons {
  display: flex;
  align-items: center;
}

.delete-button, .edit-button {
  padding: 5px 10px;
  margin-left: 10px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
}

.delete-button {
  background-color: #dc3545;
  color: white;
}

.edit-button {
  background-color: #007bff;
  color: white;
}
</style>
