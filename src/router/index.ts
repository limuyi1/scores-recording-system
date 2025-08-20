import { createRouter, createWebHashHistory } from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import MainPage from '@/views/MainPage.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'Home',
          component: HomePage
        }
      ]
    },
    {
      path: '/main',
      children: [
        {
          path: '/main',
          name: 'Main',
          component: MainPage
        }
      ]
    }
  ]
})

export default router
