<template>
  <DashboardLayout />

  <div
    class="calendar-container bg-gradient-to-b from-white via-pink-100 to-pink-100 text-gray-700 rounded-lg shadow-md p-8 pb-20">
    <div class="header justify-center mb-8">
      <h1 class="text-2xl text-pink-500 font-bold mb-1">{{ userData.userName }}'s Cycle Tracker</h1>
      <p class="text-gray-500 text-xl">Date of Birth: {{ formatDate(userData.DOB) }}</p>
      <div class="flex justify-between mt-4">
        <!-- <button
          class="bg-white text-pink-500 px-4 py-2 rounded-md shadow-md hover:bg-pink-500 hover:text-white"
          @click="toggleAllNotes()">
          {{ showAllNotes ? 'Hide Notes' : 'Show Notes' }}
        </button>
        <button
          class="bg-white text-pink-500 px-4 py-2 rounded-md shadow-md hover:bg-pink-500 hover:text-white">
          See Graph Analytics
        </button> -->
      </div>
    </div>
    <div class="calendar">
      <div v-for="month in months" :key="month.name" class="month-section">
        <div class="month-header flex justify-between items-center mb-2">
          <div
            class="month cursor-pointer w-full rounded-full text-center py-2 text-pink-500 bg-white hover:bg-pink-500 hover:text-white"
            :class="{ 'bg-pink-500 text-white': showDates[month.name] }"
            @click="toggleDates(month.name)">
            {{ month.name }}
          </div>
        </div>
        <div v-if="showDates[month.name]" class="dates grid grid-cols-7 gap-2">
          <div
            v-for="date in month.dates"
            :key="date"
            class="date cursor-pointer px-4 py-2 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-700"
            :class="{
              'bg-pink-200 text-white': markedDates.includes(date),
              'bg-pink-500 text-white': isLastPeriodStart(date),
              'bg-pink-500 text-white': isPeriodDay(date, month.name),
              'bg-indigo-500 text-white': isOvulationDay(date, month.name)
            }"
            @click="markDate(date)">
            {{ date }}
          </div>
        </div>
        <div v-if="showAllNotes" class="notes bg-white p-4 rounded-md shadow-md mt-4">
          <h2 class="text-xl text-pink-500 font-bold mb-4">Notes</h2>
          <p class="text-gray-500 text-base mb-2">Last Period Start: {{ formatDate(userData.last_period_start) }}</p>
          <p class="text-gray-500 text-base mb-2">Last Cycle Duration: {{ userData.last_cycle_regular }} days</p>
          <p class="text-gray-500 text-base mb-2">Period Duration: {{ userData.duration_period }} days</p>
          <p class="text-gray-500 text-base mb-2">Trying to Conceive: {{ userData.conceiveTrue }}</p>
          <p class="text-gray-500 text-base mb-2">Last Cycle Irregular: {{ userData.last_cycle_irregular }}</p>
        </div>
      </div>
    </div>
  
  </div>
</template>
<script>
  import DashboardLayout from '@/layouts/DashboardLayout.vue'

  function fetchData() {
    const backendData = {
      userName: 'Jane Doe',
      DOB: '1990-05-15',
      last_period_start: '2024-04-18',
      last_cycle_regular: 28,
      duration_period: 5,
      conceiveTrue: true,
      last_cycle_irregular: null,
      periods: [
        {
          month: 'January',
          days: [12, 13, 14, 15, 16, 17]
        },
        {
          month: 'February',
          days: [12, 13, 14, 15, 16, 17]
        },
        {
          month: 'April',
          days: [8, 9, 10, 11, 12, 13]
        }
      ],
      ovulationDays: [
        {
          month: 'January',
          day: 26
        }
      ]
    };

    return backendData;
  }

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

        showAllNotes: false,

        markedDates: [],
        userData: fetchData(),
      };
    },
    components: {
      DashboardLayout
    },
    methods: {
      toggleDates(monthName) {
        this.showDates[monthName] = !this.showDates[monthName];
        // If the clicked month is now visible, hide all other months
        if (this.showDates[monthName]) {
          Object.keys(this.showDates).forEach(month => {
            if (month !== monthName) {
              this.showDates[month] = false;
            }
          });
        }
      },
      toggleAllNotes() {
        this.showAllNotes = !this.showAllNotes;
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
        const lastPeriodStart = new Date(this.userData.last_period_start);
        return (
          date === lastPeriodStart.getDate() &&
          lastPeriodStart.getMonth() === new Date().getMonth()
        );
      },
      isPeriodDay(date, monthName) {
        const periodData = this.userData.periods.find(item => item.month === monthName);
        if (periodData) {
          return periodData.days.includes(date);
        }
        return false;
      },
      isOvulationDay(date, monthName) {
        const ovulationData = this.userData.ovulationDays.find(item => item.month === monthName);
        if (ovulationData) {
          return date === ovulationData.day;
        }
        return false;
      },
    },
  };
</script>