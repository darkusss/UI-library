<template>
    <div class="nav">
        <slot name="brand"></slot>
        <div class="nav-bar" :class="{active: isBarActive}">
            <slot name="menu"></slot>
        </div>
        <button class="burger" @click="changeBarState">
            <i v-if="!isBarActive" class="fas fa-bars"></i>
            <i v-else class="fas fa-times"></i>
        </button>
    </div>

</template>

<script>
    export default {
        name: "Navbar",
        data() {
            return {
                isBarActive: false,
            };
        },
        methods: {
            changeBarState() {
                this.isBarActive = !this.isBarActive;
            }
        }
    }
</script>

<style lang="less" scoped>
    @success-color: #5cb85c;
    @dark-color: #343a40;

    .nav {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;

        .nav-bar {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            align-items: center;

            a {
                font-weight: bold;
                font-size: 1em;
                position: relative;

                color: @dark-color;

                display: block;

                padding: 5px;

                text-transform: uppercase;
                text-decoration: none;

                transition: all .3s linear;

                &.router-link-exact-active {
                    color: @success-color;
                }

                &:hover {
                    background: lighten(@success-color, 20%);
                }

            }
        }

        .burger {
            font-size: 2em;
            color: @dark-color;

            background: none;
            border: none;

            width: 30px;
            height: auto;

            display: none;

            cursor: pointer;

            margin: 0;
            padding: 0;
        }
    }

    @media screen and (max-width: 768px){
        .nav {
            display: block;
            position: relative;

            .nav-bar {
                display: none;

                &.active {
                    display: block;
                }
            }
            .burger {
                display: block;
                position: absolute;
                top: 0;
                right: .2rem;
            }
        }
    }

</style>
