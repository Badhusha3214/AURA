<template>
  <div class="my-10 py-10">
    <div class="flex flex-col items-center justify-center">
      <EnrollProgress question="How long does your period <br/>usually last?" />
    </div>

    <div class="flex flex-col items-center mt-1">
      <div class="flex text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
        <a href="#" class="w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-l-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white" aria-current="page" @click="selectedType = 'regular'">Regular</a>
        <a href="#" class="w-full p-4 bg-white border-l border-s-0 border-gray-200 dark:border-gray-700 rounded-r-lg hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" @click="selectedType = 'irregular'">Irregular</a>
      </div>

      <div v-if="selectedType === 'regular'" class="p-12">
        <div class="w-full h-full flex flex-col items-center justify-center gap-4 border-pink-500 rounded-2xl border-2 p-4 bg-white">
          <div class="flex flex-col items-center justify-center gap-2">
            <h2 class="text-xl font-semibold">Enter the Day</h2>
            <p class="text-xs text-gray-500">The day must be between 1 and 30</p>
          </div>
          <input type="number" v-model="regular_days" class="border-l-0 border-r-0 border-t-2 border-b-2 border-pink-500 border-2 p-2 w-32 mt-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 active focus:ring-2 active focus:ring-transparent active focus:border-pink-500 text-center text-xl font-semibold" @input="logAndStoreRegularData">
        </div>
      </div>

      <div v-if="selectedType === 'irregular'" class="p-12">
        <div class="w-full h-full flex flex-col items-center justify-center gap-4 border-pink-500 rounded-2xl border-2 p-4 bg-white">
          <div class="flex flex-col items-center justify-center gap-2">
            <h2 class="text-xl font-semibold">Enter the Day</h2>
            <p class="text-xs text-gray-500">The day must be between 16 and 100</p>
          </div>
          <div class="flex flex-row items-center justify-center gap-3">
            <input type="number" class="border-l-0 border-r-0 border-t-2 border-b-2 border-pink-500 border-2 p-2 w-20 mt-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 active focus:ring-2 active focus:ring-transparent active focus:border-pink-500 text-center text-xl font-semibold" v-model="irregular_start" @input="logAndStoreIrregularData">
            <p class="text-xl font-semibold text-pink-500">~</p>
            <input type="number" class="border-l-0 border-r-0 border-t-2 border-b-2 border-pink-500 border-2 p-2 w-20 mt-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 active focus:ring-2 active focus:ring-transparent active focus:border-pink-500 text-center text-xl font-semibold" v-model="irregular_end" @input="logAndStoreIrregularData">
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-0 w-full flex justify-center mb-12">
      <div class="relative flex flex-col items-center gap-2 justify-center my-3">
        <button class="text-white font-semibold text-xl w-72 p-3 rounded-full" :class="{
          'bg-primary': regular_days || (irregular_start && irregular_end),
          'bg-gray-300 cursor-not-allowed': !regular_days && !(irregular_start && irregular_end)
        }" @click="triggerNext" :disabled="!(regular_days || (irregular_start && irregular_end))">
          Next
        </button>
        <button class="flex flex-row items-center gap-2 justify-center text-sm font-medium text-gray-500">I'm not sure</button>
      </div>
    </div>
  </div>
</template>

<script>
import EnrollProgress from '@/components/partials/EnrollProgress.vue';

export default {
  emits: ['updateEnrollData', 'triggerNext'],
  name: 'StepThree',
  components: {
    EnrollProgress
  },
  data() {
    return {
      selectedType: 'regular',
      days: Array.from({ length: 14 }, (_, i) => 16 + i),
      mode: null,
      regular_days: null,
      irregular_start: null,
      irregular_end: null
    }
  },
  computed: {
    conceive: {
      get() {
        return this.$store.state.conceive;
      },
      set(v) {
        this.triggerNext(v);
      },
    },
  },
  methods: {
    logAndStoreRegularData() {
        console.log(this.regular_days);
        console.log(this.selectedType);
        localStorage.setItem('mode', this.selectedType );
        localStorage.setItem('periodLength', this.regular_days );
        localStorage.setItem('periodLength_start', null);
        localStorage.setItem('periodLength_end', null);
    },
    logAndStoreIrregularData() {
      

      console.log(this.irregular_start);
      console.log(this.irregular_end);
      localStorage.setItem('mode', this.selectedType );
      localStorage.setItem('periodLength', null );
      localStorage.setItem('periodLength_start', this.irregular_start);
      localStorage.setItem('periodLength_end', this.irregular_end);
    },
    triggerNext() {
      if (this.selectedType === 'regular') {
        this.$emit('updateEnrollData', {
          periodDuration: this.regular_days
        })
      } else {
        this.$emit('updateEnrollData', {
          periodDuration: `${this.irregular_start} ~ ${this.irregular_end}`
        })
      }

      this.$emit('triggerNext', 'StepThree')
    }
  }
}
</script>