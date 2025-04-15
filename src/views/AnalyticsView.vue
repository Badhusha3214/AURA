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
      <div class="h-[300px] mb-6">
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

      <!-- Expected next period section -->
      <div class="mt-6">
        <div class="bg-pink-50 p-4 rounded-lg">
          <h3 class="font-semibold mb-1">Expected Next Period</h3>
          <div class="flex items-center">
            <div class="text-2xl text-pink-500 font-bold">{{ formatNextPeriodDate }}</div>
            <div class="ml-4 text-gray-600">{{ daysUntilNextPeriod }} days from now</div>
          </div>
        </div>
      </div>

      <!-- Period Flow & Mood History -->
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
      isDoctor: false, // Add this property to track doctor status
    };
  },
  computed: {
    processedPeriodData() {
      // First try to get data from API
      if (this.userData && this.userData.periods && this.userData.periods.length > 0) {
        return this.userData.periods.map(period => {
          const startDate = new Date(period.startDate);
          const endDate = period.endDate ? new Date(period.endDate) : null;
          
          return {
            month: this.getMonthName(startDate.getMonth() + 1),
            year: startDate.getFullYear(),
            startDay: startDate.getDate(),
            endDay: endDate ? endDate.getDate() : null,
            duration: endDate ? 
              Math.floor((endDate - startDate) / (86400000)) + 1 : 
              this.userData.duration_period || 5,
            cycleLength: this.userData.last_cycle_regular || 28
          };
        });
      }
      
      // Fallback to stored data
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
          month: this.getMonthName(startDate.month() + 1),
          year: startDate.year(),
          startDay: startDate.date(),
          endDay: endDate ? endDate.date() : null,
          duration: periodLength,
          cycleLength: data.cycleLength || 28
        };
      });
    },
    
    averageCycleLength() {
      if (this.userData && this.userData.last_cycle_regular) {
        return Math.min(Math.max(this.userData.last_cycle_regular, 21), 35);
      }
      
      const data = getPeriodData();
      return Math.min(Math.max(data.cycleLength || 28, 21), 35);
    },
    
    averagePeriodLength() {
      if (this.userData && this.userData.duration_period) {
        return Math.min(Math.max(this.userData.duration_period, 1), 10);
      }
      
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
    },
    
    nextPeriodDate() {
      // Try to calculate from API data first
      if (this.userData && this.userData.last_period_start) {
        const lastPeriodStart = new Date(this.userData.last_period_start);
        const cycleLength = Number(this.userData.last_cycle_regular) || 28;
        
        const nextPeriodDate = new Date(lastPeriodStart);
        nextPeriodDate.setDate(lastPeriodStart.getDate() + cycleLength);
        
        return nextPeriodDate;
      }
      
      // Fallback to localStorage data
      const data = getPeriodData();
      if (data && data.periods && data.periods.length > 0) {
        const mostRecent = data.periods[data.periods.length - 1];
        const startDate = new Date(mostRecent.startDate);
        const cycleLength = Number(data.cycleLength) || 28;
        
        const nextPeriodDate = new Date(startDate);
        nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLength);
        
        return nextPeriodDate;
      }
      
      // If no data is available, return current date
      return new Date();
    },
    
    formatNextPeriodDate() {
      return this.nextPeriodDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long', 
        day: 'numeric'
      });
    },
    
    daysUntilNextPeriod() {
      const today = new Date();
      const diffTime = this.nextPeriodDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return Math.max(0, diffDays);
    }
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
    },
    checkDoctorStatus() {
      // Check if user is a doctor from localStorage
      const isDoctor = localStorage.getItem('isdoctor');
      this.isDoctor = isDoctor === 'true';
      
      console.log('Doctor status:', this.isDoctor);
      
      // If user is a doctor, modify the view as needed
      if (this.isDoctor) {
        // For doctors, we might want to default to the graph view
        this.currentView = 'graph';
      }
    },
    
    getPeriodDataFromStorage() {
      // Get period data from localStorage
      const lastPeriodStart = localStorage.getItem('last_period_start');
      const cycleLength = localStorage.getItem('last_cycle_regular');
      const periodDuration = localStorage.getItem('duration_period');
      const lastIrregularStart = localStorage.getItem('last_cycle_irregular_start');
      const lastIrregularLast = localStorage.getItem('last_cycle_irregular_last');
      
      // Update user data
      this.userData = {
        ...this.userData,
        last_period_start: lastPeriodStart || '',
        last_cycle_regular: cycleLength || '28',
        duration_period: periodDuration || '5',
        last_cycle_irregular_start: lastIrregularStart || '',
        last_cycle_irregular_last: lastIrregularLast || '',
      };
      
      console.log('Period data from storage:', this.userData);
      
      // If we have last period start, calculate period days for display
      if (lastPeriodStart) {
        this.calculatePeriodDays(lastPeriodStart, periodDuration);
      }
    },
    
    calculatePeriodDays(startDateStr, durationDays) {
      if (!startDateStr) return;
      
      try {
        const startDate = new Date(startDateStr);
        const monthName = this.getMonthName(startDate.getMonth() + 1);
        
        // Open the month where period starts
        this.showDates[monthName] = true;
        
        // Mark period days
        const duration = parseInt(durationDays) || 5;
        for (let i = 0; i < duration; i++) {
          const currentDate = new Date(startDate);
          currentDate.setDate(startDate.getDate() + i);
          
          // Only mark dates in the same month
          if (this.getMonthName(currentDate.getMonth() + 1) === monthName) {
            this.markedDates.push(currentDate.getDate());
          }
        }
      } catch (error) {
        console.error('Error calculating period days:', error);
      }
    }
  },
  async mounted() {
    // Check if user is a doctor first
    this.checkDoctorStatus();
    
    // Get period data from localStorage
    this.getPeriodDataFromStorage();
    
    try {
      // Fetch data from API
      const apiResponse = await getdata();
      console.log('API response in Analytics:', apiResponse);
      
      if (apiResponse && apiResponse.data) {
        const apiData = apiResponse.data;
        
        // Set user data from API
        this.userData = {
          ...this.userData,
          userName: apiData.email ? apiData.email.split('@')[0] : 'User',
          dob: apiData.dob,
          last_period_start: apiData.last_period_start || this.userData.last_period_start,
          last_cycle_regular: apiData.last_cycle_regular || this.userData.last_cycle_regular,
          duration_period: apiData.duration_period || this.userData.duration_period,
          conceiveTrue: apiData.conceive_true,
          isDoctor: apiData.doctor,
        };
        
        // Update doctor status if available from API
        if (apiData.doctor !== undefined) {
          this.isDoctor = apiData.doctor;
        }
        
        // Use period dates from API
        if (apiData.period_dates && apiData.period_dates.length > 0) {
          // Process data for the calendar
          apiData.period_dates.forEach(periodEntry => {
            const monthName = this.getMonthName(parseInt(periodEntry.period_month) + 1);
            // Set this month to be open by default
            this.showDates[monthName] = true;
            
            // Mark dates for this month
            const dates = periodEntry.period_dates;
            if (typeof dates === 'string') {
              // Handle periods_dates as string
              const dateArray = dates.split(',').map(d => parseInt(d.trim()));
              this.markedDates.push(...dateArray);
            } else if (Array.isArray(dates)) {
              // Handle periods_dates as array
              this.markedDates.push(...dates.map(d => parseInt(d)));
            }
          });
        }
        
        // Use comprehensive period data if available
        if (apiData.periods && apiData.periods.length > 0) {
          this.periods = apiData.periods.map(period => ({
            startDate: period.startDate,
            endDate: period.endDate,
            month: this.getMonthName(new Date(period.startDate).getMonth() + 1),
            year: new Date(period.startDate).getFullYear(),
            bleedingLevels: period.bleedingLevels || [],
            moods: period.moods || []
          }));
          
          // Calculate ovulation days based on cycle
          this.periods.forEach(period => {
            const startDate = new Date(period.startDate);
            const cycleLength = this.userData.last_cycle_regular || 28;
            
            // Ovulation is around midpoint of cycle
            const ovulationDate = new Date(startDate);
            ovulationDate.setDate(startDate.getDate() + Math.floor(cycleLength / 2));
            
            this.ovulationDays.push({
              month: this.getMonthName(ovulationDate.getMonth() + 1),
              day: ovulationDate.getDate()
            });
          });
        }
      }
    } catch (error) {
      console.error('Error fetching data from API:', error);
      
      // Fall back to local storage data
      const data = getPeriodData();
      if (data && data.periods && data.periods.length > 0) {
        this.periods = data.periods.map(period => ({
          startDate: period.startDate,
          endDate: period.endDate,
          month: this.getMonthName(new Date(period.startDate).getMonth() + 1),
          year: new Date(period.startDate).getFullYear(),
          bleedingLevels: period.bleedingLevels || [],
          moods: period.moods || []
        }));
        
        // Mark dates on calendar
        this.periods.forEach(period => {
          const startMonth = this.getMonthName(new Date(period.startDate).getMonth() + 1);
          this.showDates[startMonth] = true;
          
          // Mark all days in the period
          if (period.allDates && period.allDates.length > 0) {
            period.allDates.forEach(dateStr => {
              const date = new Date(dateStr);
              if (this.getMonthName(date.getMonth() + 1) === startMonth) {
                this.markedDates.push(date.getDate());
              }
            });
          } else {
            // If allDates not available, just mark start date
            this.markedDates.push(new Date(period.startDate).getDate());
            if (period.endDate) {
              this.markedDates.push(new Date(period.endDate).getDate());
            }
          }
        });
      }
    }
  }
}
</script>

<style scoped>
.flow-history {
  max-height: 400px;
  overflow-y: auto;
}
</style>