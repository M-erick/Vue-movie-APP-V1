<template>
    <div>
        <div class="profile">
            <div v-if="user" class="user-details">
                <p class="detail">First Name: {{ user.first_name }}</p>
                <p class="detail">Last Name: {{ user.last_name }}</p>
                <p class="detail">Email: {{ user.email }}</p>
            </div>
            <div v-else class="loading">
                <p>Loading...</p>
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
