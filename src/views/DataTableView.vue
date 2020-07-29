<template>
    <div class="section">
        <h1 class="section-brand">Data Table</h1>
        <div class="section-inner">
            <vue-markdown>
                ## Simple table
            </vue-markdown>
            <DataTable
                    :columns="columns"
                    :items="items"
            />
            <div class="code">
            <pre>
                <code>
&ltDataTable
    :columns="columns"
    :items="items"
/>
&ltscript>
export default {
    data() {
            return {
                columns: [
                    {title: '#', value: '_index'},
                    {title: 'Name', value: 'name'},
                    {title: 'Surname', value: 'surname'},
                    {title: 'Age', value: 'age', type: 'number'},
                ],
                items: [
                    {id: 30050, name: 'John', surname: 'Smith', age: 12},
                    {id: 30051, name: 'Alan', surname: 'Mendoza', age: 15},
                    {id: 30052, name: 'Alan', surname: 'Edwards', age: 28},
                    {id: 30053, name: 'Albert', surname: 'Mendoza', age: 31},
                    {id: 30054, name: 'Andrea', surname: 'Marshall', age: 65},
                    {id: 30055, name: 'Andrew', surname: 'Greene', age: 2},
                ]
            };
    };
}
&lt/script>
                </code>
            </pre>
            </div>
            <vue-markdown>
                ## Sort table
            </vue-markdown>
            <DataTable
                    :columns="sortColumns"
                    :items="items"
                    :sort-button-style="sortButtonStyle"
            />
            <div class="code">
            <pre>
                <code>
&ltDataTable
    :columns="columns"
    :items="items"
    :sort-button-style="sortButtonStyle"
/>
&ltscript>
export default {
    data() {
            return {
                sortColumns: [
                    {title: '#', value: '_index'},
                    {title: 'Name', value: 'name'},
                    {title: 'Surname', value: 'surname', sortable: true, currentSortIcon: defaultSort},
                    {title: 'Age', value: 'age', type: 'number', sortable: true, currentSortIcon: defaultSort},
                ],
                items: [
                    {id: 30050, name: 'John', surname: 'Smith', age: 12},
                    {id: 30051, name: 'Alan', surname: 'Mendoza', age: 15},
                    {id: 30052, name: 'Alan', surname: 'Edwards', age: 28},
                    {id: 30053, name: 'Albert', surname: 'Mendoza', age: 31},
                    {id: 30054, name: 'Andrea', surname: 'Marshall', age: 65},
                    {id: 30055, name: 'Andrew', surname: 'Greene', age: 2},
                ]
            };
    };
}
&lt/script>
                </code>
            </pre>
            </div>
            <vue-markdown>
                ## Search table
            </vue-markdown>
            <DataTable
                    :columns="columns"
                    :items="items"
                    :search="search"
            />
            <div class="code">
            <pre>
                <code>
&ltDataTable
    :columns="columns"
    :items="items"
    :search="search"
