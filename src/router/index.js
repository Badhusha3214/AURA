import { createRouter, createWebHistory } from 'vue-router'

import SplashScreen from '@/views/SplashScreen.vue'

import HomeView from '@/views/HomeView.vue'
import AppoinmentView from '@/views/AppoinmentView.vue'
import AnalyticsView from '@/views/AnalyticsView.vue'
import ProfileView from '@/views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'SplashScreen',
      component: SplashScreen
    },

    {
      path: '/home',
      name: 'HomeView',
      component: HomeView
    },
    {
      path: '/appoinment',
      name: 'AppoinmentView',
      component: AppoinmentView
    },
    {
      path: '/analytics',
      name: 'AnalyticsView',
      component: AnalyticsView
    },
    {
      path: '/profile',
      name: 'ProfileView',
      component: ProfileView
    },

  ]
})

export default router
