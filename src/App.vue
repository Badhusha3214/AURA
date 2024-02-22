<template>
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <HoMe />
  <NavBar />
</template>

<script>
import NavBar from './components/navbar.vue'
import HoMe from './components/home.vue'



export default {
  name: 'App',
  components: {
    NavBar,
    HoMe
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
