import { createWebHistory, createRouter } from 'vue-router';
import { routes } from './../configs/routerLayouts';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
