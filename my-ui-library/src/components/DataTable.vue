<template>

</template>

<script>
  export default {
    name: 'DataTable',
    props: {
      items: {
        type: Array,
        required: true,
      },
      columns: {
        type: Array,
        required: true,
      },
      search: {
        type: Object,
        default: null,
      },
    },
  };
</script>

<style>

</style>
