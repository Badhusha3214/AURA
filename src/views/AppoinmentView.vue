<template>
  <DashboardLayout /> 
  <IsMobile />
  <navbar />

  <div v-if="Doctor" class="flex items-center justify-center">
    <DrAppoinment />
  </div>
  <div v-else class="">
    <template v-for="doctor in doctors" :key="doctor.Name">
  <div class="mt-2 flex items-center justify-center">
    <AppoinmentCard :doctor="doctor" />
  </div>
</template>
  </div>

   
</template>

<script>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import IsMobile from "@/components/IsMobile.vue";
import AppoinmentCard from '@/components/AppoinmentCard.vue'
import navbar from '@/components/Navbar.vue'
import DrAppoinment from '@/components/DrAppoinment.vue'
import { getDoctorsList } from '@/api/index.js'


export default {
  name: 'AppoinmentView',
  components: {
    DashboardLayout,
    IsMobile,
    AppoinmentCard,
    navbar,
    DrAppoinment
  },
  data() {
    return {
      email: null,
      Doctor: false,
      doctors: [],

    }
  },
  methods: {


  },async mounted() {
  this.doctors = await getDoctorsList();
  console.log(this.doctors); // Check if the array is not empty
}
}
</script>