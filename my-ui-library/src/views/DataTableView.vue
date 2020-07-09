<template>
  <div class="data-table-view">
    <DataTable :columns="columns" :items="items" :sort-button-style="sortButtonStyle"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import DataTable from '@/components/DataTable.vue';

  const defaultSort = 'fas fa-sort';

  export default Vue.extend({
    name: 'Home',
    components: {
      DataTable,
    },
    data() {
      return {
        columns: [
          {title: '№', value: '_index'},
          {title: 'Имя', value: 'name'},
          {title: 'Фамилия', value: 'surname', sortable: true, currentSortIcon: defaultSort},
          {title: 'Возраст', value: 'age', type: 'number', sortable: true, currentSortIcon: defaultSort},
        ],
        items: [
          {id: 30050, name: 'Вася', surname: 'Петров', age: 12},
          {id: 30051, name: 'Вася', surname: 'Васечкин', age: 15},
        ],
        sortButtonStyle: {
          default: defaultSort,
          ascending: 'fas fa-sort-up',
          descending: 'fas fa-sort-down',
        },
      };
    },
  });
</script>
