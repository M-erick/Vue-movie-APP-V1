<template>
  <div class="carousel-wrapper">
    <div class="carousel">
      <img v-for="(slide, index) in slides" :key="index" :src="slide.src" :class="{ 'initial': index === currentIndex, 'active': index === currentIndex }" alt="">
      <div class="carousel__button--next" @click="nextSlide"></div>
      <div class="carousel__button--prev" @click="prevSlide"></div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const currentIndex = ref(0);
    const slides = [
      { src: '../assets/moonFall.jpeg' },
      { src: '../assets/Wish.jpeg' },
      { src: '../assets/inception.jpeg' },
      { src: '../assets/family.jpeg' },
      { src: '../assets/aquaman.jpeg' }
    ];

    const nextSlide = () => {
      currentIndex.value = (currentIndex.value + 1) % slides.length;
    };

    const prevSlide = () => {
      currentIndex.value = (currentIndex.value - 1 + slides.length) % slides.length;
    };

    return {
      currentIndex,
      slides,
      nextSlide,
      prevSlide
    };
  }
}
</script>


  

<style scoped>
.carousel-wrapper {
  overflow: hidden;
  width: 90%;
}
.carousel-wrapper * {
  box-sizing: border-box;
}
.carousel { 
  transform-style: preserve-3d;
}
.carousel__photo {
  opacity: 0;
  position: absolute;
  top:0;
  width:100%;
  margin: auto;
  padding: 1rem 4rem;
  z-index: 100;
  transition: transform .5s,opacity .5s,z-index .5s;
}
.carousel__photo.initial,
.carousel__photo.active {
  opacity: 1;
  z-index: 900;
  position: relative;
 
}
.carousel__photo.prev,
.carousel__photo.next {
  z-index: 800;

}
.carousel__photo.prev {
  transform: translateX(-100%);

}
.carousel__photo.next {
  transform: translateX(100%);

}
.carousel__button--prev,
.carousel__button--next{
  position: absolute;
  top: 50%;
  width: 3rem;
  height: 3rem;
  background-color:#FFF ;
  transform: translateY(-50%);
  border-radius: 50%;
  cursor: pointer;
  z-index: 1001;
  border: 1px solid black;
}
.carousel__button--prev{
  left: 0;
}
.carousel__button--next{
  right: 0;
}
.carousel__button--prev::after,
.carousel__button--next::after{
  content:"";
  position: absolute;
  width: 10px;
  height: 10px;
  top: 50%;
  left: 54%;
  border-radius: 2px solid black;
  border-bottom: 2px solid black;
  transform: translate(-50%,-50%) rotate(135deg);

}
.carousel__button--next::after{
  left:47%;
  transform: translate(-50%,-50%) rotate(-45deg);
}

</style>