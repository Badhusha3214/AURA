<template>
  <div class="flex flex-col items-center justify-center">
    <EnrollProgress :question="selectedType === 'regular' ? 'Regular' : 'Irregular'" />
  </div>

  <div class="flex flex-col items-center mt-1">
    <ul class="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
      <li class="w-full focus-within:z-10">
        <a href="#" class="inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white" aria-current="page" @click="selectedType = 'regular'">regular</a>
      </li>

      <li class="w-full focus-within:z-10">
        <a href="#" class="inline-block w-full p-4 bg-white border-s-0 border-gray-200 dark:border-gray-700 rounded-e-lg hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" @click="selectedType = 'irregular'">irregular</a>
      </li>
    </ul>

    <div class="flex flex-wrap justify-center gap-4 mt-12">
      <button v-for="(day, index) in days" :key="index" @click="selected = day"
              class="rounded-full py-3 px-6 bg-gray-200 hover:bg-blue-400 text-gray-800 font-bold mb-4"
              :class="{ 'bg-blue-500 text-white': selected === day }"
              v-show="(index + 1) % 5 !== 0 || index === days.length - 1">
        {{ day }}
      </button>
    </div>

    <button @click="showPopup" class="mt-4 py-3 px-6 bg-green-500 text-white rounded-full flex items-center justify-center">
      <svg class="ml-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
           xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
      </svg>
    </button>

    <!-- Popup -->
    <div v-if="showPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 z-50">
      <div class="bg-white border-4 border-pink-500 p-8 rounded-lg">
        <label for="dateInput" class="block mb-2">Enter Date:</label>
        <input type="date" id="dateInput" v-model="selectedDate" class="border border-gray-300 p-2 rounded-md">
        <button @click="hidePopup" class="mt-4 py-2 px-4 bg-pink-500 text-white rounded-md">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import EnrollProgress from '@/components/partials/EnrollProgress.vue';

export default {
  name: 'StepOne',
  components: {
    EnrollProgress
  },
  data() {
    return {
      selectedType: 'regular', // Default to regular
      days: Array.from({ length: 14 }, (_, i) => 16 + i), // Generate days from 16 to 29
      selected: null,
      showPopup: false,
      selectedDate: ''
    }
  },
  methods: {
    showPopup() {
      this.showPopup = true;
    },
    hidePopup() {
      // Here you can perform operations when the "Add" button in the popup is clicked
      console.log(`Selected date: ${this.selectedDate}`);
      this.showPopup = false;
    }
  }
}
</script>

<style scoped>
button {
  cursor: pointer;
}
</style>
