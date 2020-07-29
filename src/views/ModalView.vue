<template>
    <section class="section">
        <h1 class="section-brand">Modal</h1>
        <div class="section-inner">
            <vue-markdown>
                ## Default settings
            </vue-markdown>
            <Modal></Modal>
            <div class="code">
            <pre>
                <code>
&ltModal&gt&lt/Modal&gt
                </code>
            </pre>
            </div>
            <vue-markdown>
                ## Custom settings
            </vue-markdown>
            <Modal>
                <template #trigger>
                    <MyButton color="info">Click me</MyButton>
                </template>
                <template #header>
                    Up to you...
                </template>
                <template #body>
                    You can setup it as you want to, cause you are using best UI library ever
                </template>
                <template #footer>
                    <MyButton color="outline-success">Awesome</MyButton>
                </template>
            </Modal>
            <div class="code">
            <pre>
                <code>
&ltModal&gt
  &lttemplate #trigger&gt
   &ltMyButton class="info">Click me&lt/MyButton>
&lt/template>
&lttemplate #header>
  Up to you...
&lt/template>
&lttemplate #body>
  You can setup it as you want to, cause you are using best UI library ever
&lt/template>
&lttemplate #footer>
  &ltMyButton color="outline-success">Awesome&lt/MyButton>
&lt/template>
&lt/Modal&gt
                </code>
            </pre>
            </div>
            <vue-markdown>
                ## API
            </vue-markdown>
            <DataTable
                    :columns="columns"
                    :items="items"
            />
            <vue-markdown>
                ## Slots
            </vue-markdown>
            <DataTable
                    :columns="slotColumns"
                    :items="slotItems"
            />
        </div>
    </section>
</template>

<script lang="ts">
    import Modal from '@/components/Modal.vue';
    import MyButton from '@/components/MyButton.vue';
    import DataTable from '@/components/DataTable.vue';
    import VueMarkdown from 'vue-markdown';

    export default {
        name: 'ModalView',
        components: {
            Modal,
            MyButton,
            DataTable,
            VueMarkdown,
        },
        data() {
            return {
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
                        name: '-',
                        type: '-',
                        default: '-',
                        obligate: '-',
                        description: '-',
                    },
                ],
                slotColumns: [
                    {title: 'Name', value: 'name'},
                    {title: 'Default', value: 'default'},
                    {title: 'Obligate', value: 'obligate'},
                    {title: 'Description', value: 'description'},
                ],
                slotItems: [
                    {
                        id: 0,
                        name: 'trigger',
                        default: '<MyButton>Trigger</MyButton>',
                        obligate: 'No',
                        description: 'The slot suits for triggering a modal',
                    },
                    {
                        id: 1,
                        name: 'header',
                        default: 'This is a default header',
                        obligate: 'No',
                        description: 'The slot suits for filling modal header out',
                    },
                    {
                        id: 2,
                        name: 'body',
                        default: 'This is a default text in the body slot',
                        obligate: 'No',
                        description: 'The slot suits for filling modal body out',
                    },
                    {
                        id: 3,
                        name: 'footer',
                        default: '<MyButton color="success close-button">OK</MyButton>',
                        obligate: 'No',
                        description: 'The slot suits for filling modal footer out',
                    },
                ],
            };
        },
    };
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
            border-bottom: 1px solid #dbdbdb;
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