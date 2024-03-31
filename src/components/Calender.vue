<template>
  <div class="flex justify-center">
    <div class="bg-white border border-pink-500 rounded-md p-4 shadow-md sm:w-80 sm:h-96 w-full">
      <div class="flex justify-between items-center mb-4">
        <button class="text-gray-500 hover:text-gray-700" @click="prevMonth">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div class="text-lg font-bold">{{ currentMonthYear }}</div>
        <button class="text-gray-500 hover:text-gray-700" @click="nextMonth">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div class="border-t border-pink-500"></div>
      <div class="grid grid-cols-7 gap-1 bg-gray-200 py-2">
        <div v-for="day in dayNames" :key="day" class="text-xs text-gray-600 font-semibold text-center">
          {{ day }}
        </div>
      </div>
      <div class="grid grid-cols-7 gap-1 sm:h-64 overflow-y-auto">
        <div v-for="day in daysInCurrentMonth" :key="day.date" class="text-center py-1 text-gray-700" :class="{
          'font-semibold bg-gray-200 rounded-full w-8 h-8 mx-auto': day.isToday,
          'text-white bg-pink-500 rounded-full w-8 h-8 mx-auto': day.day === selectedDate,
        }">
          <button @click="selectDate(day.day)" class="focus:outline-none w-full h-full">
            {{ day.day }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  emits: ['dateSelected'],
  data() {
    return {
      currentDate: new Date(),
      selectedDate: null,
      dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    };
  },
  computed: {
    currentMonthYear() {
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      const month = months[this.currentDate.getMonth()];
      const year = this.currentDate.getFullYear();
      return `${month} ${year}`;
    },
    daysInCurrentMonth() {
      const daysInMonth = [];
      const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
      const lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
      for (let date = firstDayOfMonth; date <= lastDayOfMonth; date.setDate(date.getDate() + 1)) {
        const day = {
          date: new Date(date),
          day: date.getDate(),
          isToday: date.toDateString() === new Date().toDateString(),
        };
        daysInMonth.push(day);
      }
      return daysInMonth;
    },
  },
  watch: {
    selectedDate(newVal) {
      const formattedDate = `${newVal}-${this.currentDate.getMonth() + 1}-${this.currentDate.getFullYear()}`;
      console.log("Selected date:", formattedDate);
      // Store selected date in local storage
      localStorage.setItem('selectedDate', formattedDate);
      // Emit the selected date to the parent component
      this.$emit('dateSelected', formattedDate);
    },
  },
  methods: {
    prevMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1);
    },
    nextMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1);
    },
    selectDate(day) {
      this.selectedDate = day;
    },
  },
};
</script>