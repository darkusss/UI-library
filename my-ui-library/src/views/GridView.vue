<template>
  <section class="section">
    <h2 class="section-brand">Grid</h2>
    <div class="section-inner">
      <Row>
        <Column>1 of 3</Column>
        <Column>2 of 3</Column>
        <Column>3 of 3</Column>
      </Row>
    </div>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Row from '@/components/grid/Row.vue';
  import Column from '@/components/grid/Column.vue';

  export default Vue.extend({
    name: 'GridView',
    components: {
      Row,
      Column,
    },
    data() {
      return {
        cols: '12',
      };
    },
  });
</script>
