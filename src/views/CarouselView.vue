<template>
    <div class="section">
        <h1 class="section-brand">Carousel</h1>
        <div class="section-inner">
            <vue-markdown>
                ## Small images
            </vue-markdown>
            <Carousel
                    :images="images"
                    :button-icons="roundedButtonIcons"
            />
            <div class="code">
            <pre>
                <code>
&ltCarousel
    :images="images"
    :button-icons="buttonIcons"
/>
&ltscript>
export default {
    data() {
            return {
                images: [
                    {
                        id: 0,
                        source: 'https://loremflickr.com/320/240',
                        description: 'lorem image',
                    },
                    {
                        id: 1,
                        source: 'https://loremflickr.com/320/240?random=1',
                        description: 'lorem image',
                    },
                    {
                        id: 2,
                        source: 'https://loremflickr.com/320/240?random=2',
                        description: 'lorem image',
                    }
                ],
                buttonIcons: ['fas fa-arrow-circle-left fa-2x', 'fas fa-arrow-circle-right fa-2x']
            };
    };
}
&lt/script>
                </code>
            </pre>
            </div>
            <vue-markdown>
                ## Big images
            </vue-markdown>
            <Carousel
                    :images="bigImages"
                    :button-icons="buttonIcons"
            />
            <div class="code">
            <pre>
                <code>
&ltCarousel
    :images="images"
    :button-icons="buttonIcons"
/>
&ltscript>
export default {
    data() {
            return {
                images: [
                    {
                        id: 0,
                        source: 'https://picsum.photos/id/431/1230/500',
                        description: 'picsum image',
                    },
                    {
                        id: 1,
                        source: 'https://picsum.photos/id/432/1230/500',
                        description: 'picsum image',
                    },
                    {
                        id: 2,
                        source: 'https://picsum.photos/id/433/1230/500',
                        description: 'picsum image',
                    },
                    {
                        id: 3,
                        source: 'https://picsum.photos/id/434/1230/500',
                        description: 'picsum image',
                    },
                    {
                        id: 4,
                        source: 'https://picsum.photos/id/435/1230/500',
                        description: 'picsum image',
                    },
                    {
                        id: 5,
                        source: 'https://picsum.photos/id/436/1230/500',
                        description: 'picsum image',
                    },
                ],
                buttonIcons: ['fas fa-arrow-left fa-3x', 'fas fa-arrow-right fa-3x']
            };
    };
}
&lt/script>
                </code>
            </pre>
            </div>
            <vue-markdown>
                ## With interval
            </vue-markdown>
            <Carousel
                    :images="bigImages"
                    :button-icons="buttonIcons"
                    :interval="interval"
            />
            <div class="code">
            <pre>
                <code>
&ltCarousel
    :images="images"
    :button-icons="buttonIcons"
    :interval="interval"
/>
&ltscript>
export default {
    data() {
            return {
                images: [
                    {
                        id: 0,
                        source: 'https://picsum.photos/id/431/1230/500',
                        description: 'picsum image',
                    },
                    {
                        id: 1,
                        source: 'https://picsum.photos/id/432/1230/500',
                        description: 'picsum image',
                    },
                    {
                        id: 2,
                        source: 'https://picsum.photos/id/433/1230/500',
                        description: 'picsum image',
                    },
                    {
                        id: 3,
                        source: 'https://picsum.photos/id/434/1230/500',
                        description: 'picsum image',
                    },
                    {
                        id: 4,
                        source: 'https://picsum.photos/id/435/1230/500',
                        description: 'picsum image',
                    },
                    {
                        id: 5,
                        source: 'https://picsum.photos/id/436/1230/500',
                        description: 'picsum image',
                    },
                ],
                buttonIcons: ['fas fa-arrow-left fa-3x', 'fas fa-arrow-right fa-3x'],
                interval: 3000
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
                :columns="columns"
                :items="items"
            />
        </div>
    </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown';
    import Carousel from '@/components/Carousel.vue';
    import DataTable from '@/components/DataTable.vue';

    export default {
        name: 'CarouselView',
        components: {
            VueMarkdown,
            Carousel,
            DataTable,
        },
        data() {
            return {
                images: [
                    {
                        id: 0,
                        source: 'https://loremflickr.com/320/240',
                        description: 'lorem image',
                    },
                    {
                        id: 1,
                        source: 'https://loremflickr.com/320/240?random=1',
                        description: 'lorem image',
                    },
                    {
                        id: 2,
                        source: 'https://loremflickr.com/320/240?random=2',
                        description: 'lorem image',
                    },
                ],
                bigImages: [
                    {
                        id: 0,
                        source: 'https://picsum.photos/id/431/1230/500',
                        description: 'picsum image',
                    },
                    {
                        id: 1,
                        source: 'https://picsum.photos/id/432/1230/500',
                        description: 'picsum image',
                    },
                    {
                        id: 2,
                        source: 'https://picsum.photos/id/433/1230/500',
                        description: 'picsum image',
                    },
                    {
                        id: 3,
                        source: 'https://picsum.photos/id/434/1230/500',
                        description: 'picsum image',
                    },
                    {
                        id: 4,
                        source: 'https://picsum.photos/id/435/1230/500',
                        description: 'picsum image',
                    },
                    {
                        id: 5,
                        source: 'https://picsum.photos/id/436/1230/500',
                        description: 'picsum image',
                    },
                ],
                roundedButtonIcons: ['fas fa-arrow-circle-left fa-2x', 'fas fa-arrow-circle-right fa-2x'],
                buttonIcons: ['fas fa-arrow-left fa-3x', 'fas fa-arrow-right fa-3x'],
                interval: 3000,
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
                        name: 'Images',
                        type: 'Array',
                        default: 'No',
                        obligate: 'Yes',
                        description: 'The prop is used for setting images up in the carousel',
                    },
                    {
                        id: 1,
                        name: 'ButtonIcons',
                        type: 'Array',
                        default: 'No',
                        obligate: 'Yes',
                        description: 'The prop is used for setting button icons up for carousel slider',
                    },
                    {
                        id: 2,
                        name: 'Interval',
                        type: 'Number',
                        default: '0',
                        obligate: 'No',
                        description: 'The prop is used for setting delay up for sliding images',
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
</style>
