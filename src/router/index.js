import { createRouter, createWebHistory } from "vue-router"
import routes from './routes';

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
    scrollBehavior() {
        return { top: 0 }
    }
});

export default router
