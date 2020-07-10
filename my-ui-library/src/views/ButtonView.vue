<template>
  <section class="section">
    <h2 class="section-brand">Buttons</h2>
    <div class="section-inner">
      <div class="row">
        <h3>Colors</h3>
        <MyButton @click="trigger">Button</MyButton>
        <MyButton
          v-for="(color, idx) in colors"
          :key="idx"
          :color="color"
        >
          Button
        </MyButton>
      </div>
      <div class="row">
        <h3>Sizing</h3>
        <MyButton
          v-for="(size, idx) in sizes"
          :key="idx"
          :size="size">
          Button
        </MyButton>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import MyButton from '@/components/MyButton.vue';

  export default Vue.extend({
    name: 'ButtonView',
    components: {
      MyButton,
    },
    data() {
      return {
        colors: ['danger', 'success', 'outline-primary', 'outline-secondary', 'outline-success', 'outline-danger', 'outline-info', 'outline-warning'],
        sizes: ['sm', 'md', 'lg'],
      };
    },
    methods: {
      trigger: () => {
        alert(`You just triggered me`);
      },
    },
  });
</script>
