<template>
  <DashboardLayout />
  <IsMobile />
  <navbar />
  <div v-if="Doctor" class="bg-gradient-to-b from-white via-pink-100 to-pink-100">
    <template v-for="patient in patients" :key="patient.Name">
      <div class="mt-2 flex items-center justify-center">
        <DrAppoinment :patient="patient" />
      </div>
    </template>
  </div>
  <div v-else class="bg-gradient-to-b from-white via-pink-100 to-pink-100">
    <template v-for="doctor in doctors" :key="doctor.Name">
      <div class="mt-2 flex items-center justify-center">
        <AppoinmentCard :doctor="doctor" />
      </div>
    </template>
  </div>
  <div class="mb-20"></div>
</template>

<script>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import IsMobile from "@/components/IsMobile.vue";
import AppoinmentCard from '@/components/AppoinmentCard.vue'
import navbar from '@/components/Navbar.vue'
import DrAppoinment from '@/components/DrAppoinment.vue'
import { getDoctorsList, getpatientList } from '@/api/index.js'

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
      Doctor: true,
      patient: true,
      doctors: [],
      patients: [],
    }
  },
  methods: {},
  async mounted() {
    this.doctors = await getDoctorsList();
    console.log(this.doctors);
    this.patients = await getpatientList();
    console.log(this.patients);
  }
}
</script>