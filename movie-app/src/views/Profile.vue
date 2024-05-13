<template>
    <div class="userCard">
        <div  v-if="user" class="profile_card">
            <div class="profile_image">
                <img src="../assets/eveNT.png" width="80" height="80" alt="">
            </div>

            <div>
                
                <p ><span style="padding-right:5px"> User:</span> {{user.first_name }} <span>{{user.last_name}}</span></p>


            </div>
                        <div>LiteMovieID:LT{{user.id}}</div>



        </div>
        <div class="profile_card">
            <div class="user-info">
                <div class="profile_card" style="max-width:350px;height:fit-content">
                    <h4 style="margin-top:-10px">Watchlist</h4>
                    <p >0</p>

                </div>
                <div class="profile_card" style="max-width:350px;height:fit-content">
                    <h4 style="margin-top:-10px">Downloads</h4>
                <p >1</p>

                </div>
            

            </div>

        </div>
        <div class="profile_card">
            <div style="display:flex;gap:10px;justify-content:center">
               
                <li>
                    <a href="">Posts</a>
                </li>
                <li>
                    <a href="">Likes</a>
                </li>
              
            </div>
        </div>
        
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const user = ref(null);

const fetchUserDetails = async () => {
    const userId = localStorage.getItem('id');

    try {
        const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
        user.value = response.data;
    } catch (error) {
        console.error('Failed to Fetch user Details', error);
        user.value = null;
    }
};

onMounted(fetchUserDetails);
</script>

<style>
.profile {
    border: 1px solid #ccc;
    padding: 20px;
    margin: 20px 0;
}
.profile_card{
    display: flex;
    justify-content: left;
    gap: 5px;
    padding:15px;
    box-shadow: 0 4px 6px rgba(20, 19, 19, 0.1);
    border: rgb(201, 185, 188) solid;
    margin: 15px;

}
.profile_card p {
     margin-top: 15px;
     text-align: center;
     padding: 10px;
}
.profile_image img {
    border-radius:50% ;
}
.profile_card li {
    list-style-type: none;
}
.user-info {
    display: flex;
    justify-content: space-around;
    gap: 10px;
    align-items: center;
}
.user-details {
    font-size: 16px;
}

.detail {
    margin-bottom: 10px;
}

.loading {
    font-size: 16px;
    color: #999;
}
</style>
