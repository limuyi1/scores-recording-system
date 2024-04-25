import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'

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
          component: HomeView
        }
      ]
    }
  ]
})

export default router
