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
      
      <!-- Fix for the Calendar Legend section -->
      <div class="mb-4 bg-white p-4 rounded-lg shadow-sm">
        <h3 class="font-semibold mb-2">Calendar Legend</h3>
        <div class="flex flex-wrap gap-4">
          <div class="flex items-center">
            <div class="w-4 h-4 rounded-full bg-pink-500 mr-2"></div>
            <span>Recorded Period</span>
          </div>
          <div class="flex items-center">
            <div class="w-4 h-4 rounded-full bg-pink-200 mr-2"></div>
            <span>Predicted Period</span>
          </div>
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
                'bg-pink-500 text-white': isLastPeriodStart(date, month.name) || isPeriodDay(date, month.name),
                'bg-pink-200 text-white': isPredictedPeriodDay(date, month.name) && !isLastPeriodStart(date, month.name) && !isPeriodDay(date, month.name)
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

      <!-- Period predictions section -->
      <div class="mt-6">
        <h3 class="text-xl font-bold mb-4">Period Predictions</h3>
        
        <!-- Next period prediction -->
        <div class="bg-pink-50 p-4 rounded-lg mb-4">
          <h3 class="font-semibold mb-1">Next Expected Period</h3>
          <div class="flex items-center">
            <div class="text-2xl text-pink-500 font-bold">{{ formatNextPeriodDate }}</div>
            <div class="ml-4 text-gray-600">{{ daysUntilNextPeriod }} days from now</div>
          </div>
        </div>
        
        <!-- Past periods that should have occurred -->
        <div v-if="pastPeriods.length > 0" class="mt-4">
          <h3 class="font-semibold mb-2">Recent Predicted Periods You Might Have Missed</h3>
          <div class="space-y-2">
            <div 
              v-for="(period, index) in pastPeriods" 
              :key="index" 
              class="bg-gray-50 p-3 rounded-lg border border-pink-200"
            >
              <div class="flex justify-between items-center">
                <div>
                  <span class="font-medium">{{ formatDate(period.startDate) }}</span> - 
                  <span>{{ formatDate(period.endDate) }}</span>
                </div>
                <button 
                  @click="markPeriodAsRecorded(period)" 
                  class="text-sm px-3 py-1 bg-pink-500 text-white rounded-full hover:bg-pink-600"
                >
                  Record This Period
                </button>
              </div>
            </div>
          </div>
          <div class="mt-2 text-sm text-gray-600">
            These are predicted periods based on your cycle length of {{ averageCycleLength }} days. 
            You can record them if they occurred or adjust your cycle data.
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
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import CycleChart from '@/components/CycleChart.vue';
import { getdata } from '@/api/index';
import { getPeriodData, getMonthlyAnalytics } from '@/utils/periodStorage';
import moment from 'moment';

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
      pastPeriods: [],
      predictedPeriods: [],
      ovulationDays: [], // <-- keep for compatibility, but not used in UI anymore
      isDoctor: false, // Add this property to track doctor status
      debugInfo: {
        lastPeriodStart: null,
        cycleLength: null,
        periodLength: null,
        calculationSteps: []
      }
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
      // Get the latest period data
      const lastPeriodStart = this.userData.last_period_start 
        ? new Date(this.userData.last_period_start) 
        : null;
      
      console.log("DEBUG - Last period start:", lastPeriodStart);
      
      if (!lastPeriodStart) {
        // Fallback to localStorage data if API data not available
        const data = getPeriodData();
        if (data?.periods?.length) {
          const mostRecent = data.periods[data.periods.length - 1];
          return this.calculateNextPeriod(new Date(mostRecent.startDate), data.cycleLength || 28);
        }
        return new Date(); // Default to today if no data
      }
      
      const cycleLength = Number(this.userData.last_cycle_regular) || 28;
      console.log("DEBUG - Cycle length:", cycleLength);
      
      return this.calculateNextPeriod(lastPeriodStart, cycleLength);
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
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },
    
    isLastPeriodStart(date, monthName) {
      if (!this.userData.last_period_start) return false;
      
      const lastPeriodStart = new Date(this.userData.last_period_start);
      const currentMonthIndex = this.months.findIndex(m => m.name === monthName);
      
      return (
        date === lastPeriodStart.getDate() && 
        lastPeriodStart.getMonth() === currentMonthIndex
      );
    },
    
    isPeriodDay(date, monthName) {
      const monthData = this.calendarData.find(m => m.name === monthName);
      return monthData?.periodDates.includes(date) || false;
    },
    
    isPredictedPeriodDay(date, monthName) {
      try {
        // Check if this date is part of any predicted period
        const monthIndex = this.months.findIndex(m => m.name === monthName);
        const currentYear = new Date().getFullYear();
        
        // Create a date object for the current date in the calendar
        const checkDate = new Date(currentYear, monthIndex, date);
        
        // Look through predicted periods
        for (const period of this.predictedPeriods) {
          const startDate = new Date(period.startDate);
          const endDate = new Date(period.endDate);
          
          // Use more reliable date comparison
          if (
            checkDate.getTime() >= startDate.getTime() && 
            checkDate.getTime() <= endDate.getTime()
          ) {
            return true;
          }
        }
        
        return false;
      } catch (error) {
        console.error("Error in isPredictedPeriodDay:", error);
        return false;
      }
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

    calculateNextPeriod(lastPeriodStart, cycleLength) {
      if (!lastPeriodStart) return new Date();
      
      const today = new Date();
      const periodLength = Number(this.userData.duration_period) || 5;
      let nextPeriodDate = new Date(lastPeriodStart);
      
      // Log for debugging
      console.log(`DEBUG - Calculating next period from ${lastPeriodStart.toDateString()} with cycle length ${cycleLength} and period duration ${periodLength}`);
      this.debugInfo.calculationSteps.push(`Starting with last period: ${lastPeriodStart.toDateString()}`);
      
      // Keep adding cycle length until we find a future date
      let count = 0;
      while (nextPeriodDate <= today && count < 20) {  // Limit to prevent infinite loop
        this.debugInfo.calculationSteps.push(`Period ${count}: ${nextPeriodDate.toDateString()} (past)`);
        
        // The formula: next period = last period start + period length + 1 + cycle length
        // First add period length to get to end of period
        let periodEndDate = new Date(nextPeriodDate);
        periodEndDate.setDate(periodEndDate.getDate() + periodLength - 1); // -1 because day 1 is already counted
        
        // Next period = current period start + period length + 1 + cycle length
        // Which means: current period start + (period length - 1) + 1 + cycle length = current period start + period length + cycle length
        nextPeriodDate = new Date(nextPeriodDate);
        nextPeriodDate.setDate(nextPeriodDate.getDate() + periodLength + cycleLength);
        
        this.debugInfo.calculationSteps.push(`Period ${count} ended on: ${periodEndDate.toDateString()}`);
        this.debugInfo.calculationSteps.push(`Next period starts on: ${nextPeriodDate.toDateString()}`);
        count++;
      } 
      
      this.debugInfo.calculationSteps.push(`Final predicted next period: ${nextPeriodDate.toDateString()} (future)`);
      console.log(`DEBUG - Next period calculated as: ${nextPeriodDate.toDateString()}`);
      return nextPeriodDate;
    },

    generatePastPeriods() {
      try {
        const lastPeriodStart = this.userData.last_period_start 
          ? new Date(this.userData.last_period_start) 
          : null;
        if (!lastPeriodStart) {
          console.log("No last period start date found");
          return [];
        }
        
        // Store for debugging
        this.debugInfo.lastPeriodStart = lastPeriodStart;
        this.debugInfo.cycleLength = this.userData.last_cycle_regular || 28;
        this.debugInfo.periodLength = this.userData.duration_period || 5;
        
        const cycleLength = Number(this.userData.last_cycle_regular) || 28;
        const periodLength = Number(this.userData.duration_period) || 5;
        const today = new Date();
        console.log(`Generating periods starting from ${lastPeriodStart.toDateString()} with cycle ${cycleLength} days and duration ${periodLength} days`);
        
        // Generate array of past periods (up to 6 most recent ones)
        const pastPeriods = [];
        this.predictedPeriods = []; // Clear previous predictions
        
        // Generate cycles (both past and future)
        // We'll calculate for past cycles plus 2 future cycles
        const totalCycles = 8; // Calculate 8 cycles for good coverage
        
        // First calculate end date of the initial period
        let initialPeriodEndDate = new Date(lastPeriodStart);
        initialPeriodEndDate.setDate(initialPeriodEndDate.getDate() + periodLength - 1);
        console.log(`Initial period: ${lastPeriodStart.toDateString()} to ${initialPeriodEndDate.toDateString()}`);
        
        // Add the initial period to predictedPeriods if needed for display
        this.predictedPeriods.push({
          startDate: new Date(lastPeriodStart),
          endDate: new Date(initialPeriodEndDate),
          cycle: 0
        });
        
        // Start calculating subsequent periods
        let currentPeriodStart = new Date(lastPeriodStart);
        for (let i = 1; i <= totalCycles; i++) {
          // Apply the formula: next period = last period start + period length + cycle length
          // This accounts for period duration + waiting days between periods
          currentPeriodStart = new Date(currentPeriodStart);
          currentPeriodStart.setDate(currentPeriodStart.getDate() + periodLength + cycleLength);
          
          // Calculate the end of this period: Add period duration to the start date
          const periodEndDate = new Date(currentPeriodStart);
          periodEndDate.setDate(currentPeriodStart.getDate() + periodLength - 1);
          console.log(`Generated period ${i}: ${currentPeriodStart.toDateString()} to ${periodEndDate.toDateString()}`);
          
          // Add to predictedPeriods for calendar display (both past and future)
          this.predictedPeriods.push({
            startDate: new Date(currentPeriodStart),
            endDate: new Date(periodEndDate),
            cycle: i
          });
          
          // Only add to pastPeriods (for UI display) if this period should have ended by now
          if (periodEndDate < today) {
            pastPeriods.push({
              startDate: new Date(currentPeriodStart),
              endDate: new Date(periodEndDate),
              predicted: true
            });
          }
        }
        
        console.log(`Generated ${this.predictedPeriods.length} predicted periods for display`);
        return pastPeriods.reverse(); // Most recent first
      } catch (error) {
        console.error("Error in generatePastPeriods:", error);
        return [];
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
      
      // Calculate past periods that should have occurred
      this.pastPeriods = this.generatePastPeriods();
      
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
        // Only mark dates in the same month
        for (let i = 0; i < duration; i++) {
          const currentDate = new Date(startDate);
          currentDate.setDate(startDate.getDate() + i);
          if (this.getMonthName(currentDate.getMonth() + 1) === monthName) {
            this.markedDates.push(currentDate.getDate());
          }
        }
      } catch (error) {
        console.error('Error calculating period days:', error);
      }
    },
        
    markPeriodAsRecorded(period) {
      // Add the predicted period to the recorded periods
      const data = getPeriodData();
      
      // Create a new period entry
      const newPeriod = {
        startDate: period.startDate.toISOString().split('T')[0],
        endDate: period.endDate.toISOString().split('T')[0],
        allDates: this.generateDateRange(period.startDate, period.endDate),
        moods: [],
        bleedingLevels: []
      };
      
      // Add to local storage
      if (data.periods) {
        data.periods.push(newPeriod);
        localStorage.setItem('periodData', JSON.stringify(data));
      }
      
      // Update the current periods display
      this.periods.push({
        startDate: newPeriod.startDate,
        endDate: newPeriod.endDate,
        month: this.getMonthName(period.startDate.getMonth() + 1),
        year: period.startDate.getFullYear(),
        bleedingLevels: [],
        moods: []
      });
      
      // Remove from pastPeriods array to update the UI
      this.pastPeriods = this.pastPeriods.filter(p => 
        p.startDate.getTime() !== period.startDate.getTime()
      );
      
      // Show success message
      alert('Period recorded successfully!');
    },

    generateDateRange(startDate, endDate) {
      const dates = [];
      const currentDate = new Date(startDate);
      const lastDate = new Date(endDate);
      
      while (currentDate <= lastDate) {
        dates.push(new Date(currentDate).toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      return dates;
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
        
        // Regenerate predictions with updated data
        this.pastPeriods = this.generatePastPeriods();
        
        // Open the current month by default
        const currentMonth = this.getMonthName(new Date().getMonth() + 1);
        this.showDates[currentMonth] = true;
        
        console.log(`Generated ${this.predictedPeriods.length} periods and ${this.pastPeriods.length} past periods`);
      } 
    } catch (error) {
      console.error('Error fetching data from API:', error);
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