<template>
  <div class="section">
    <h2 class="section-brand">Carousel</h2>
    <div class="section-inner">
      <Carousel
        :images="images"
      />
    </div>
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
      };
    },
  };
</script>

<style>

</style>
