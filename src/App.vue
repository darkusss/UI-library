<template>
    <div id="app">
        <header class="header">
            <Navbar>
                <template #brand>
                    <img src="../public/logo.png" width="100px" height="100px" alt="logo">
                </template>
                <template #menu>
                    <router-link
                            class="nav-item"
                            :to="{ name: 'Home'}"
                    >
                        Home
                    </router-link>

                    <router-link
                            class="nav-item"
                            :to="{ name: 'Button' }"
                    >
                        Button
                    </router-link>

                    <router-link
                            class="nav-item"
                            :to="{ name: 'Modal'}"
                    >
                        Modal
                    </router-link>

                    <router-link
                            class="nav-item"
                            :to="{ name: 'Grid'}"
                    >
                        Grid
                    </router-link>

                    <router-link
                            class="nav-item"
                            :to="{ name: 'Carousel'}"
                    >
                        Carousel
                    </router-link>

                    <router-link
                            class="nav-item"
                            :to="{ name: 'Table'}"
                    >
                        Data Table
                    </router-link>
                </template>
            </Navbar>
        </header>
        <router-view/>
    </div>
</template>

<style lang="less">
    @primary-color: #007bff;
    @secondary-color: #6c757d;
    @success-color: #5cb85c;
    @info-color: #5bc0de;
    @warning-color: #ffc107;
    @danger-color: #dc3545;
    @dark-color: #343a40;
    @light-color: #f9fcfb;
    @lighten-success: lighten(@success-color, 15%);

    *,
    *:before,
    *:after {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: "Roboto Light", sans-serif;

        #app {
            height: 100vh;
            padding: 10px;
            font-size: 1em;

            color: @dark-color;

            .header {
                max-width: 1170px;
                margin: auto;
            }

            .section {
                max-width: 1170px;
                margin: 50px auto;

                .section-brand {
                    color: @light-color;
                    background: @dark-color;
                    box-shadow: 8px -4px 8px 1px rgba(@dark-color, .5);

                    padding: 1rem 2.5rem;

                    border: 1px solid @dark-color;
                    border-radius: 0 16px;
                }

                .section-inner {
                    width: 90%;

                    background: @light-color;

                    margin: 10px auto 0;
                    padding: .5rem;

                    .row {
                        display: flex;
                        justify-content: flex-start;
                        flex-wrap: wrap;

                        h3 {
                            width: 100%;

                            padding: 10px 0 5px;

                            border-bottom: 1px solid @dark-color;
                        }
                    }
                }
            }
        }

        &::-webkit-scrollbar {
            width: .25rem;
        }

        &::-webkit-scrollbar-track {
            background: @dark-color;
        }

        &::-webkit-scrollbar-thumb {
            background: @success-color;
        }

        // Large
        @media (min-width: 992px) and (max-width: 1200px) {
            #app {
                .section {
                    max-width: 992px;
                }
            }
        }

        // Medium
        @media (min-width: 768px) and (max-width: 992px) {
            #app {
                font-size: .9em;

                .section {
                    max-width: 768px;
                }
            }
        }

        // Small
        @media (max-width: 768px) {
            #app {

                .section {
                    max-width: 100%;
                }

                .header {
                    justify-content: space-between;
                }
            }
        }
    }
</style>

<script>
    import Navbar from '@/components/Navbar';

    export default {
        components: {
            Navbar,
        },
    };
</script>
