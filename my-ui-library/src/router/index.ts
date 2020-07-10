import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';
import ButtonView from '@/views/ButtonView.vue';
import ModalView from '@/views/ModalView.vue';
import GridView from '@/views/GridView.vue';
import CarouselView from '@/views/CarouselView.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/button',
    name: 'Button',
    component: ButtonView,
  },
  {
    path: '/modal',
    name: 'Modal',
    component: ModalView,
  },
  {
    path: '/grid',
    name: 'Grid',
    component: GridView,
  },
  {
    path: '/carousel',
    name: 'Carousel',
    component: CarouselView,
  },
];

const router: VueRouter = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
