<template>
    
    <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between">
  <div>
    <a href="#">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ doctor.Name }}</h5>
    </a>
    <p class="font-bold text-gray-700">{{ doctor.Department}}</p>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ doctor.Hospital }}</p>
  </div>
  <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-tertiary dark:bg-primary dark:hover:bg-secondary dark:focus:ring-tertiary self-end">
    Book Appointment
  </a>
</div>

</template>
<script>
export default {
  name: 'AppoinmentCard',
  props: {
    doctor: {
      type: Object,
      required: true,
      default: () => ({
        Name: '',
        Department: '',
        Hospital: ''
      })
    }
  }
}

</script>