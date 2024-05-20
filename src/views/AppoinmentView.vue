<template>
  <IsMobile />
  <DashboardLayout />
  <div v-if="isDoctor" class="bg-gradient-to-b from-white via-pink-100 to-pink-100">
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
  const allUserData = await alluser();
  const allUsers = allUserData.data.all_users;
  this.doctors = allUsers.filter(user => user.doctor === true);
  console.log(allUsers);
  this.patients = await getpatientList();

  // Check if the user is a doctor
  const isdoctor = localStorage.getItem('isdoctor')

if (isdoctor === "true") {
  this.isDoctor = true;
} else {
  this.isDoctor = null; // Make it empty (null) if isdoctor is false
}
}
}
</script>