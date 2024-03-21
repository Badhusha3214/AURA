import { createRouter, createWebHistory } from 'vue-router'

import SplashScreen from '@/views/SplashScreen.vue'

import HomeView from '@/views/HomeView.vue'
import AppoinmentView from '@/views/AppoinmentView.vue'
import AnalyticsView from '@/views/AnalyticsView.vue'
import ProfileView from '@/views/ProfileView.vue'
import HaveAccount from '@/views/HaveAccount.vue'
import OtpVerification from '@/views/OtpVerification.vue'

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
    //----------------------------------------------------------------------------
    {
      path: '/Account',
      name: 'HaveAccount',
      component: HaveAccount,
      meta: {
        title: 'HaveAccount'
      }
    },
    {
      path: '/otp',
      name: 'OtpVerification',
      component: OtpVerification,
      meta: {
        title: 'OtpVerification'
      }
    },


    // -------------------------------------------------------------------------------

    {
      path: '/enroll',
      name: 'Enroll',
      component: () => import('@/views/EnrollView.vue'),
      children: [
        {
          path: 'step1',
          name: 'Step1',
          component: () => import('@/views/Enroll/_StepOne.vue')
        },{
          path: 'step2',
          name: 'Step2',
          component: () => import('@/views/Enroll/_StepTwo.vue')
        },{
          path: 'step3',
          name: 'Step3',
          component: () => import('@/views/Enroll/_StepThree.vue')
        }
        // {
        //   path: 'address',
        //   name: 'Address',
        //   component: () => import('@/views/Address.vue')
        // },
        // {
        //   path: 'payment',
        //   name: 'Payment',
        //   component: () => import('@/views/Payment.vue')
        // }
      ],
      meta: {
        title: 'Enroll'
      }
    }
  ]
})


router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Aura`
  next()
})

export default router
