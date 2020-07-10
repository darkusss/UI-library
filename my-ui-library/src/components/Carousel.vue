<template>
  <div class="carousel-container">
    <div class="carousel-slide" :style="changeImage">
      <img
        v-for="(img, index) in images"
        :key="index"
        :src="img" alt="image"
      >
    </div>
    <MyButton
      class="prevButton"
      :class="{active: this.counter > 0}"
      @click="onPrevSlide"
    >
      <i class="fas fa-arrow-left fa-2x"></i>
    </MyButton>
    <MyButton
      class="nextButton"
      :class="{active: this.counter < this.images.length - 1}"
      @click="onNextSlide"
    >
      <i class="fas fa-arrow-right fa-2x"></i>
    </MyButton>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import MyButton from '@/components/MyButton.vue';

  export default Vue.extend({
      name: 'Carousel',
      components: {
        MyButton,
      },
      props: {
        images: {
          type: Array,
        },
        imageWidth: {
          type: Number,
          default: 320,
        },
        imageHeight: {
          type: Number,
          default: 240,
        },
      },
      data() {
        return {
          counter: 0,
        };
      },
      methods: {
        onNextSlide(): void {
          if (this.counter < this.images.length - 1) {
            this.counter++;
          }
        },
        onPrevSlide(): void {
          if (this.counter > 0) {
            this.counter--;
          }
        },
      },
      computed: {
        changeImage(): object {
          return { transform: 'translateX(' + (-this.imageWidth * this.counter) + 'px)' };
        },
      },
  });
</script>

<style lang="less">
  .carousel-container {
    width: 320px;
    border: 3px solid black;
    margin: auto;
    overflow: hidden;
    position: relative;
    box-shadow: 6px -5px 20px 1px rgba(0, 0, 0, 0.5);
    z-index: 5;

    .carousel-slide {
      display: flex;

      width: 100%;
      height: 200px;

      transition: transform .5s ease-out;

      img {
        object-fit: cover;
      }
    }
  }


  .prevButton {
    border: none;
    outline: none;
    pointer-events: none;
    cursor: pointer;
    background: none;
    position: absolute;
    color: gray;
    top: 40%;
    left: 5%;
  }

  .nextButton {
    border: none;
    outline: none;
    background: none;
    pointer-events: none;
    cursor: pointer;
    position: absolute;
    color: gray;
    top: 40%;
    right: 5%;
  }

  .active {
    pointer-events: all;
    color: white;
  }
</style>
