<template>
  <div>
    <input
      v-if="search"
      type="text"
      v-model="query"
    >
    <table>
      <thead>
      <tr>
        <th
          v-for="(col, index) in columns"
          :key="index"
          :class="{'align-right': col.type === 'number'}"
        >
          {{ col.title }}
          <button
            v-if="col.sortable"
            @click="changeSort(col)"
          >
            <i :class="col.currentSortIcon"></i>
          </button>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="(item, itemIndex) in sortedItems"
        :key="itemIndex"
      >
        <td
          v-for="(col, colIndex) in columns"
          :key="colIndex"
          :class="{'align-right': col.type === 'number'}"
        >
          {{ col.value === '_index' ? +itemIndex + 1 : item[col.value] }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default Vue.extend({
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
      sortButtonStyle: {
        type: Object,
      },
    },
    data() {
      return {
        sortByColumn: null,
        query: '',
      };
    },
    methods: {
      changeSort(column) {

        this.columns.forEach((col) => {
          if (col !== column && col.sortable) {
            col.currentSortIcon = this.sortButtonStyle.default;
          }
        });

        switch (column.currentSortIcon) {
          case this.sortButtonStyle.default:
            column.currentSortIcon = this.sortButtonStyle.ascending;
            break;
          case this.sortButtonStyle.ascending:
            column.currentSortIcon = this.sortButtonStyle.descending;
            break;
          case this.sortButtonStyle.descending:
            column.currentSortIcon = this.sortButtonStyle.default;
            break;
        }

        this.sortByColumn = column;

        this.sortBy(this.items, column);
      },
      sortBy(items, column, query) {

        if (query !== '') {
          return items.filter((item) => {
            return this.search.fields.filter((field) => {
              return this.search.filters.filter((searchFilter) => {
                return searchFilter(item[field] + '').includes(searchFilter(this.query));
              }).length
            }).length
          });
        }

        if (column !== null) {
          const copiedItems = [...items];
          const coef = column.currentSortIcon.includes('up') ? 1
            : column.currentSortIcon.includes('down') ? -1
              : 0;

          if (column.type === 'number') {
            return copiedItems.sort((u1, u2) => (u1[column.value] - u2[column.value]) * coef);
          } else {
            return copiedItems.sort((u1, u2) => (u1[column.value].localeCompare(u2[column.value])) * coef);
          }
        }

        return items;
      }
    },
    computed: {
      sortedItems() {
        return this.sortBy(this.items, this.sortByColumn, this.query);
      }
    },
  });
</script>

<style scoped lang="less">
  div {
    width: 70vw;
    margin: 0 auto;

    input {
      width: 100%;
      padding: 10px 15px;
      margin-bottom: 10px;
    }

    table {
      border: 1px solid black;
      border-collapse: collapse;
      width: 100%;

      button {
        cursor: pointer;
        border: none;
        background: none;
      }

      td, th {
        border: 1px solid #ddd;
        padding: 8px;
      }

      tr:nth-child(even) {
        background: #CCC;
      }

      thead th {
        text-align: left;
        padding-top: 12px;
        padding-bottom: 12px;
        background-color: #4CAF50;
        color: black;

        button {
          background: none;
        }
      }

      tbody tr td:first-child {
        text-align: center;
      }

      tbody tr td {
        text-align: start;
      }

      .align-right {
        text-align: right;
      }
    }
  }
</style>
