<template>
  <div>
    <h2>Edit Movie</h2>
    <form @submit.prevent="updateMovie" class="movie-form">
      <div class="form-group">
        <label for="title">Title:</label>
        <input  type="text" id="title" v-model="formData.title" placeholder="Title">
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="formData.description" placeholder="Description"></textarea>
      </div>
      <div class="form-group">
        <label for="genre">Genre:</label>
        <input type="text" id="genre" v-model="formData.genre" placeholder="Genre">
      </div>
      <div class="form-group">
        <label for="releaseDate">Release Date:</label>
        <input type="date" id="releaseDate" v-model="formData.releaseDate" placeholder="Release Date">
      </div>
      <div class="form-group">
        <label for="image">Image:</label>
        <input type="file" id="image" @change="onFileChange" name="image">
      </div>
      <div class="form-group">
        <label for="rating">Rating:</label>
        <input type="number" id="rating" v-model="formData.rating" min="1" max="10" placeholder="Rating">
      </div>
      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import axios from 'axios';
import{useRouter,useRoute} from 'vue-router';

const  router = useRouter();
const route = useRoute();
const movieId = ref(null);
const formData = ref({
  title: '',
  description: '',
  genre: '',
  releaseDate: '',
  rating: ''
});

onMounted(() => {
  movieId.value = route.params.id;
  fetchMovieDetails();
});

async function fetchMovieDetails() {
  try {
    const response = await axios.get(`http://localhost:3000/api/movies/${movieId.value}`);
    const movie = response.data;
    // Set form data with movie details
    formData.value = {
      title: movie.title,
      description: movie.description,
      genre: movie.genre,
      releaseDate: movie.released_date,
      rating: movie.rating,
      imageUrl: movie.image_url
    };
  } catch (error) {
    console.error('Failed to fetch movie details:', error);
  }
}

// how can we define this route:research
// const movieId = route.params.id;
async function updateMovie() {
  try {
    const formDataObj = new FormData();
    formDataObj.append('title', formData.value.title);
    formDataObj.append('description', formData.value.description);
    formDataObj.append('genre', formData.value.genre);
    formDataObj.append('releaseDate', formData.value.releaseDate);
    formDataObj.append('rating', formData.value.rating);
    formDataObj.append('image', formData.value.image); 

    await axios.put(`http://localhost:3000/api/movies/${movieId.value}`, formDataObj, {
      headers: {
        'Content-Type': 'multipart/form-data' 
      }
    });
    // Redirect to movies list after updating
    router.push('/movies');
  } catch (error) {
    console.error('Failed to update movie:', error);
  }
}


// file update uploads 
function onFileChange(event) {
  const file = event.target.files[0];
  formData.value.image = file;
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
