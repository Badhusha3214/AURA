<template>

  <template v-if="loading">
    <div class="splash-screen">
      <img src="/assets/logo.svg" alt="logo" />
    </div>
  </template>

  <template v-else>

    <div class="splash-screen">
      <img src="/assets/logo_name.svg" alt="logo" />
    </div>

    <div class="absolute bottom-0 w-full flex justify-center mb-12">
      <div class="relative flex flex-col items-center gap-2 justify-center my-3">

        <button class="text-white font-bold text-2xl w-72 p-3 rounded-full bg-primary" @click="triggerNext('enroll')">Let's Start</button>

        <div class="my-3">
          <button class="flex flex-row items-center gap-2 justify-center text-sm font-medium text-gray-500" @click="triggerNext('login')">
            <span>Already have an account?</span>
            <span class="text-sm font-medium text-primary">SIGN IN</span>
          </button>
        </div>

      </div>
    </div>

  </template>

</template>



<script>
  export default {
    name: 'SplashScreen',
    emits: ['triggerWelcome', 'setMode'],
    data() {
      return {
        loading: true
      }
    },
    mounted() {
      setTimeout(() => {
        this.loading = false
      }, 2000)
    },
    methods: {
      triggerNext(mode) {
        this.$emit('triggerWelcome')
        this.$emit('setMode', mode)
      },
    }
  }
</script>



<style scoped>
  .splash-screen {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
    padding: 0rem 4rem;
  }
</style>