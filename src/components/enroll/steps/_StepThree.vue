<template>
  <div class="fixed inset-0 flex flex-col bg-white">
    <!-- Header section -->
    <div class="flex-none py-10">
      <div class="flex flex-col items-center justify-center">
        <h1 class="text-2xl font-semibold p-3 text-center">How long is your cycle<br/>usually last?"</h1>
      </div>
    </div>

    <!-- Main scrollable content -->
    <div class="flex-1 overflow-y-auto">
      <div class="flex flex-col items-center">
        <!-- Toggle buttons -->
        <div class="flex text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
          <a href="#" class="w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-l-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white" aria-current="page" @click="selectedType = 'regular'">Regular</a>
          <a href="#" class="w-full p-4 bg-white border-l border-s-0 border-gray-200 dark:border-gray-700 rounded-r-lg hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" @click="selectedType = 'irregular'">Irregular</a>
        </div>

        <!-- Regular input section -->
        <div v-if="selectedType === 'regular'" class="p-12">
          <div class="w-full h-full flex flex-col items-center justify-center gap-4 border-pink-500 rounded-2xl border-2 p-4 bg-white">
            <div class="flex flex-col items-center justify-center gap-2">
              <h2 class="text-xl font-semibold">Enter the Day</h2>
              <p class="text-xs text-gray-500">The day must be between 16 and 100</p>
            </div>
            <input type="number" v-model="regular_days" class="border-l-0 border-r-0 border-t-2 border-b-2 border-pink-500 border-2 p-2 w-32 mt-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 active focus:ring-2 active focus:ring-transparent active focus:border-pink-500 text-center text-xl font-semibold" @input="storeRegularCycle">
          </div>
        </div>

        <!-- Irregular input section -->
        <div v-if="selectedType === 'irregular'" class="p-12">
          <div class="w-full h-full flex flex-col items-center justify-center gap-4 border-pink-500 rounded-2xl border-2 p-4 bg-white">
            <div class="flex flex-col items-center justify-center gap-2">
              <h2 class="text-xl font-semibold">Enter the Day</h2>
              <p class="text-xs text-gray-500">The day must be between 16 and 100</p>
            </div>
            <div class="flex flex-row items-center justify-center gap-3">
              <input type="number" class="border-l-0 border-r-0 border-t-2 border-b-2 border-pink-500 border-2 p-2 w-20 mt-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 active focus:ring-2 active focus:ring-transparent active focus:border-pink-500 text-center text-xl font-semibold" v-model="irregular_start" @input="storeIrregularCycle">
              <p class="text-xl font-semibold text-pink-500">~</p>
              <input type="number" class="border-l-0 border-r-0 border-t-2 border-b-2 border-pink-500 border-2 p-2 w-20 mt-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 active focus:ring-2 active focus:ring-transparent active focus:border-pink-500 text-center text-xl font-semibold" v-model="irregular_end" @input="storeIrregularCycle">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Fixed bottom button section -->
    <div class="w-full flex flex-col justify-center p-5 mt-auto">
        <button class="text-white font-semibold w-full text-lg p-3 rounded-full" :class="{
          'bg-primary': regular_days || (irregular_start && irregular_end),
          'bg-gray-300 cursor-not-allowed': !regular_days && !(irregular_start && irregular_end)
        }" @click="triggerNext" :disabled="!(regular_days || (irregular_start && irregular_end))">
          Next
        </button>
        <button class="gap-2 text-center text-sm font-medium text-gray-500">I'm not sure</button>
      </div>
  </div>
</template>

<script>

export default {
  emits: ['updateEnrollData', 'triggerNext'],
  name: 'StepThree',
  data() {
    return {
      selectedType: 'regular',
      days: Array.from({ length: 14 }, (_, i) => 16 + i),
      regular_days: null,
      irregular_start: null,
      irregular_end: null
    }
  },
  methods: {
    storeRegularCycle() {
      localStorage.setItem('mode', "regular")  
      localStorage.setItem('last_cycle_regular', this.regular_days)
    },
    storeIrregularCycle() {
      localStorage.setItem('mode', "irregular")  
      localStorage.setItem('cycleLength_start', this.irregular_start)
      localStorage.setItem('cycleLength_end', this.irregular_end)
    },
    triggerNext() {
      if (this.selectedType === 'regular') {
        this.$emit('updateEnrollData', {
          cycleDuration: this.regular_days
        })
      } else {
        this.$emit('updateEnrollData', {
          cycleDuration: `${this.irregular_start} ~ ${this.irregular_end}`
        })
      }
      this.$emit('triggerNext', 'StepFour')
    }
  }
}
</script>