<template>
  <div class="home-page">
    <!-- Carousel of Images  implement carousel functionality here-->
<!-- :style="{ backgroundImage: `url(${backgroundImage})` }"" -->
    <div id="carousel" >
      <!-- Navbar with Movie Genres -->
        <nav class="navbar">
        <ul>
            <!-- use style binding here,if a use clicks the navbar set it to color and undeline -->
          <li @click="updateRated()" >Trending</li>

          <li @click="updateGenre('tv')">TV/Series</li>
          <li @click="updateGenre('animation')">Animation</li>
          <li @click="updateGenre('documentary')">Documentary</li>
          <li @click="updateGenre('movie')">Movies</li>
          <li @click="updateGenre('drama')">Drama</li>
         
          <!-- appear only on  the admin side :work on this -->
          <li  v-if="isAdminUser" @click="handleCreate">Create</li>
          <li  v-if="isAdminUser" @click="handleUpdate">Movie List</li>



          <!-- Add more genres as needed -->
        </ul>
       
      </nav>

      
     
    </div>
    
      
    <!-- search Bar -->
    <form @submit.prevent="fetchMovies()" class="search-box">
      <input
        type="text"
        placeholder="search movie"
        value=""
        v-model.trim="searchQuery"
      />
      <input type="submit" value="Search" />
    </form>

   
    <div class="top-picks">
        <h2 id="title">Top Picks</h2>
        <div class="searchedItems">
        <!-- the data below is dynamic:update it with the fetched data -->

         <div  v-for="movie in topPicks" :key="movie.id"  class="top-pick-card">
                    <router-link :to="'/movie/' + movie.id">
                <!--  img:fetched image from the data -->
                        <img :src="getMovieImageUrl(movie.image_url)" style=" border-radius: 5px; " alt="Image 1">
                        <div class="">
                            <div style="padding-bottom:20px ;">

                                <!-- Below should be the movie Rating -->
                                <p style="color:crimson; font-weight:bold; text-align:left; padding-left:5px"><i class="fa-solid fa-star" style="padding-right:5px;"></i>{{movie.rating}}</p>
                                <p  style="color:black">{{ movie.title }}</p>
                               
                                <button class="watchlist"><i style="color:crimson;padding-right:5px;" class="fa-solid fa-circle-plus"></i>WATCHLIST</button>
                            </div>
                        </div>
                     </router-link>
            </div>
        </div>
        



    </div>
    <Card/>
    
    <div v-if="filteredMovies.length > 0" class="searched-info">
      <h2>Search Results... </h2>
      <div class="searchedItems">
        <!-- the data below is dynamic:update it with the fetched data -->


                     <div v-for="movie in filteredMovies" :key="movie.id" class="image-with-text">
                      <router-link :to="'/movie/' + movie.id">

                
                        <img :src="getMovieImageUrl(movie.image_url)" width="350" style=" border-radius: 5px; " alt="Image 1">
                
                        <p class="text-top-right">{{ movie.genre }}</p>
                        <div class="text-bottom-left">
                            <div style="padding-bottom:20px ;">
                                <p>{{ movie.title }}</p>

                                <!-- update the date to human frienldy Format -->
                                <p>Release Date: {{  new Date(movie.released_date).toLocaleDateString() }}</p>


                               
                               
                            </div>
                        </div>
                      </router-link>

                        
                
                    </div>
                    
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import{useRouter,useRoute} from 'vue-router';
// import Card  from ' ../../../components/MovieCard.vue';
import Card from '../../components/MovieCard.vue';

// handling routes:
const router = useRouter();
const route = useRoute();
const topPicks = ref([]);
const topRated = ref([]);

// set by default trending on default
const selectedGenre = ref("fiction");

// set user default to true:default login in user is admin 

const defaultTop = 7;



// search  movies variables
const searchQuery = ref("");
const movies = ref([]);
const backgroundImage = ref('../../assets/aquaman.jpeg');

// fetch movies from movie endpoint:add the endpoint
async function fetchMovies() {
  
if(!searchQuery.value){
  movies.value= [];
  return;
}

  try {
    const response = await axios.get(
      `http://localhost:3000/api/movies/search?searchQuery=${searchQuery.value}`
    );
    movies.value = response.data;
    //cleare search query
    searchQuery.value = "";
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    movies.value = [];
  }
}

//:uncomment the onmounted part once data is fetchedFetch top picks for the selected genre when the component is mounted
onMounted(fetchTopPicks);
onMounted(fetchTopRated);

// searched data should dissappear once page is reloaded
// onMounted(fetchMovies);

