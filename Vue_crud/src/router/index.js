import { createRouter, createWebHistory } from 'vue-router';
import UserList from '../components/UserList.vue';
import UserForm from '../components/UserForm.vue';

const routes = [
    {
        path: '/',
        name: 'UserList',
        component: UserList,
    },
    {
        path: '/users/create',
        name: 'UserCreate',
        component: UserForm,
    },
    {
        path: '/users/:id/edit',
        name: 'UserEdit',
        component: UserForm,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
