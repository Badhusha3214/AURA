
<template>

    <div v-if="loading" class="splash-screen">
        <img src="/assets/splash_screen_logo.svg" alt="Splash Screen">
    </div>

</template>


<script>
export default {
  name: 'SplashScreen',
  data() {
    return {
      loading: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
      this.$router.push('/home')
    }, 3000)
  }
}
</script>

<style scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}
</style>