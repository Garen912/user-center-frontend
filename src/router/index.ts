import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import UserLoginPage from '@/pages/user/UserLoginPage.vue'
import UserRegisterPage from '@/pages/user/UserRegisterPage.vue'
import UserManagePage from '@/pages/admin/UserManagePage.vue'
import Redireact from '@/pages/redirect/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/user/login',
    name: 'userLogin',
    component: UserLoginPage,
  },
  {
    path: '/user/register',
    name: 'userRegister',
    component: UserRegisterPage,
  },
  {
    path: '/admin/userManage',
    name: 'adminUserManage',
    component: UserManagePage,
  },
  {
    path: '/redirect',
    name: 'Redirect',
    component: Redireact,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
