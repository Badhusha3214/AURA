
<template>

  <h1>Dashboard</h1>  
  
  <Calender
    :clickCount="clickCount"

  />

  <button @click="handleClick">Click me</button>

</template>



<script>

  import Calender from "../components/Calender.vue";

  export default {
    name: "DashboardView",
    components: {
      Calender
    },
    data() {
      return {
        clickCount: 0,
      };
    },
    methods: {
      handleClick() {
        this.clickCount++;
      }
    }
  };

</script>