/>
&ltscript>
export default {
    data() {
            return {
                sortColumns: [
                    {title: '#', value: '_index'},
                    {title: 'Name', value: 'name'},
                    {title: 'Surname', value: 'surname'},
                    {title: 'Age', value: 'age', type: 'number'},
                ],
                items: [
                    {id: 30050, name: 'John', surname: 'Smith', age: 12},
                    {id: 30051, name: 'Alan', surname: 'Mendoza', age: 15},
                    {id: 30052, name: 'Alan', surname: 'Edwards', age: 28},
                    {id: 30053, name: 'Albert', surname: 'Mendoza', age: 31},
                    {id: 30054, name: 'Andrea', surname: 'Marshall', age: 65},
                    {id: 30055, name: 'Andrew', surname: 'Greene', age: 2},
                ],
                search: {
                    fields: ['name', 'surname', 'age'],
                    filters: [
                        (str: string): string => {
                            const associativeArray: { [key: string]: string } = {
                                'q': 'й', 'w': 'ц', 'e': 'у', 'r': 'к', 't': 'е', 'y': 'н', 'u': 'г',
                                'i': 'ш', 'o': 'щ', 'p': 'з', '[': 'х', ']': 'ъ', 'a': 'ф', 's': 'ы',
                                'd': 'в', 'f': 'а', 'g': 'п', 'h': 'р', 'j': 'о', 'k': 'л', 'l': 'д',
                                ';': 'ж', '\'': 'э', 'z': 'я', 'x': 'ч', 'c': 'с', 'v': 'м', 'b': 'и',
                                'n': 'т', 'm': 'ь', ',': 'б', '.': 'ю', '/': '.',
                            };
                            return str.toLowerCase().replace(/[a-z\/,.;\]\[]/g, (x: string): string => associativeArray[x]);
                        },
                    ],
                },
            };
    };
}
&lt/script>
                </code>
            </pre>
            </div>
            <vue-markdown>
                ## API
            </vue-markdown>
            <DataTable
                :columns="titles"
                :items="list"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import VueMarkdown from 'vue-markdown';
    import DataTable from '@/components/DataTable.vue';

    export default Vue.extend({
        name: 'Home',
        components: {
            DataTable,
            VueMarkdown,
        },
        data() {
            return {
                columns: [
                    {title: '#', value: '_index'},
                    {title: 'Name', value: 'name'},
                    {title: 'Surname', value: 'surname'},
                    {title: 'Age', value: 'age', type: 'number'},
                ],
                sortColumns: [
                    {title: '#', value: '_index'},
                    {title: 'Name', value: 'name'},
                    {title: 'Surname', value: 'surname', sortable: true, currentSortIcon: 'fas fa-sort'},
                    {title: 'Age', value: 'age', type: 'number', sortable: true, currentSortIcon: 'fas fa-sort'},
                ],
                items: [
                    {id: 30050, name: 'John', surname: 'Smith', age: 12},
                    {id: 30051, name: 'Alan', surname: 'Mendoza', age: 15},
                    {id: 30052, name: 'Alan', surname: 'Edwards', age: 28},
                    {id: 30053, name: 'Albert', surname: 'Mendoza', age: 31},
                    {id: 30054, name: 'Andrea', surname: 'Marshall', age: 65},
                    {id: 30055, name: 'Andrew', surname: 'Greene', age: 2},
                ],
                sortButtonStyle: {
                    default: 'fas fa-sort',
                    ascending: 'fas fa-sort-up',
                    descending: 'fas fa-sort-down',
                },
                search: {
                    fields: ['name', 'surname', 'age'],
                    filters: [
                        (str: string): string => {
                            const associativeArray: { [key: string]: string } = {
                                'q': 'й', 'w': 'ц', 'e': 'у', 'r': 'к', 't': 'е', 'y': 'н', 'u': 'г',
                                'i': 'ш', 'o': 'щ', 'p': 'з', '[': 'х', ']': 'ъ', 'a': 'ф', 's': 'ы',
                                'd': 'в', 'f': 'а', 'g': 'п', 'h': 'р', 'j': 'о', 'k': 'л', 'l': 'д',
                                ';': 'ж', '\'': 'э', 'z': 'я', 'x': 'ч', 'c': 'с', 'v': 'м', 'b': 'и',
                                'n': 'т', 'm': 'ь', ',': 'б', '.': 'ю', '/': '.',
                            };
                            return str.toLowerCase().replace(/[a-z\/,.;\]\[]/g, (x: string): string => associativeArray[x]);
                        },
                    ],
                },
                titles: [
                    {title: 'Name', value: 'name'},
                    {title: 'Type', value: 'type'},
                    {title: 'Default', value: 'default'},
                    {title: 'Obligate', value: 'obligate'},
                    {title: 'Description', value: 'description'},
                ],
                list: [
                    {
                        id: 0,
                        name: 'Columns',
                        type: 'Array',
                        default: 'No',
                        obligate: 'Yes',
                        description: 'Table columns',
                    },
                    {
                        id: 1,
                        name: 'Items',
                        type: 'Array',
                        default: 'No',
                        obligate: 'Yes',
                        description: 'Table data',
                    },
                    {
                        id: 2,
                        name: 'Search',
                        type: 'Object',
                        default: 'No',
                        obligate: 'No',
                        description: 'Search field',
                    },
                    {
                        id: 3,
                        name: 'Sort button style',
                        type: 'Object',
                        default: 'No',
                        obligate: 'No',
                        description: 'Sort table columns',
                    },
                ],
            };
        },
    });
</script>

<style scoped lang="less">
    @light-darken: #efecf4;

    .code {
        font-family: monospace;

        padding: 1em;

        line-height: 1.6;
        border-radius: 4px;

        background: @light-darken;

        pre {
            overflow: auto;
        }
    }
</style>