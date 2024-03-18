<template>
    <div>
      <div class="w-96 h-99 text-center border-pink-500 rounded-3xl border-2 p-4 bg-white">
        <h2 class="text-xl font-bold">Enter the Number of Days</h2>
        <p class="text-sm text-gray-500">The number of days must be between 1 to 100</p>
        <input type="number" v-model="numberOfDays" class="border border-gray-300 p-2 rounded-md w-32 mt-2">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RegularFrame',
    data() {
      return {
        numberOfDays: '' // Holds the value entered by the user
      }
    }
  }
  </script>
  
  <!-- No scoped style tag needed -->
  
  