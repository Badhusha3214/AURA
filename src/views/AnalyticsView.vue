<template>
  <DashboardLayout />
  <div class="bg-gradient-to-b from-white via-pink-100 to-pink-100 p-4 mb-10">
    <!-- Add tabs for switching between calendar and graph views -->
    <div class="flex mb-4 gap-4">
      <button 
        @click="currentView = 'calendar'"
        :class="['px-4 py-2 rounded-lg', currentView === 'calendar' ? 'bg-pink-500 text-white' : 'bg-white text-pink-500']">
        Calendar View
      </button>
      <button 
        @click="currentView = 'graph'"
        :class="['px-4 py-2 rounded-lg', currentView === 'graph' ? 'bg-pink-500 text-white' : 'bg-white text-pink-500']">
        Graph Analysis
      </button>
    </div>

    <!-- Calendar View -->
    <div v-if="currentView === 'calendar'" class="calendar-container bg-gradient-to-b from-white via-pink-100 to-pink-100 text-gray-700 rounded-lg shadow-md p-8 pb-20">
      <div class="header justify-center mb-8">
        <h1 class="text-2xl text-pink-500 font-bold mb-1"> Your Cycle Tracker</h1>
        <p class="text-gray-500 text-xl">Select any of the months</p>
        <div class="flex justify-between mt-4">
          <!-- <button
            class="bg-white text-pink-500 px-4 py-2 rounded-md shadow-md hover:bg-pink-500 hover:text-white"
            @click="toggleAllNotes()">
            {{ showAllNotes ? 'Hide Notes' : 'Show Notes' }}
          </button> -->
          <!-- <button
            class="bg-white text-pink-500 px-4 py-2 rounded-md shadow-md hover:bg-pink-500 hover:text-white"
            @click="showGraphModal = true">
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

    <!-- Graph View -->
    <div v-if="currentView === 'graph'" class="graph-container bg-white rounded-lg p-4 shadow-md">
      <!-- <h2 class="text-xl font-bold mb-4">Cycle Analysis</h2>
      <div class="h-[400px]">
        <CycleChart :periodData="processedPeriodData" />
      </div> -->
      
      <!-- Statistics Summary -->
      <div class="mt-6 grid grid-cols-2 gap-4">
        <div class="stat-card bg-pink-50 p-4 rounded-lg">
          <h3 class="font-semibold">Average Cycle Length</h3>
          <p class="text-2xl text-pink-500">{{ averageCycleLength }} days</p>
        </div>
        <div class="stat-card bg-pink-50 p-4 rounded-lg">
          <h3 class="font-semibold">Average Period Duration</h3>
          <p class="text-2xl text-pink-500">{{ averagePeriodLength }} days</p>
        </div>
      </div>

      <!-- Add after Statistics Summary -->
      <div class="mt-6">
        <h3 class="text-xl font-bold mb-4">Period Flow & Mood History</h3>
        <div class="space-y-4">
          <div v-for="(period, index) in periodHistory" :key="index" class="bg-pink-50 p-4 rounded-lg">
            <div class="flex justify-between mb-2">
              <span class="font-semibold">{{ formatDate(period.startDate) }}</span>
              <span class="text-pink-500">{{ period.endDate ? formatDate(period.endDate) : 'Ongoing' }}</span>
            </div>
            
            <!-- Flow Levels -->
            <div v-if="period.bleedingLevels?.length" class="mb-2">
              <h4 class="font-medium">Flow Levels:</h4>
              <div class="flex flex-wrap gap-2 mt-1">
                <span v-for="(level, idx) in period.bleedingLevels" 
                      :key="idx"
                      :class="getFlowLevelClass(level.level)"
                      class="px-3 py-1 rounded-full text-sm">
                  {{ level.level }} - {{ formatDate(level.date) }}
                </span>
              </div>
            </div>

            <!-- Moods -->
            <div v-if="period.moods?.length" class="mt-2">
              <h4 class="font-medium">Mood Notes:</h4>
              <div class="space-y-1 mt-1">
                <div v-for="(mood, idx) in period.moods" 
                     :key="idx"
                     class="bg-white p-2 rounded">
                  <div class="text-sm text-gray-600">{{ formatDate(mood.date) }}</div>
                  <div>{{ mood.note }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import CycleChart from '@/components/CycleChart.vue'
import { getdata } from '@/api/index'
import { getPeriodData, getMonthlyAnalytics } from '@/utils/periodStorage';
import moment from 'moment'; // Add this import at the top

async function fetchData() {
 try {
   const response = await getdata();
   const backendData = response.data;
   return backendData;
 } catch (error) {
   console.error('Error fetching data:', error);
   return null;
 }
}

export default {
  components: {
    DashboardLayout,
    CycleChart
  },
 data() {
   return {
     currentView: 'calendar',
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
     showGraphModal: false,

     markedDates: [],
     userData: {},
     periods: [],
     ovulationDays: [],
   };
 },
 computed: {
  processedPeriodData() {
    const data = getPeriodData();
    if (!data?.periods?.length) {
      return [];
    }

    return data.periods.map(period => {
      const startDate = moment(period.startDate);
      const endDate = period.endDate ? moment(period.endDate) : null;
      
      // Calculate actual period length
      const periodLength = endDate ? 
        endDate.diff(startDate, 'days') + 1 : 
        data.averagePeriodLength || 5;

      return {
        month: this.getMonthName(startDate.month()),
        year: startDate.year(),
        cycleLength: data.cycleLength || 28,
        periodLength: Math.min(Math.max(periodLength, 1), 10)
      };
    });
  },
  
  averageCycleLength() {
    const data = getPeriodData();
    return Math.min(Math.max(data.cycleLength || 28, 21), 35);
  },
  
  averagePeriodLength() {
    const data = getPeriodData();
    const length = data.averagePeriodLength || 5;
    return Math.min(Math.max(length, 1), 10);
  },
  
  calendarData() {
    const monthlyData = getMonthlyAnalytics();
    return this.months.map(month => {
      const monthIndex = this.getMonthNumber(month.name);
      const yearMonth = `${new Date().getFullYear()}-${monthIndex}`;
      return {
        ...month,
        periodDates: monthlyData[yearMonth]?.periodDates || [],
        symptoms: monthlyData[yearMonth]?.symptoms || []
      };
    });
  },

  periodHistory() {
    const data = getPeriodData();
    return data.periods.map(period => ({
      ...period,
      bleedingLevels: period.bleedingLevels || [],
      moods: period.moods || []
    })).reverse(); // Show most recent first
  }
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
     const monthData = this.calendarData.find(m => m.name === monthName);
     return monthData?.periodDates.includes(date) || false;
   },
   isOvulationDay(date, monthName) {
     if (this.userData.ovulationDays) {
       const ovulationData = this.userData.ovulationDays.find(item => item.month === monthName);
       if (ovulationData) {
         return date === ovulationData.day;
       }
     }
     return false;
   },
   getMonthName(monthNumber) {
     const months = [
       'January', 'February', 'March', 'April', 'May', 'June',
       'July', 'August', 'September', 'October', 'November', 'December'
     ];
     return months[monthNumber - 1];
   },
   getMonthNumber(monthName) {
     return this.months.findIndex(m => m.name === monthName) + 1;
   },
   getSymptoms(date, monthName) {
     const monthData = this.calendarData.find(m => m.name === monthName);
     return monthData?.symptoms.filter(s => s.date === date) || [];
   },
   getFlowLevelClass(level) {
     switch(level.toLowerCase()) {
       case 'heavy':
         return 'bg-red-100 text-red-700';
       case 'medium':
         return 'bg-orange-100 text-orange-700';
       case 'light':
       case 'low':
         return 'bg-yellow-100 text-yellow-700';
       default:
         return 'bg-gray-100 text-gray-700';
     }
   },
   formatDate(dateString) {
     return new Date(dateString).toLocaleDateString('en-US', {
       month: 'short',
       day: 'numeric',
       year: 'numeric'
     });
   }
 },
 async mounted() {
   const data = await fetchData();
   if (data && data.period_dates) {
     // Initialize periods and ovulationDays arrays
     const periods = [];
     const ovulationDays = [];

     // Process the period_dates from the backend data
     data.period_dates.forEach(periodData => {
       const periodDays = periodData.period_dates[0].split(',');
       const periodMonth = periodData.period_month;
       const periodYear = periodData.period_year;

       // Add the period days to the periods array
       periods.push({
         month: this.getMonthName(periodMonth),
         days: periodDays.map(Number)
       });

       // Add the ovulation day to the ovulationDays array (if available)
       if (periodData.ovulation_date) {
         const ovulationDay = Number(periodData.ovulation_date.split(',')[0]);
         ovulationDays.push({
           month: this.getMonthName(periodMonth),
           day: ovulationDay
         });
       }
     });

     // Update the userData with the processed data
     this.userData = {
       userName: data.user_name,
       DOB: data.dob,
       last_period_start: data.last_period_start,
       last_cycle_regular: data.last_cycle_regular,
       duration_period: data.duration_period,
       conceiveTrue: data.conceive_true,
       last_cycle_irregular: data.last_cycle_irregular,
       periods,
       ovulationDays
     };
   } else {
     console.error('Invalid or missing data from API');
   }
 },
};
</script>

<style scoped>
.flow-history {
  max-height: 400px;
  overflow-y: auto;
}
</style>