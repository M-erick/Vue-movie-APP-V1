<template>
    <div class="carousel">
      <button @click="prevSlide">&lt;</button>
      <div class="slides">
        <div v-for="(image, index) in images" :key="index" :class="{ active: index === currentIndex }">
          <img :src="require(`@/assets/${image}`)" alt="Slide" />
        </div>
      </div>
      <button @click="nextSlide">&gt;</button>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'Carousel',
    props: {
      images: {
        type: Array,
        required: true
      }
    },
    setup(props) {
      const currentIndex = ref(0);
  
      const nextSlide = () => {
        currentIndex.value = (currentIndex.value + 1) % props.images.length;
      };
  
      const prevSlide = () => {
        currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length;
      };
  
      return {
        currentIndex,
        nextSlide,
        prevSlide
      };
    }
  };
  </script>
  
  <style>
  .carousel {
    display: flex;
    align-items: center;
  }
  
  .slides {
    display: flex;
    overflow: hidden;
  }
  
  .slides > div {
    flex: 0 0 auto;
    transition: transform 0.5s;
  }
  
  .active {
    transform: translateX(0);
  }
  
  img {
    width: 100%;
    height: auto;
  }
  </style>
  