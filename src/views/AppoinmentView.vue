<template>
  <IsMobile />
  <DashboardLayout />

  <div v-if="Doctor" class="bg-gradient-to-b from-white via-pink-100 to-pink-100">
  <template v-for="doctor in doctors" :key="doctor.email">
    <div class="mt-2 flex items-center justify-center">
      <AppoinmentCard :doctor="doctor" :full-name="doctor.full_name" :email="doctor.email" />
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
  import { alluser, getDoctorsList, getpatientList } from '@/api/index.js'

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
        Doctor: null,
        patient: true,
        alluser: [],
        doctors: [],
        patients: [],
      }
    },
    methods: {},
    // async mounted() {
    //   const isdoctor = localStorage.getItem('isdoctor')
    //   console.log(isdoctor);
    //   if (isdoctor === "true") {
    //     this.Doctor = true;
    //   } else {
    //     this.Doctor = null; // Make it empty (null) if isdoctor is false
    //   }
    //   this.alluser = await alluser()
    //   this.doctors = await getDoctorsList();
    //   this.patients = await getpatientList();
    //   console.log(this.doctors);
    //   console.log(this.alluser);
    //   console.log(this.patients);
    // }
    async mounted() {
  const isdoctor = localStorage.getItem('isdoctor')

  if (isdoctor === "true") {
    this.Doctor = true;
  } else {
    this.Doctor = null; // Make it empty (null) if isdoctor is false
  }

  const allUserData = await alluser();
  this.doctors = allUserData.data.all_users.filter(user => user.doctor === true).map(user => ({
    email: user.email,
    full_name: user.full_name || user.email // Use email if full_name is not available
  }));
  // console.log(this.doctors);

  this.patients = await getpatientList();
//   console.log(this.patients);
}
  }
</script>