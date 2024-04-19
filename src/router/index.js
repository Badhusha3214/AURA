
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import AppoinmentView from '@/views/AppoinmentView.vue'
import AnalyticsView from '@/views/AnalyticsView.vue'
import ProfileView from '@/views/ProfileView.vue'
import ResetPassword from '@/views/ResetPassword.vue'

import StepsView from '@/views/StepsView.vue'
import EnrollView from '@/views/EnrollView.vue'

import NotFoundView from '@/views/404.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
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



    {
      path: '/enroll',
      name: 'EnrollView',
      component: EnrollView,
      meta: {
        title: 'Enroll'
      }
    },
    {
      path: '/steps',
      name: 'StepsView',
      component: StepsView,
      meta: {
        title: 'Steps'
      }
    }, {
      path: '/resetpassword',
      name: 'ResetPassword',
      component: ResetPassword,
      meta: {
        title: 'ResetPassword'
      }
    },


    // {
    //   path: '/enroll',
    //   name: 'Enroll',
    //   component: () => import('@/views/EnrollView.vue'),
    //   children: [
    //     {
    //       path: 'step1',
    //       name: 'Step1',
    //       component: () => import('@/views/Enroll/_StepOne.vue')
    //     }, {
    //       path: 'step2',
    //       name: 'Step2',
    //       component: () => import('@/views/Enroll/_StepTwo.vue')
    //     }, {
    //       path: 'step3',
    //       name: 'Step3',
    //       component: () => import('@/views/Enroll/_StepThree.vue')
    //     }, {
    //       path: 'step4',
    //       name: 'Step4',
    //       component: () => import('@/views/Enroll/_StepFour.vue')
    //     }
    //   ],
    //   meta: {
    //     title: 'Enroll'
    //   }
    // },

    // ----------------------------------------------

    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: NotFoundView,
      meta: { title: '404' }
    }

  ]
})


router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Aura`
  next()
})


export default router
