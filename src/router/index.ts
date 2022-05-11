import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import ListView from '../views/ListView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        redirect: 'list',
    },
    {
        path: '/list',
        name: 'list',
        component: ListView,
    },
    {
        path: '/detail/:id',
        name: 'detail',
        component: () => import(/* webpackChunkName: "detail" */ '../views/DetailView.vue'),
    },
    {
        path: '/notFound',
        name: 'notFound',
        component: () => import(/* webpackChunkName: "notFound" */ '../views/NotFoundView.vue'),
    },
    {
        path: '*',
        redirect: 'list',
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
