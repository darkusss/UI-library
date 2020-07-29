<template>
    <section class="section">
        <h1 class="section-brand">
            Buttons
        </h1>
        <div class="section-inner">
            <vue-markdown>
                ## Colors
            </vue-markdown>
            <div class="row">
                <MyButton>Button</MyButton>
                <MyButton color="primary">Button</MyButton>
                <MyButton color="info">Button</MyButton>
                <MyButton color="success">Button</MyButton>
                <MyButton color="danger">Button</MyButton>
                <MyButton color="warning">Button</MyButton>
                <MyButton color="dark">Button</MyButton>
            </div>
            <div class="code">
            <pre>
                <code>
&ltMyButton&gtButton&ltMyButton&gt
&ltMyButton color="primary"&gtButton&ltMyButton&gt
&ltMyButton color="info"&gtButton&ltMyButton&gt
&ltMyButton color="success"&gtButton&ltMyButton&gt
&ltMyButton color="danger"&gtButton&ltMyButton&gt
&ltMyButton&gt color="warning"&gtButton&ltMyButton&gt
&ltMyButton&gt color="dark"&gtButton&ltMyButton&gt
                </code>
            </pre>
            </div>
            <vue-markdown>
                ## Sizing
            </vue-markdown>
            <div class="row">
                <MyButton
                        v-for="(size, idx) in sizes"
                        :key="idx"
                        :size="size"
                >
                    Button
                </MyButton>
            </div>
            <div class="code">
            <pre>
                <code>
&ltMyButton size="sm"&gtButton&ltMyButton&gt
&ltMyButton size="md"&gtButton&ltMyButton&gt
&ltMyButton&gt size="lg"&gtButton&ltMyButton&gt
                </code>
            </pre>
            </div>
            <vue-markdown>
                ## Outline
            </vue-markdown>
            <div class="row">
                <MyButton color="outline-primary">Outlined</MyButton>
                <MyButton color="outline-dark">Outlined</MyButton>
                <MyButton color="outline-danger">Outlined</MyButton>
                <MyButton color="outline-warning">Outlined</MyButton>
            </div>
            <div class="code">
            <pre>
                <code>
&ltMyButton color="outline-primary"&gtOutlined&ltMyButton&gt
&ltMyButton color="outline-dark"&gtOutlined&ltMyButton&gt
&ltMyButton color="outline-danger"&gtOutlined&ltMyButton&gt
&ltMyButton&gt color="outline-warning"&gtOutlined&ltMyButton&gt
                </code>
            </pre>
            </div>
            <vue-markdown>
                ## Rounding
            </vue-markdown>
            <div class="row">
                <MyButton color="outline-primary" rounded="5">Rounded</MyButton>
                <MyButton color="outline-dark" rounded="5">Rounded</MyButton>
                <MyButton color="outline-danger" rounded="5">Rounded</MyButton>
                <MyButton color="outline-warning" rounded="5">Rounded</MyButton>
            </div>
            <div class="code">
            <pre>
                <code>
&ltMyButton color="outline-primary" rounded="5"&gtRounded&ltMyButton&gt
&ltMyButton color="outline-dark" rounded="5"&gtRounded&ltMyButton&gt
&ltMyButton color="outline-danger" rounded="5"&gtRounded&ltMyButton&gt
&ltMyButton&gt color="outline-warning" rounded="5"&gtRounded&ltMyButton&gt
                </code>
            </pre>
            </div>
            <vue-markdown>
                ## Events
            </vue-markdown>
            <div class="row">
                <MyButton color="outline-secondary" @click="clickMe">Click me</MyButton>
            </div>
            <div class="code">
            <pre>
                <code>
&ltMyButton  color="outline-secondary" @click="clickMe"&gtRounded&ltMyButton&gt

&ltscript&gt
export default {
     methods: {
         clickMe: () => {
             alert(`Clicked :)`);
         },
     }
&lt/script&gt
                </code>
            </pre>
            </div>
            <vue-markdown>
                ## API
            </vue-markdown>
            <div>
                <DataTable
                        :columns="columns"
                        :items="items"
                />
            </div>
        </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import VueMarkdown from 'vue-markdown';
    import MyButton from '@/components/MyButton.vue';
    import DataTable from '@/components/DataTable.vue';

    export default Vue.extend({
        name: 'ButtonView',
        components: {
            VueMarkdown,
            MyButton,
            DataTable,
        },
        data() {
            return {
                colors: ['danger', 'success', 'warning', 'info'],
                outlineColors: [
                    'outline-secondary',
                    'outline-success',
                    'outline-danger',
                    'outline-info',
                    'outline-warning',
                ],
                sizes: ['sm', 'md', 'lg'],
                rounded: 0,
                columns: [
                    {title: 'Name', value: 'name'},
                    {title: 'Type', value: 'type'},
                    {title: 'Default', value: 'default'},
                    {title: 'Obligate', value: 'obligate'},
                    {title: 'Description', value: 'description'},
                ],
                items: [
                    {
                        id: 0,
                        name: 'Color',
                        type: 'String',
                        default: 'secondary',
                        obligate: 'No',
                        description: 'The prop is used for setting a button\'s color',
                    },
                    {
                        id: 1,
                        name: 'Size',
                        type: 'String',
                        default: 'md',
                        obligate: 'No',
                        description: 'The prop is used for setting a button\'s size',
                    },
                    {
                        id: 2,
                        name: 'Rounded',
                        type: '[String, Number]',
                        default: '0',
                        obligate: 'No',
                        description: 'The prop is used for setting a button\'s rounding',
                    },
                ],
            };
        },
        methods: {
            clickMe: () => {
                alert(`Clicked :)`);
            },
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

    table {
        width: 100%;

        border-collapse: collapse;
        border-spacing: 0;

        td, th {
            border: 1px solid #dbdbdb;
            border-width: 0 0 1px;
            padding: .5em .75em;
        }

        th {
            border-width: 0 0 2px;
            color: #363636;
            text-align: left;
            font-weight: 600;
        }
    }
</style>
