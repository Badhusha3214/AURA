import { createRouter, createWebHistory } from 'vue-router'

import SplashScreen from '@/views/SplashScreen.vue'

import HomeView from '@/views/HomeView.vue'
import AppoinmentView from '@/views/AppoinmentView.vue'
import AnalyticsView from '@/views/AnalyticsView.vue'
import ProfileView from '@/views/ProfileView.vue'

import HaveAccount from '@/views/HaveAccount.vue'
import OtpLogin from '@/views/OtpVerification.vue'
import DoneFlash from '@/views/DoneFlash.vue'
import ConfirmationView from '@/views/ConfirmationView.vue'
import NotFoundView from '@/views/404.vue'
import NewSignin from '@/views/NewSignin.vue'
import RegistrationConfirm from '@/views/RegistrationConfirm.vue'
import OtpRegistration from '@/views/OtpRegistration.vue'



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
    },{
      path: '/done',
      name: 'DoneFlash',
      component: DoneFlash,
      meta: {
        title: 'DoneFlash'
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
      name: 'OtpLogin',
      component: OtpLogin,
      meta: {
        title: 'OtpLogin'
      }
    },
    {
      path: '/Confirmation',
      name: 'ConfirmationView',
      component: ConfirmationView,
      meta: {
        title: 'ConfirmationView'
      }
    },{
      path: '/:pathMatch(.*)*',
      name: '404',
      component: NotFoundView,
      meta: { title: '404' }
    },{
      path: '/NewSignin',
      name: 'NewSignin',
      component: NewSignin,
      meta: { 
        title: 'NewSignin' }
    },{
      path: '/OtpRegistration',
      name: 'OtpRegistration',
      component: OtpRegistration,
      meta: {
        title: 'OtpRegistration'
      }
    },,{
      path: '/RegistrationConfirm',
      name: 'RegistrationConfirm',
      component: RegistrationConfirm,
      meta: {
        title: 'RegistrationConfirm'
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
        },{
          path: 'step4',
          name: 'Step4',
          component: () => import('@/views/Enroll/_StepFour.vue')
        }
        // {
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
