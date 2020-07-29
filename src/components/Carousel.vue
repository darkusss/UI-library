<template>
    <div class="carousel-container">
        <div class="carousel-items">
            <!--            <transition-group name="fade" tag="div">-->
            <div
                    class="carousel-item"
                    v-for="img in images"
                    :key="img.id"
                    v-show="counter === img.id">
                <img
                        :src="img.source"
                        :alt="img.description"
                >
            </div>
            <!--            </transition-group>-->
            <div class="carousel-arrow">
                <button
                        class="prevButton"
                        :class="{active: counter > 0}"
                        @click="onPrevSlide"
                >
                    <i :class="`${buttonIcons[0]}`"></i>
                </button>
                <button
                        class="nextButton"
                        :class="{active: counter < images.length - 1}"
                        @click="onNextSlide"
                >
                    <i :class="`${buttonIcons[1]}`"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'Carousel',
        props: {
            images: {
                type: Array,
                required: true,
            },
            buttonIcons: {
                type: Array,
                required: true,
                validator: (value: string[]): boolean => value.length >= 0 && value.length <= 2,
            },
            interval: {
                type: Number,
                default: 0,
            }
        },
        data() {
            return {
                counter: 0,
            };
        },
        methods: {
            onNextSlide(): void {
                if (this.counter < this.images.length - 1) {
                    this.counter++;
                }
            },
            onPrevSlide(): void {
                if (this.counter > 0) {
                    this.counter--;
                }
            },
        },
        mounted: function (): void {
            if (this.interval <= 0) return;

            setInterval((): void => {
                this.onNextSlide();
            }, this.interval);
        }
    });
</script>

<style scoped lang="less">

    .carousel-container {
        text-align: center;
        max-height: 400px;
        position: relative;
        overflow: hidden;

        .carousel-items {
            display: inline-block;
            position: relative;
            overflow: hidden;
            max-width: 100%;

            .carousel-item {
                display: inline-block;
            }

            .carousel-arrow {
                position: absolute;

                top: 0;
                left: 0;
                right: 0;
                bottom: 0;

                opacity: 0;
                transition: .15s ease-out;

                .prevButton {
                    border: none;
                    cursor: pointer;

                    background: none;

                    position: absolute;
                    top: 50%;
                    left: 1.5rem;

                    transform: translateY(-50%);
                    z-index: 1;

                    display: none;
                }

                .nextButton {
                    border: none;
                    background: none;
                    cursor: pointer;
                    position: absolute;
                    top: 50%;
                    right: 1.5rem;

                    transform: translateY(-50%);
                    z-index: 1;

                    display: none;
                }

                .active {
                    display: block;
                    color: #fff;
                }

                &:hover {
                    opacity: 1;
                }
            }

            img {
                width: 100%;
                height: auto;

                display: block;

                object-fit: cover;
            }
        }
    }

    .fade-enter-active, .fade-leave-active {
        opacity: .6;
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: .2;
    }
</style>
