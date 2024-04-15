<template>
    <DashboardLayout />
    <IsMobile />
    <div class="flex items-center justify-center h-24 bg-primary">
      <h1 class="text-4xl font-bold text-white">Appointment</h1>
    </div>
  
    <div class="h-96 flex items-center justify-center flex-col">
      <h1 class="text-4xl font-bold text-primary">{{ counter }}</h1>
      <div class="flex space-x-4 mt-5">
        <button @click="updateCounter(1, '++')" class="font-semibold text-xl bg-primary text-white px-4 py-2 rounded">+</button>
        <button @click="updateCounter(1, '--')" class="font-semibold text-xl bg-primary text-white px-4 py-2 rounded">-</button>
      </div>
    </div>
    <h1 class=" font-bold">{{ user }}</h1>
    <div class="flex items-center justify-center mt-5">
      <label for="email" class="font-semibold text-xl mr-4">Email:</label>
      <input
        id="email"
        v-model="email"
        type="email"
        class="border-2 border-primary rounded px-4 py-2 text-xl"
        placeholder="Enter email"
      />
      <button @click="saveEmail(email)" class="font-semibold bg-primary text-white px-4 py-2 rounded ml-4">Save</button>
    </div>
  </template>
  
  <script>
  import DashboardLayout from '@/layouts/DashboardLayout.vue'
  import IsMobile from "@/components/IsMobile.vue";

  export default {
    name: 'AppoinmentView',
    components: {
      DashboardLayout,
      IsMobile
    },
    data() {
      return {
        email: null,
      }
    },
    computed: {
      counter: {
        get() {
          return this.$store.state.counter
        },
        set(value) {
          this.$store.dispatch('setCounter', value)
        }
      },
      user: {
        get() {
          return this.$store.state.user.email
        },
        set(v) {
          this.saveEmail(v)
        }
      }
    },
    methods: {
      saveEmail(value) {
        console.log(localStorage.getItem('email'))
        this.$store.commit("SET_USER", localStorage.getItem('email'))
        this.email = value
      },
      updateCounter(value, action) {
        action === '++' ? this.counter += value : this.counter -= value
      }
    }
  }
  </script>