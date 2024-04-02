<template>
  <div>
    <div class="w-96 h-44 text-center border-pink-500 rounded-3xl border-2 p-4 bg-white">
      <h2 class="text-xl font-bold">Enter the Number of Days</h2>
      <p class="text-sm text-gray-500 mt-3">The number of days must be between 1 to 100</p>
      <slot name="first-day">
        <input type="number" v-model="firstDay" class="border border-gray-300 p-2 rounded-md w-32 mt-6">
      </slot>
      <slot name="second-day">
        <input type="number" v-model="secondDay" class="border border-gray-300 p-2 rounded-md w-32 mt-6 m-2">
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegularFrame',
  data() {
    return {
      firstDay: '', // Holds the value entered by the user for the first slot
      secondDay: '' // Holds the value entered by the user for the second slot
    }
  },
  watch: {
    firstDay(newVal) {
      console.log("First day entered:", newVal);
      // Store first day entered in local storage
      localStorage.setItem('firstDayEntered', newVal);
    },
    secondDay(newVal) {
      console.log("Second day entered:", newVal);
      // Store second day entered in local storage
      localStorage.setItem('secondDayEntered', newVal);
    }
  }
}
</script>
