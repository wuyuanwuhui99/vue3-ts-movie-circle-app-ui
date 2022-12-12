import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        meta: {keepAlive: true},
        component: () => import('../pages/HomePage.vue')
    },
    {
        path: '/say',
        name: 'Say',
        component: () => import('../pages/SayPage.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router
