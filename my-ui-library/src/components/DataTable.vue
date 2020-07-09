<template>
  <div>
    <input v-if="search" type="text">
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
            @click="changeSortIcon(col)"
          >
            <i :class="col.currentSortIcon"></i>
          </button>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="(item, itemIndex) in copyItems"
        :key="itemIndex"
      >
        <td
          v-for="(col, colIndex) in columns"
          :key="colIndex"
          :class="{'align-right': col.type === 'number'}"
        >
          {{ col.value === '_index' ? itemIndex + 1 : item[col.value] }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
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
        copyItems: Object.assign({}, this.items),
      };
    },
    methods: {
      changeSortIcon(column: any): void {

        this.columns.forEach((col: any): void => {
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
      },
    },
    computed: {
      // sortBy: function(type: any): void {
      //   const coef = sortType.includes('up') ? 1
      //     : sortType.includes('down') ? -1
      //       : 0;
      //
      //   if (type === 'number') {
      //     sortData.sort((u1, u2) => {
      //       return (u1[value] - u2[value]) * coef;
      //     });
      //   } else if (type === 'string') {
      //     sortData.sort((u1, u2) => {
      //       return (u1[value].localeCompare(u2[value])) * coef;
      //     });
      //   }
      // },
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
