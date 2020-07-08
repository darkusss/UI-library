<template>
  <div class="carousel-view">
    <Carousel
      :images="images"
      :image-height="imageHeight"/>
  </div>
</template>

<script>
  import Carousel from '@/components/Carousel.vue';

  export default {
    name: 'CarouselView',
    components: {
      Carousel,
    },
    data() {
      return {
        images: [
          'https://loremflickr.com/320/240',
          'https://loremflickr.com/320/240?random=1',
          'https://loremflickr.com/320/240?random=1',
        ],
        imageHeight: 123,
      };
    },
  };
</script>

<style>

</style>
