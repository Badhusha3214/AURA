<template>
  <div class="calendar-container bg-pink-100 text-gray-700 rounded-lg shadow-md p-8">
    <div class="header flex justify-center mb-8">
      <h1 class="text-2xl text-pink-500 font-bold mb-1">{{ userName }}'s Cycle Tracker</h1>
      <p class="text-gray-500 text-xl">Date of Birth: {{ formatDate(DOB) }}</p>
    </div>
    <div class="calendar">
      <div class="month-list  justify-center mb-4">
        <div v-for="month in months" :key="month.name"
          class="month cursor-pointer px-4 py-2 rounded-md text-pink-500 hover:bg-pink-500 hover:text-white mr-2"
          :class="{ 'bg-pink-500 text-white': showDates[month.name] }" @click="toggleDates(month.name)">
          {{ month.name }}
        </div>
      </div>
      <div v-for="month in months" :key="month.name" class="month-dates">
        <div v-if="showDates[month.name]" class="dates grid grid-cols-7 gap-2">
          <div v-for="date in month.dates" :key="date"
            class="date cursor-pointer px-4 py-2 rounded-md text-gray-500 hover:bg-gray-200 hover:text-gray-700" :class="{
        'bg-pink-200 text-white': markedDates.includes(date),
        'bg-pink-500 text-white': isLastPeriodStart(date),
        'bg-pink-500 text-white': isPeriodDay(date, month.name),
        'bg-indigo-500 text-white': isOvulationDay(date, month.name)
      }" @click="markDate(date)">
            {{ date }}
          </div>
        </div>
      </div>
    </div>
    <div class="notes bg-white p-4 rounded-md shadow-md">
      <h2 class="text-xl text-pink-500 font-bold mb-4">Notes</h2>
      <p class="text-gray-500 text-base mb-2">Last Period Start: {{ formatDate(last_period_start) }}</p>
      <p class="text-gray-500 text-base mb-2">Last Cycle Duration: {{ last_cycle_regular }} days</p>
      <p class="text-gray-500 text-base mb-2">Period Duration: {{ duration_period }} days</p>
      <p class="text-gray-500 text-base mb-2">Trying to Conceive: {{ conceiveTrue }}</p>
      <p class="text-gray-500 text-base mb-2">Last Cycle Irregular: {{ last_cycle_irregular }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        months: [
          { name: 'January', dates: [...Array(31).keys()].map((x) => x + 1) },
          { name: 'February', dates: [...Array(28).keys()].map((x) => x + 1) },
          { name: 'March', dates: [...Array(31).keys()].map((x) => x + 1) },
          { name: 'April', dates: [...Array(30).keys()].map((x) => x + 1) },
          { name: 'May', dates: [...Array(31).keys()].map((x) => x + 1) },
          { name: 'June', dates: [...Array(30).keys()].map((x) => x + 1) },
          { name: 'July', dates: [...Array(31).keys()].map((x) => x + 1) },
          { name: 'August', dates: [...Array(31).keys()].map((x) => x + 1) },
          { name: 'September', dates: [...Array(30).keys()].map((x) => x + 1) },
          { name: 'October', dates: [...Array(31).keys()].map((x) => x + 1) },
          { name: 'November', dates: [...Array(30).keys()].map((x) => x + 1) },
          { name: 'December', dates: [...Array(31).keys()].map((x) => x + 1) }
        ],

        showDates: {
          January: false,
          February: false,
          March: false,
          April: false,
          May: false,
          June: false,
          July: false,
          August: false,
          September: false,
          October: false,
          November: false,
          December: false
        },

        markedDates: [],
        userName: 'badhusha',
        DOB: '12/12/2121',
        last_period_start: '2024-4-18',
        last_cycle_regular: 31,
        duration_period: 6,
        conceiveTrue: true,
        last_cycle_irregular: null,
      };
    },
    methods: {
      toggleDates(monthName) {
        this.showDates[monthName] = !this.showDates[monthName];
      },
      markDate(date) {
        if (this.markedDates.includes(date)) {
          this.markedDates = this.markedDates.filter((d) => d !== date);
        } else {
          this.markedDates.push(date);
        }
      },
      formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString();
      },
      isLastPeriodStart(date) {
        const lastPeriodStart = new Date(this.last_period_start);
        return (
          date === lastPeriodStart.getDate() &&
          lastPeriodStart.getMonth() === new Date().getMonth()
        );
      },
      isPeriodDay(date, monthName) {
        if (monthName === 'January') {
          const periodDays = [12, 13, 14, 15, 16, 17];
          return periodDays.includes(date);
        }
        if (monthName === 'February') {
          const periodDays = [12, 13, 14, 15, 16, 17];
          return periodDays.includes(date);
        }
        return false;
      },
      isOvulationDay(date, monthName) {
        if (monthName === 'January' && date === 26) {
          return true;
        }
        return false;
      },
    },
  };
</script>
