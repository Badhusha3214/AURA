<template>
  <IsMobile />
  <DashboardLayout />
  <div v-if="isDoctor" class="bg-gradient-to-b from-white via-pink-100 to-pink-100">
    
      <div class="mt-2 flex items-center justify-center">
        <DrAppoinment  />
      </div>
    
  </div>
  <div v-else class="bg-gradient-to-b from-white via-pink-100 to-pink-100">
      <div class="mt-2 flex items-center justify-center">
        <AppoinmentCard  />
      </div>
  </div>
  <div class="mb-20"></div>
</template>

<script>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import IsMobile from "@/components/IsMobile.vue";
import AppoinmentCard from '@/components/AppoinmentCard.vue'
import DrAppoinment from '@/components/DrAppoinment.vue'
import { alluser  , getpatientList } from '@/api/index.js'

export default {
  name: 'AppoinmentView',
  components: {
    DashboardLayout,
    IsMobile,
    AppoinmentCard,
    DrAppoinment
  },
  data() {
    return {
      email: null,
      isDoctor: null,
      patient: true,
      doctors: [],
      patients: [],
      
    }
  },
  async mounted() {

  this.patients = await getpatientList();


  const isdoctor = localStorage.getItem('isdoctor')

if (isdoctor === "true") {
  this.isDoctor = true;
} else {
  this.isDoctor = null; //only null value is counted
}
}
}
</script>