import { createRouter, createWebHashHistory } from 'vue-router'

import HomePage from '../views/HomePage.vue'

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
    }
  ]
})

export default router
