<template>
  <div class="flex flex-col items-center justify-center">
    <EnrollProgress :question="selectedType === 'regular' ? 'Regular' : 'Irregular'" />
  </div>

  <div class="flex flex-col items-center mt-1">
   

  <div class="flex text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
    <a href="#" class="w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-l-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white" aria-current="page" @click="selectedType = 'regular'">Regular</a>
    <a href="#" class="w-full p-4 bg-white border-l border-s-0 border-gray-200 dark:border-gray-700 rounded-r-lg hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" @click="selectedType = 'irregular'">Irregular</a>
  </div>


    <!-- Regular Frame -->
    <div v-if="selectedType === 'regular'" class="flex flex-wrap justify-center gap-4 mt-12">
      <RegularFrame />
    </div>

    <!-- Irregular Frame -->
    <div v-if="selectedType === 'irregular'" class="flex flex-wrap justify-center gap-4 mt-12">
      <IrregularFrame />
    </div>
    
  </div>
</template>

<script>
import EnrollProgress from '@/components/partials/EnrollProgress.vue';
import IrregularFrame from '@/components/enroll/irregular.vue';
import RegularFrame from '@/components/enroll/regular.vue';

export default {
  name: 'StepThree',
  components: {
    EnrollProgress,
    RegularFrame,
    IrregularFrame
  },
  data() {
    return {
      selectedType: 'regular', // Default to irregular
      days: Array.from({ length: 14 }, (_, i) => 16 + i), // Generate days from 16 to 29
      selected: null,
      showPopup: false,
      selectedDate: ''
    }
  },
}
</script>

<style scoped>
button {
  cursor: pointer;
}
</style>
