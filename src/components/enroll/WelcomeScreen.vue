<template>
    <div class=" w-full flex justify-center">
      <div class="relative flex flex-col items-center justify-center mt-40">
        <div class="w-full lg:w-1/3 lg:py-20 ">
          <img class="w-full h-full" src="/assets/illustration/welcome.svg" alt="welcome" />
        </div>
      </div>
    </div>
  
    <div class="absolute w-full flex justify-center mb-12">
      <div class="relative flex flex-col items-center gap-2 justify-center my-3">
        <div class="font-semibold text-2xl w-72 rounded-full text-center">Welcome y'all</div>
      </div>
    </div>
  
    <p class="absolute bottom-0 w-screen flex justify-center mb-6 text-red-800 text-sm font-medium dark:text-red-500"
      v-if="error">{{ error }}</p>
  
    <div class="absolute bottom-0 w-screen flex justify-center p-5 mb-12">
      <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"
        class="text-white font-semibold w-full text-lg p-3 rounded-full bg-primary" type="button">SignIn with Gmail
      </button>
    </div>
  
    <!-- Main modal -->
    <div id="authentication-modal" tabindex="-1" aria-hidden="true"
      class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen bg-gray-900 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50">
      <div class="relative p-4 w-full max-w-md max-h-full">
  
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
  
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ mode === 'enroll' ? 'CreateAccount' : 'Sign In' }}</h3>
  
            <button type="button"
              class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
  
          <!-- Modal body -->
          <div class="p-4 md:p-5 space-y-4">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                email</label>
              <input type="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com" v-model="email" required />
            </div>
            <div>
              <label for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input type="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="password" v-model="password" required />
            </div>
  
            <template v-if="mode === 'enroll'">
              <div>
                <label for="confirm_password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                  Password</label>
                <input type="password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="password" v-model="confirm_password" required />
              </div>
            </template>
  
            <div class="flex flex-col items-center justify-center gap-2">
              <p class="text-red-800 text-sm font-medium dark:text-red-500" v-if="errors">{{ errors }}</p>
              <span class="text-xs text-black-500">Empower your cycle, embrace your flow. Welcome back to your
                period
                journey.</span>
            </div>
  
            <div class="flex flex-col gap-2">
              <button @click="getUserLogin" type="button" data-modal-hide="authentication-modal"
                class="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-pink-500 hover:bg-red-400"
                :disabled="!enableButton"> {{ mode === 'enroll' ? 'Create Account' : 'Sign In' }}</button>
              <button @click="showForgotPasswordModal = true; $emit('modal-hide')" type="button"
                class="text-blue-600 hover:underline font-medium text-sm px-5 py-2.5 text-center">Forgot
                Password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Forgot Password Modal -->
    <div v-if="showForgotPasswordModal" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen">
        <div class="bg-white w-full max-w-md mx-auto rounded-lg shadow-lg p-6">
          <div class="mb-4">
            <h2 class="text-xl font-bold">Forgot Password</h2>
            <p class="text-gray-600">Enter your email to reset your password.</p>
          </div>
          <div>
            <input type="email" v-model="forgotPasswordEmail"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
              placeholder="Enter your email" />
            <button @click="resetPassword" class="w-full bg-blue-600 text-white font-bold py-2 rounded-lg">Reset
              Password</button>
          </div>
          <div class="mt-4 text-center">
            <button @click="showForgotPasswordModal = false"
              class="text-blue-600 hover:underline font-medium text-sm px-5 py-2.5">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { forgotPassword, userLogin, userRegister } from '@/api/index.js'
  
  export default {
    emits: ['triggerNext', 'modal-hide'],
    name: "WelcomeScreen",
    data() {
      return {
        email: null,
        password: null,
        confirm_password: null,
        enableButton: false,
        errors: null,
        error: null,
        forgotPasswordEmail: null,
        showForgotPasswordModal: false,
      }
    },
    props: {
      mode: {
        type: String,
        required: true
      }
    },
    computed: {
      user: {
        get() {
          return this.$store.state.user
        },
        set(value) {
          this.$store.dispatch('setUser', value)
        }
      }
    },
    methods: {
      async getUserLogin() {
        if (this.mode === 'enroll') {
          await userRegister({
            email: this.email,
            password: this.password
          }).then((response) => {
            console.log(response);
            if (response.status === 201) {
              this.user.email = response.data.email;
              console.log(this.user.email);
              console.log(this.user);
              localStorage.setItem('email', this.email);
              this.$emit('triggerNext', 'otp')
            } else if (response.response.status === 400) {
              this.error = response.response.data[message];
              console.log(this.error);
            }
          }).catch((error) => {
            this.error = error;
          })
        } else {
          await userLogin({
            email: this.email,
            password: this.password
          }).then((response) => {
            console.log(response);
            if (response.status === 200) {
              localStorage.setItem('email', this.email);
              document.cookie = `aura-token=${response.data.Token}; max-age=864000`;
              this.user.email = response.data.UserData;
              console.log(this.user.email);
              console.log(this.user);
              this.$router.push('/');
            } else if (response.status === 400) {
              this.error = response.data[message];
              console.log(this.error);
            }
          }).catch((error) => {
            this.error = error;
          })
        }
      },
      async resetPassword() {
        try {
          const response = await forgotPassword({
            email: this.forgotPasswordEmail
          });
          console.log(response);
          this.showForgotPasswordModal = false;
          // Show a success message to the user
        } catch (error) {
          console.error(error);
          // Show an error message to the user
        }
      }
    },
    watch: {
      email: function () {
        let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
        if (emailRegex.test(this.email)) {
          this.errors = null
  
          if (this.mode === 'enroll') {
            this.enableButton = this.email && this.password && this.confirm_password
          } else {
            this.enableButton = this.email && this.password
          }
  
        } else {
          this.errors = 'Invalid email'
        }
      },
      password: function () {
        let passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{8,}$/   //(?=.*[a-z])
        if (this.password.length >= 8) {
          if (passwordRegex.test(this.password)) {
            this.errors = null
  
            if (this.mode === 'enroll') {
              this.enableButton = this.email && this.password && this.confirm_password
            } else {
              this.enableButton = this.email && this.password
            }
  
          } else {
            this.errors = 'Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
          }
        } else {
          this.errors = 'Password must be at least 8 characters'
        }
      },
      confirm_password: function () {
        if (this.mode !== 'enroll') return
  
        if (this.confirm_password === this.password) {
          this.errors = null
          this.enableButton = this.email && this.password && this.confirm_password
        } else {
          this.errors = 'Passwords do not match'
        }
      }
    }
  }
  </script>