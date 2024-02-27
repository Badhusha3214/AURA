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
      component: SplashScreen,
      meta: {
        title: 'SplashScreen'
      }
    },

    {
      path: '/home',
      name: 'HomeView',
      component: HomeView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/appoinment',
      name: 'AppoinmentView',
      component: AppoinmentView,
      meta: {
        title: 'Appoinments'
      }
    },
    {
      path: '/analytics',
      name: 'AnalyticsView',
      component: AnalyticsView,
      meta: {
        title: 'Analytics'
      }
    },
    {
      path: '/profile',
      name: 'ProfileView',
      component: ProfileView,
      meta: {
        title: 'Profile'
      }
    },

  ]
})


router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Aura`
  next()
})

export default router
