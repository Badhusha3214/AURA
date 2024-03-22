<template>
  <div class="flex flex-col items-center">
    <div class="bg-white rounded-md shadow p-4">
      <div class="flex justify-between items-center mb-4">
        <button class="text-gray-500 hover:text-gray-700" @click="prevMonth">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div class="text-lg font-semibold">{{ currentMonthYear }}</div>
        <button class="text-gray-500 hover:text-gray-700" @click="nextMonth">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div class="grid grid-cols-7 gap-1">
        <div v-for="day in dayNames" :key="day" class="text-xs text-gray-500 text-center">
          {{ day }}
        </div>
      </div>
      <div class="grid grid-cols-7 gap-1">
        <div
          v-for="day in daysInMonth"
          :key="day.date"
          class="text-center py-1"
          :class="{
            'text-gray-300': !day.date.getMonth() === currentDate.getMonth(),
            'text-gray-700 font-semibold bg-gray-200 rounded-full w-8 h-8 mx-auto': day.isToday,
            'text-blue-500 font-semibold bg-blue-100 rounded-full w-8 h-8 mx-auto': day.date === selectedDate,
          }"
        >
          <button @click="selectDate(day.date)" class="focus:outline-none w-full h-full">
            {{ day.day }}
          </button>
        </div>
      </div>
    </div>
    <div class="mt-4 text-gray-700 font-semibold">
      Selected Date: {{ formattedSelectedDate }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calender',
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
    daysInMonth() {
      const daysInMonth = [];
      const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
      const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
      const startingDay = firstDay.getDay();
      let date = startingDay === 0 ? firstDay : new Date(firstDay.setDate(firstDay.getDate() - startingDay));
      while (date <= lastDay) {
        const day = {
          date: new Date(date),
          day: date.getDate(),
          isToday: date.toDateString() === new Date().toDateString(),
        };
        daysInMonth.push(day);
        date.setDate(date.getDate() + 1);
      }
      return daysInMonth;
    },
    formattedSelectedDate() {
      return this.selectedDate ? this.selectedDate.toLocaleDateString() : '';
    },
  },
  methods: {
    prevMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    },
    nextMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    },
    selectDate(date) {
      this.selectedDate = date;
    },
  },
};
</script>