
  <template>
    <div>
      <h1>Regular Frame</h1>
      <div class="flex flex-wrap justify-center gap-4 mt-12">
        <button v-for="(day, index) in days" :key="index" @click="selected = day"
                class="rounded-full py-3 px-6 bg-gray-200 hover:bg-blue-400 text-gray-800 font-bold mb-4"
                :class="{ 'bg-blue-500 text-white': selected === day }"
                v-show="(index + 1) % 5 !== 0 || index === days.length - 1">
          {{ day }}
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RegularFrame',
    data() {
      return {
        days: Array.from({ length: 12 }, (_, i) => 19 + i), // Generate days from 19 to 30
        selected: null,
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
  