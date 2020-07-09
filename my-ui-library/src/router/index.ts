import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';
import ButtonView from '@/views/ButtonView.vue';
import ModalView from '@/views/ModalView.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/modal',
    name: 'ModalView',
    component: ModalView,
  },
  {
    path: '/button',
    name: 'ButtonView',
    component: ButtonView,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router: VueRouter = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
