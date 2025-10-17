import { createRouter, createWebHashHistory } from 'vue-router'

import HomePage from '@/views/home/HomePage.vue'
import MainPage from '@/views/main/MainPage.vue'
import Math from '@/views/score-entry/ScoreEntryPage.vue'
import Comment from '@/views/final-evaluation/FinalEvaluationPage.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main',
      children: [
        {
          path: '/main',
          name: 'Main',
          component: MainPage,
          children: [
            {
              path: '/home',
              name: 'Home',
              component: HomePage
            },
            {
              path: '/math',
              name: 'Math',
              component: Math
            },
            {
              path: '/comment',
              name: 'Comment',
              component: Comment
            }
          ]
        }
      ]
    }
  ]
})

export default router
