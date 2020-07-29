<template>
    <div class="col" :class="{['col-' + cols]: cols}">
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'Column',
        props: {
            cols: {
                type: [Number, String],
                validator: (value: number | string): boolean => (+value >= 0 && +value <= 12),
            },
        },
    });
</script>

<style scoped lang="less">
    @primary-color: #cecece;

    .col {
        background-color: @primary-color;

        padding: 15px;
        margin-right: 4%;
        margin-bottom: 5px;

        border-radius: 5px;

        flex: 1 0 0;

        &:last-child {
            margin-right: 0;
        }
    }

    .generate-columns(12);

    .generate-columns(@n, @i: 1) when (@i =< @n) {
        .col-@{i} {
            flex: 0 0 (100% / @n * @i);
        }

        .generate-columns(@n, (@i + 1));
    }

    @media (max-width: 550px) {
        .col {
            flex-flow: column wrap;
            margin-right: 0;

            .generate-columns(12);

            .generate-columns(@n, @i: 1) when (@i =< @n) {
                &-@{i} {
                    flex: 0 0 100%;
                }

                .generate-columns(@n, (@i + 1));
            }
        }
    }
</style>
