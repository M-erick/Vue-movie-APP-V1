<!-- MovieDetailInfo.vue -->
<template>
  <div class="movie-detail-info">
    <div v-if="movie">
      <h2>{{ movie.title }}</h2>
    <div class="movie-details">
      <!-- <div class="movie-image">
        <img :src="movie.image" :alt="movie.title">
      </div> -->
      <div class="movie-description">
        <p>{{ movie.description }}</p>
        <p>Rating: {{ movie.rating }}</p>
        <!-- functionality of a user liking a movie -->
         <button @click="likeMovie" :disabled="isLiked">Like</button>
        <p v-if="isLiked">You liked this movie!</p>
      </div>
    </div>

    </div>
    <div v-else>
      <p>Loading...</p>

    </div>
   
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import axios from 'axios';

const movie = ref(null);
const router = useRouter();
const isLiked = ref(false);
const route = useRoute();


// store user info
const userLikes = ref({
  user_id:localStorage.getItem('id'),
  movie_id:route.params.id

});
// setting the values here by default 
// userLikes.user_id = localStorage.getItem('id');
// userLikes.movie_id  = route.params.id;
// message to be sent when a user likes a movie
const message = ref('');

onMounted(fetchMovie);
async function fetchMovie() {
  const movieID = route.params.id;
  try {
    const response = await axios.get(`http://localhost:3000/api/movies/${movieID}`);
    movie.value = response.data;
  } catch (error) {
    console.error('Failed to fetch movie:', error);
    movie.value = null;
  }
}

// function to set user that liked the movie 
const storeLikes = async()=>{
  try{
    const response = await axios.post( `http://localhost:3000/api/likes`,userLikes.value);
    console.log(response.data);

  }catch(error){
    console.error('Failed to store user Details',error);

  }
}

const likeMovie =()=> {
  // Send a request to your backend API to record the like for the movie
  if (!isLiked.value) {
    storeLikes();
    isLiked.value = true;
    // Display a message
    message.value = 'Movie Liked';
  }
  

}
</script>

<style scoped>
.movie-detail-info {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.movie-detail-info h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.movie-details {
  display: flex;
}

.movie-image {
  flex: 1;
}

.movie-image img {
  width: 100%;
  height: auto;
}

.movie-description {
  flex: 2;
  padding-left: 20px;
}

.movie-description p {
  font-size: 16px;
  line-height: 1.6;
}

.movie-description p:last-child {
  margin-top: 20px;
  font-weight: bold;
}

</style>
