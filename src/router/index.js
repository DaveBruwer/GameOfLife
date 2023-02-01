import { createRouter, createWebHistory } from "vue-router"

const HomeView = () => import("../views/HomeView.vue")
const GalleryView = () => import("../views/GalleryView.vue")
const LoginView = () => import("../views/LoginView.vue")
const RegisterView = () => import("../views/RegisterView.vue")
const AccountView = () => import("../views/AccountView.vue")

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: GalleryView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView
    }
  ]
})

export default router;