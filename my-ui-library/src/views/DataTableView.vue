<template>
  <div class="section">
		<h2 class="section-brand">Data Table</h2>
		<div class="section-inner">
			<DataTable
				:columns="columns"
				:items="items"
				:sort-button-style="sortButtonStyle"
				:search="search"
			/>
		</div>
  </div>
</template>

<script>
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
        search: {
          fields: ['age', 'surname'],
          filters: [
            v => this.toKeyboardLayout(v)
          ]
        },
      };
    },
    methods: {
      toKeyboardLayout(str) {
        const associativeArray = {
          "q": "й", "w": "ц", "e": "у", "r": "к", "t": "е", "y": "н", "u": "г",
          "i": "ш", "o": "щ", "p": "з", "[": "х", "]": "ъ", "a": "ф", "s": "ы",
          "d": "в", "f": "а", "g": "п", "h": "р", "j": "о", "k": "л", "l": "д",
          ";": "ж", "'": "э", "z": "я", "x": "ч", "c": "с", "v": "м", "b": "и",
          "n": "т", "m": "ь", ",": "б", ".": "ю", "/": "."
        };
        return str.replace(/[A-z\/,.;\]\[]/g, (x) => {
          return associativeArray[x];
        });
      },
    },
  });
</script>