// to filter  movie  from the database based on search Parameter:
const filteredMovies = computed(() => {

  return movies.value.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Function to fetch top picks based on the selected genre
async function fetchTopPicks() {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/movies/top?topQuery=${selectedGenre.value}`
    );
    topPicks.value = response.data;
  } catch (error) {
    console.error("Failed to fetch top picks:", error);
  }
}

async function fetchTopRated(){
  try {
    const response = await axios.get(`http://localhost:3000/api/movies/tops/rating?ratingQuery=${defaultTop}`);

    topPicks.value = response.data;
    
  } catch (error) {
    console.error("Failed to fetch top  rated Movies:", error);
    
  }
}

// Function to update the selected genre and fetch top picks
function updateGenre(genre) {
  selectedGenre.value = genre;
  fetchTopPicks();
}

function updateRated() {
  // selectedGenre.value = genre;
  fetchTopRated();
}
function isLiked(movieId) {
  return likedMovies.value.has(movieId);
}

// redirect use to creat page :function should be updated
const handleCreate = ()=>{
  router.push('/create');
}

const handleUpdate =()=>{
  router.push('/movies');
}

const isAdminUser = computed(()  => {
  const token = localStorage.getItem('token');
  const role_id = localStorage.getItem('role_id');
  if (token) {

    // no need of decoding the token
      // const decodedToken = jwt_decode(token);
      if (role_id === "1") {
        return true;
      } else {
        return false;
      }
    }
  }
)




// fetch image url from localhost
function getMovieImageUrl(imagePath) {
  return `http://localhost:3000/${imagePath}`;
}

</script>

<style scoped>
/* styling the Search data */
.searched-info h2 {
  text-align: center;
  padding-top: 10px;
}
.searchedItems {
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  padding-top: 30px;
  justify-content: center;
}
.searchedItems p {
color: crimson;
}
.searchedItems img {
    
  transition: transform 0.5s ease-in-out;
}
.image-with-text {
    max-width: 350px;
  position: relative;
  margin: 10px;
}

.image-with-text .text-top-right {
  position: absolute;
  top: 0;
  right: 0;
  color: white;
  background-color: crimson;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 0 5px 0 8px;
}

.image-with-text .text-bottom-left {
  position: absolute;
  display: flex;
  justify-content: space-around;
  gap: 30px;
  bottom: 30px;
  left: 10px;
  color: black;
}

.watchlist{
  align-items: center;
  border-radius: 15px;
  border: 1px solid black;
  padding: 5px 18px;
  font-weight: 300;
}
/* end of the  search styling */

/* top Pick card */
.top-pick-card {
    max-width: 350px;
  position: relative;
  margin: 10px;
  /* border: 1px solid rgb(141, 39, 60); */
  border-radius: 8px;
  /* padding: 5px; */
}
.top-pick-card .text-bottom-left{
   position: absolute;
  display: flex;
  justify-content:start;
  gap: 10px;
  bottom: 5px;
  left: 10px;
  color: black;  
}
.top-pick-card-star {
display: flex;
justify-content: left;
gap: 2px;
}

.top-pick__nav{
  display: flex;
  justify-content: space-between;

}
.navbar {
  background-color: #333;
  padding: 10px;
  font-size: 20px;
}
#trendingIcons{
    color: crimson;
    border-bottom: 2px solid crimson;
}
.navbar ul {
  list-style: none;
  display: flex;
}
.navbar li {
  margin-right: 20px;
  cursor: pointer;
  color: white;
}
.navbar li:hover {
  text-decoration:none;
    color: crimson;
    border-bottom: 2px solid crimson;

}

/* Carousel Styles */
#carousel {
  margin: 0 !important;
  height: 400px;

  background-image: url("../../assets/newEvent.png");
  background-size: cover;
}
#toggle-icons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;

}

/* Movie Cards Styles */
.movie-cards {
  display: flex;
  flex-wrap: wrap;
}
#title {
  text-align: left;
  font-size: 25px;
  color:#353232;


}
#title  span {
   font-size: 60px;
   color: crimson;
}
#ViewAll{
  padding-top:35px;
  padding-right: 15px;
  text-align: center;
}
#ViewAll:hover{
  color: crimson;
  padding-bottom: 2px;
  border-bottom: 2px solid crimson;
}
.movie-card {
  width: 250px;
  margin: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
}
.movie-card img {
  width: 100%;
  height: auto;
}
.movie-info {
  padding: 10px;
}
.movie-info h3 {
  margin: 0;
}
.movie-info button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
.movie-info button:hover {
  background-color: #0056b3;
}
.movie-info button.liked {
  background-color: #28a745;
}
.search-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
}

.search-box input {
  display: block;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}
.search-box input[type="text"] {
  width: 100%;
  color: #fff;
  background-color: rgb(189, 43, 72);
  font-size: 20px;
  padding: 10px 16px;
  border-radius: 8px;
  margin-bottom: 15px;
  transition: 0.4s;
}

.search-box input[type="text"]::placeholder {
  color: #f3f3f3;
}
.search-box input[type="text"]::placeholder:focus {
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
}

.search-box input[type="submit"] {
  width: 100%;
  max-width: 200px;
  background-color: crimson;
  padding: 16px;
  border-radius: 8px;
  color: #fff;
  font-size: 20px;
  text-transform: uppercase;
  transition: 0.4s;
}
</style>
