<template>
    <section class="section">
        <h1 class="section-brand">Grid</h1>
        <div class="section-inner">
            <vue-markdown>
                ## Equal-width
            </vue-markdown>
            <Row>
                <Column></Column>
                <Column></Column>
            </Row>
            <Row>
                <Column></Column>
                <Column></Column>
                <Column></Column>
            </Row>
            <div class="code">
            <pre>
                <code>
&ltRow>
    &ltColumn>&lt/Column>
    &ltColumn>&lt/Column>
&lt/Row>
&ltRow>
    &ltColumn>&lt/Column>
    &ltColumn>&lt/Column>
    &ltColumn>&lt/Column>
&lt/Row>
                </code>
            </pre>
            </div>
            <vue-markdown>
                ## Different column widths
            </vue-markdown>
            <Row>
                <Column></Column>
                <Column cols="11"></Column>
            </Row>
            <Row>
                <Column></Column>
                <Column cols="10"></Column>
            </Row>
            <Row>
                <Column></Column>
                <Column cols="9"></Column>
            </Row>
            <Row>
                <Column></Column>
                <Column cols="8"></Column>
            </Row>
            <Row>
                <Column></Column>
                <Column cols="7"></Column>
            </Row>
            <Row>
                <Column></Column>
                <Column cols="6"></Column>
            </Row>
            <Row>
                <Column></Column>
                <Column cols="5"></Column>
            </Row>
            <Row>
                <Column></Column>
                <Column cols="4"></Column>
            </Row>
            <Row>
                <Column></Column>
                <Column cols="3"></Column>
            </Row>
            <Row>
                <Column></Column>
                <Column cols="2"></Column>
            </Row>
            <Row>
                <Column></Column>
                <Column cols="1"></Column>
            </Row>
            <div class="code">
            <pre>
                <code>
&ltRow>
    &ltColumn>&lt/Column>
    &ltColumn cols="11">&lt/Column>
&lt/Row>
&ltRow>
    &ltColumn>&lt/Column>
    &ltColumn cols="10">&lt/Column>
&lt/Row>
&ltRow>
    &ltColumn>&lt/Column>
    &ltColumn cols="9">&lt/Column>
&lt/Row>
&ltRow>
    &ltColumn>&lt/Column>
    &ltColumn cols="8">&lt/Column>
&lt/Row>
&ltRow>
    &ltColumn>&lt/Column>
    &ltColumn cols="7">&lt/Column>
&lt/Row>
&ltRow>
    &ltColumn>&lt/Column>
    &ltColumn cols="6">&lt/Column>
&lt/Row>
&ltRow>
    &ltColumn>&lt/Column>
    &ltColumn cols="5">&lt/Column>
&lt/Row>
&ltRow>
    &ltColumn>&lt/Column>
    &ltColumn cols="4">&lt/Column>
&lt/Row>
&ltRow>
    &ltColumn>&lt/Column>
    &ltColumn cols="3">&lt/Column>
&lt/Row>
&ltRow>
    &ltColumn>&lt/Column>
    &ltColumn cols="2">&lt/Column>
&lt/Row>
&ltRow>
    &ltColumn>&lt/Column>
    &ltColumn cols="1">&lt/Column>
&lt/Row>
                </code>
            </pre>
            </div>
            <vue-markdown>
                ## Nested columns
            </vue-markdown>
            <Row>
                <Column>
                    <Row>
                        <Column class="nested"></Column>
                        <Column class="nested" cols="8"></Column>
                        <Column class="nested"></Column>
                    </Row>
                </Column>
                <Column>
                    <Row>
                        <Column class="nested"></Column>
                        <Column class="nested"></Column>
                        <Column class="nested"></Column>
                    </Row>
                </Column>
            </Row>
            <div class="code">
            <pre>
                <code>
&ltRow>
    &ltColumn>
        &ltRow>
            &ltColumn>&lt/Column>
            &ltColumn cols="8">&lt/Column>
            &ltColumn>&lt/Column>
        &lt/Row>
    &lt/Column>
    &ltColumn>
        &ltRow>
            &ltColumn>&lt/Column>
            &ltColumn>&lt/Column>
            &ltColumn>&lt/Column>
        &lt/Row>
    &lt/Column>
&lt/Row>
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
        </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import VueMarkdown from 'vue-markdown';
    import Row from '@/components/grid/Row.vue';
    import Column from '@/components/grid/Column.vue';
    import DataTable from '@/components/DataTable.vue';

    export default Vue.extend({
        name: 'GridView',
        components: {
            VueMarkdown,
            Row,
            Column,
            DataTable,
        },
        data() {
            return {
                cols: 8,
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
                        name: 'cols',
                        type: '[Number, String]',
                        default: '0',
                        obligate: 'No',
                        description: 'Specify width of a column',
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

    .nested {
        background: darken(@light-darken, 3%);
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
