<template>
    <div>
        <input
                v-if="search"
                placeholder="Search..."
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

<script lang="ts">
    import Vue from 'vue';

    interface ITableItem {
        [key: string]: string | number;
    }

    interface ITableColumn {
        title: string;
        value: string;
        currentSortIcon?: string;
        sortable?: boolean;
        type?: string;
    }

    interface ISearchConfig {
        fields: string[],
        filters: IFilter<string, string>[];
    }

    interface IFilter<T, R> {
        (s: T): R;
    }

    export default Vue.extend({
        name: 'DataTable',
        props: {
            items: {
                type: Array as () => ITableItem[],
                required: true,
            },
            columns: {
                type: Array as () => ITableColumn[],
                required: true,
            },
            search: {
                type: Object as () => ISearchConfig,
                default: null,
            },
            sortButtonStyle: {
                type: Object,
            },
        },
        data() {
            return {
                sortByColumn: {} as ITableColumn,
                query: '',
            };
        },
        methods: {
            changeSort(column: ITableColumn): void {
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
            },
            sortBy(items: ITableItem[], column: ITableColumn): ITableItem[] {
                if (!column || !column.currentSortIcon) return items; // FIXME: Get rid of second condition in the if statement

                const copiedItems: ITableItem[] = [...items];
                const coef: number = (column.currentSortIcon as string).includes('up') ? 1
                    : (column.currentSortIcon as string).includes('down') ? -1
                        : 0;

                if (column.type === 'number') {
                    return copiedItems.sort(
                        (user1: ITableItem, user2: ITableItem): number => {
                            return (Number(user1[column.value]) - Number(user2[column.value])) * coef;
                        }
                    );
                } else {
                    return copiedItems.sort(
                        (user1: ITableItem, user2: ITableItem): number => {
                            return ((user1[column.value] as string).localeCompare(user2[column.value] as string)) * coef;
                        }
                    );
                }
            },
            findBy(items: ITableItem[], query: string): ITableItem[] {
                if (!query) return items;

                return items.filter((item): boolean => {
                    return this.search.fields.filter((field): boolean => {
                        return this.search.filters.filter((searchFilter): boolean => {
                            return searchFilter(item[field] + '').includes(searchFilter(query));
                        }).length > 0;
                    }).length > 0;
                });
            },
        },
        computed: {
            sortedItems(): ITableItem[] {
                return this.sortBy(this.findBy(this.items, this.query), this.sortByColumn);
            },
        },
    });
</script>

<style scoped lang="less">
    div {
        width: 100%;

        input {
            width: 100%;
            padding: 10px 15px;
            margin-bottom: 10px;
        }

        table {
            width: 100%;

            border-collapse: collapse;
            border-spacing: 0;

            button {
                cursor: pointer;
                border: none;
                background: none;
            }

            td, th {
                padding: .5em .75em;
            }

            thead th {
                border-bottom: 2px solid #dbdbdb;
                color: #363636;
                text-align: left;
                font-weight: 600;

                button {
                    background: none;
                }
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
