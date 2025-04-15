<template>
  <div class="control-panel fixed bottom-0 left-0 right-0 w-full bg-white z-50">
    <div class="control-panel__items">
      <router-link v-for="control in controls" :key="control.name" :to="control.route" class="control-panel__item"
        :class="{
          'text-primary': activeControl === control.name.toLowerCase(),
          'text-accent': activeControl !== control.name.toLowerCase(),
        }">
        <span :class="control.icon" class="text-2xl"></span>
        <span class="text-xs font-semibold">{{ control.name }}</span>
      </router-link>
    </div>

    <div class="control-panel__plus-btn ml-2 -mt-12 z-auto">
      <button class="bg-primary text-white rounded-full w-14 h-14 transition-transform duration-300 ease-in-out"
        @click="togglePopup" :class="{ 'rotate-45': showPopup }">
        <span class="text-2xl icon-ic-add"></span>
      </button>
    </div>

    <!-- Slide Popup -->
    <div v-if="showPopup" class="fixed inset-x-0 bottom-20 z-50 flex justify-center">
      <div class="absolute inset-0 bg-black opacity-50" @click="showPopup = false"></div>
      <div
        class="bg-white rounded-t-lg p-6 w-full max-w-screen-sm mx-auto relative z-10 transition-all duration-300 transform"
        :class="{
          'translate-y-0': showPopup,
          'translate-y-full': !showPopup,
        }">
        <h2 class="text-xl font-bold mb-4">Quick View Options</h2>
        <hr class="h-px mb-2 bg-gray-500 border-0 dark:bg-gray-700">

        <div class="grid grid-cols-4 gap-8">
          <div v-for="icon in icons" :key="icon.name" class="flex flex-col items-center" @click="handleIconClick(icon)">
            <div class="w-10 h-10 rounded-full overflow-hidden">
              <img :src="icon.iconSrc" :alt="icon.name" class="w-full h-full object-cover" />
            </div>
            <span class="text-sm text-center mt-2">{{ icon.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Date Picker -->
    <!-- STARTING  -->
    <div v-if="showDatePicker" class="fixed inset-0 z-50 flex items-end sm:items-center">
      <div class="absolute inset-0 bg-black opacity-50" @click="showDatePicker = false"></div>
      <div
        class="bg-white w-full sm:w-96 rounded-t-2xl sm:rounded-2xl p-6 relative z-10 transform transition-transform duration-300 ease-out">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold">Select Starting Date</h2>
          <button @click="showDatePicker = false" class="text-gray-500 hover:text-gray-700">
            <span class="icon-ic-close text-xl"></span>
          </button>
        </div>
        <div v-if="showError" class="text-red-500 mb-4 text-sm">
          Please enter a date on or before today.
        </div>
        <div class="space-y-4">
          <input type="date" id="datePicker"
            class="w-full form-input rounded-xl bg-gray-50 px-4 py-3 border-2 border-gray-200 focus:border-primary focus:ring-0"
            v-model="selectedDate">
          <button @click="setToday"
            class="w-full py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
            Set to Today
          </button>
          <button class="w-full py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
            @click="submitDate">
            Confirm Date
          </button>
        </div>
      </div>
    </div>

    <!-- ENDING -->
    <div v-if="showendingDatePicker" class="fixed inset-0 z-50 flex items-end sm:items-center">
      <div class="absolute inset-0 bg-black opacity-50" @click="showendingDatePicker = false"></div>
      <div
        class="bg-white w-full sm:w-96 rounded-t-2xl sm:rounded-2xl p-6 relative z-10 transform transition-transform duration-300 ease-out">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold">Select Ending Date</h2>
          <button @click="showendingDatePicker = false" class="text-gray-500 hover:text-gray-700">
            <span class="icon-ic-close text-xl"></span>
          </button>
        </div>
        <div v-if="showError" class="text-red-500 mb-4 text-sm">
          Please enter a date on or before today.
        </div>
        <div class="space-y-4">
          <input type="date" id="endDatePicker"
            class="w-full form-input rounded-xl bg-gray-50 px-4 py-3 border-2 border-gray-200 focus:border-primary focus:ring-0"
            v-model="selectedDate">
          <button @click="setToday"
            class="w-full py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
            Set to Today
          </button>
          <button class="w-full py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
            @click="submitendDate">
            Confirm Date
          </button>
        </div>
      </div>
    </div>

    <!-- Mood -->
    <div v-if="yourMood" class="fixed inset-0 z-50 flex justify-center items-center">
      <div class="absolute inset-0 bg-black opacity-50" @click="yourMood = false"></div>
      <div class="bg-white rounded-lg p-6 relative z-10 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">How are you feeling?</h2>
        <div class="grid grid-cols-2 gap-3 mb-4">
          <button
            v-for="mood in moodOptions"
            :key="mood"
            class="px-4 py-3 rounded-lg text-left transition-colors"
            :class="selectedMood === mood ? 
              'bg-pink-500 text-white' : 
              'bg-pink-50 text-pink-600 hover:bg-pink-100'"
            @click="selectMood(mood)"
          >
            {{ mood }}
          </button>
        </div>
        <div class="flex justify-end gap-2 mt-4">
          <button 
            class="px-4 py-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200"
            @click="yourMood = false"
          >
            Cancel
          </button>
          <button 
            class="px-4 py-2 rounded-md bg-pink-500 text-white hover:bg-pink-600"
            @click="submitmood"
            :disabled="!selectedMood"
          >
            Save
          </button>
        </div>
      </div>
    </div>

    <!-- Bleeding Status -->
    <div v-if="bleedingStatus" class="fixed inset-0 z-50 flex justify-center items-center">
      <div class="absolute inset-0 bg-black opacity-50" @click="bleedingStatus = false"></div>
      <div class="bg-white rounded-lg p-6 relative z-10 flex flex-col items-center">
        <h2 class="text-xl font-bold mb-4">How was your bleeding</h2>
        <div class="flex flex-col items-start mb-4">
          <div class="flex items-center mb-2">
            <input id="heavy" class="peer/draft text-red-600 focus:ring-red-500 dark:focus:ring-red-600" type="radio"
              name="status" value="heavy" v-model="bleedingLevel" />
            <label for="heavy" class="peer-checked/draft:text-pink-500 ml-2">Heavy</label>
          </div>
          <div class="flex items-center mb-2">
            <input id="medium" class="peer/draft text-pink-600 focus:ring-pink-500" type="radio" name="status"
              value="medium" v-model="bleedingLevel" />
            <label for="medium" class="peer-checked/draft:text-pink-500 ml-2">Medium</label>
          </div>
          <div class="flex items-center">
            <input id="low" class="peer/draft text-pink-600 focus:ring-pink-500" type="radio" name="status" value="low"
              v-model="bleedingLevel" />
            <label for="low" class="peer-checked/draft:text-pink-500 ml-2">Low</label>
          </div>
        </div>
        <button class="mt-4 bg-primary text-white rounded-md px-4 py-2" @click="submitBleedingLevel">Submit</button>
      </div>
    </div>

  </div>
</template>
<script>

// Fix import statement to include Newnote
import { Newdate, enddate, addPeriodStartDate, addPeriodEndDate, addMoodData, addBleedingStatus, Newnote, getdata } from '@/api/index'
import { calculateMenstrualCycles, getMenstrualCycle, saveCycleData } from '@/utils/helpers'
import { getPeriodData, savePeriodData } from '@/utils/periodStorage';
import { saveCycleDataToAPI } from '@/api/index';

export default {
  name: 'ControlPanel',
  components: {

  },
  data() {
    return {
      controls: [
        { name: 'Home', icon: 'icon-ic-home', route: '/' },
        { name: 'Appoinment', icon: 'icon-ic-appoinment', route: '/appoinment' },
        { name: 'Analytics', icon: 'icon-ic-analytics', route: '/analytics' },
        { name: 'Profile', icon: 'icon-ic-profile', route: '/profile' }
      ],
      activeControl: null,
      showPopup: false,
      showDatePicker: false,
      showendingDatePicker: false,
      yourMood: false,
      selectedDate: null,
      newNoteContent: null,
      bleedingStatus: false,
      bleedingLevel: null,
      icons: [
        { name: 'Add starting date', iconSrc: '/assets/Icons/Group 59.png' },
        { name: 'Add ending date', iconSrc: '/assets/Icons/Group 60.png' },
        { name: 'Your Mood', iconSrc: '/assets/Icons/Group 61.png' },
        { name: 'Bleeding status', iconSrc: '/assets/Icons/Group 62.png' },
        // { name: 'Icon 5', iconSrc: '/assets/Icons/Group 59.png' },
        // { name: 'Icon 6', iconSrc: '/assets/Icons/Group 60.png' },
        // { name: 'Icon 7', iconSrc: '/assets/Icons/Group 61.png' },
        // { name: 'Icon 8', iconSrc: '/assets/Icons/Group 62.png' },
        // { name: 'Icon 9', iconSrc: '/assets/Icons/Group 59.png' },
        // { name: 'Icon 10', iconSrc: '/assets/Icons/Group 60.png' },
        // { name: 'Icon 11', iconSrc: '/assets/Icons/Group 61.png' },
        // { name: 'Icon 12', iconSrc: '/assets/Icons/Group 62.png' }
      ],
      cycleData: {
        cycleLength: 28,
        periodLength: 5,
        lastStartDate: null,
        lastEndDate: null
      },
      moodOptions: [
        "Happy 😊",
        "Energetic ⚡",
        "Tired 😫",
        "Stressed 😰",
        "Emotional 🥺",
        "Irritable 😤",
        "Calm 😌",
        "Anxious 😬"
      ],
      selectedMood: null
    }
  },
  mounted() {
    const currentPath = this.$route.path;
    if (currentPath === '/') {
      this.activeControl = 'home';
    } else {
      this.activeControl = currentPath.split('/')[1];
    }
    // Load saved cycle data
    const savedCycleData = localStorage.getItem('cycleData');
    if (savedCycleData) {
      this.cycleData = JSON.parse(savedCycleData);
    }
  },
  methods: {
    togglePopup() {
      this.showPopup = !this.showPopup
    },
    handleIconClick(icon) {
      if (icon.name === 'Add starting date') {
        this.showDatePicker = true;
      }
      if (icon.name === 'Add ending date') {
        this.showendingDatePicker = true;
      }
      if (icon.name === 'Your Mood') {
        this.yourMood = true;
      }
      if (icon.name === 'Bleeding status') {
        this.bleedingStatus = true;
      }
    },
    async submitDate() {
      try {
        // Get the most recent API data first to check for ongoing periods
        const apiData = await getdata();
        let hasOngoingPeriod = false;
        
        if (apiData && apiData.data && apiData.data.period_dates && apiData.data.period_dates.length > 0) {
            // Check if there's an active period from API data
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const currentYear = currentDate.getFullYear();
            
            // Look for periods in the current month
            const currentPeriods = apiData.data.period_dates.filter(period => 
                Number(period.period_month) === currentMonth && 
                Number(period.period_year) === currentYear
            );
            
            hasOngoingPeriod = currentPeriods.length > 0;
            console.log('Current periods from API:', currentPeriods, 'Has ongoing period:', hasOngoingPeriod);
        }
        
        // If no API data found, fall back to localStorage check
        if (!hasOngoingPeriod) {
            const data = getPeriodData();
            hasOngoingPeriod = data && data.periods && data.periods.length > 0 && 
              data.periods[data.periods.length - 1].startDate && 
              !data.periods[data.periods.length - 1].endDate;
        }
        
        if (hasOngoingPeriod) {
            alert('You already have an ongoing period. Please end your current period before starting a new one.');
            this.showDatePicker = false;
            return;
        }
        
        // Use the API function for adding period start date
        const response = await addPeriodStartDate({ start_date: this.selectedDate });
        
        if (response && response.data && response.data.message) {
            console.log('Period start date saved:', response.data.message);
            
            // Create new period entry for local storage backup
            const newPeriod = {
              startDate: this.selectedDate,
              endDate: null,
              bleedingLevels: [],
              moods: []
            };
            
            // Save to localStorage as backup
            savePeriodData(newPeriod);
            
            // Update cycle calculations and save to both localStorage and API
            const data = getPeriodData();
            const cycles = calculateMenstrualCycles(
                this.selectedDate,
                data.cycleLength || 28,
                data.averagePeriodLength || 5
            );
            
            // Save to both localStorage and API
            await saveCycleData(cycles);
            
            this.showDatePicker = false;
            this.showPopup = false;
            
            // Refresh the page to show updated data from API
            window.location.reload();
        } else {
            alert('Failed to save period start date. Please try again.');
        }
    } catch (error) {
        console.error('Error submitting period start date:', error);
        alert('Error: ' + (error.message || 'Failed to save period start date'));
    }
},
    
    async submitendDate() {
      try {
        // Get the most recent API data first to check for ongoing periods
        const apiData = await getdata();
        let hasPeriodToEnd = false;
        let periodStartDate = null;
        
        if (apiData && apiData.data && apiData.data.period_dates && apiData.data.period_dates.length > 0) {
            // Get the most recent period from API data
            const lastPeriod = apiData.data.period_dates[apiData.data.period_dates.length - 1];
            
            if (lastPeriod.period_dates && lastPeriod.period_dates.length > 0) {
                hasPeriodToEnd = true;
                const periodYear = lastPeriod.period_year;
                const periodMonth = String(lastPeriod.period_month).padStart(2, '0');
                const periodDay = String(lastPeriod.period_dates[0]).padStart(2, '0');
                periodStartDate = `${periodYear}-${periodMonth}-${periodDay}`;
            }
        }
        
        // If no API data found, fall back to localStorage check
        if (!hasPeriodToEnd) {
            const data = getPeriodData();
            const currentPeriod = data && data.periods && data.periods.length > 0 ? 
              data.periods[data.periods.length - 1] : null;
              
            hasPeriodToEnd = currentPeriod && currentPeriod.startDate && !currentPeriod.endDate;
            periodStartDate = currentPeriod ? currentPeriod.startDate : null;
        }
        
        if (!hasPeriodToEnd) {
            alert("You don't have an ongoing period to end. Please start a period first.");
            this.showendingDatePicker = false;
            return;
        }
        
        // Validate selected end date is after start date
        if (periodStartDate) {
            const startDate = new Date(periodStartDate);
            const endDate = new Date(this.selectedDate);
            
            if (endDate < startDate) {
                alert('End date cannot be before the start date (' + startDate.toLocaleDateString() + ')');
                return;
            }
            
            // Calculate all dates in between (inclusive) for local storage
            const allDates = [];
            const currentDate = new Date(startDate);
            
            while (currentDate <= endDate) {
              allDates.push(new Date(currentDate).toISOString().split('T')[0]);
              currentDate.setDate(currentDate.getDate() + 1);
            }
            
            console.log('Period spans these dates:', allDates);
        }
        
        // Use the API function for adding period end date
        const response = await addPeriodEndDate({ end_date: this.selectedDate });
        
        if (response && response.data && response.data.message) {
            console.log('Period end date saved:', response.data.message);
            
            // Update localStorage for backup
            const data = getPeriodData();
            if (data && data.periods && data.periods.length > 0) {
                const currentPeriod = data.periods[data.periods.length - 1];
                if (currentPeriod && !currentPeriod.endDate) {
                    // Set the end date
                    currentPeriod.endDate = this.selectedDate;
                    
                    // Add all dates between start and end to period data
                    currentPeriod.allDates = [];
                    const startDate = new Date(currentPeriod.startDate);
                    const endDate = new Date(this.selectedDate);
                    const tempDate = new Date(startDate);
                    
                    while (tempDate <= endDate) {
                      currentPeriod.allDates.push(new Date(tempDate).toISOString().split('T')[0]);
                      tempDate.setDate(tempDate.getDate() + 1);
                    }
                    
                    savePeriodData(currentPeriod);
                }
            }
            
            // Update cycle calculations and save to both localStorage and API
            const cycles = calculateMenstrualCycles(
                periodStartDate,
                data.cycleLength || 28,
                (new Date(this.selectedDate) - new Date(periodStartDate)) / (1000 * 60 * 60 * 24) + 1
            );
            
            // Save to both localStorage and API
            await saveCycleData(cycles);
            
            this.showendingDatePicker = false;
            this.showPopup = false;
            
            // Refresh the page to show updated data from API
            window.location.reload();
        } else {
            alert('Failed to save period end date. Please try again.');
        }
    } catch (error) {
        console.error('Error submitting period end date:', error);
        alert('Error: ' + (error.message || 'Failed to save period end date'));
    }
},
    
    async submitmood() {
      if (!this.selectedMood) {
        alert('Please select a mood first');
        return;
      }
      
      try {
        console.log('Submitting mood:', this.selectedMood);
        
        const moodData = {
          mood: this.selectedMood,
          date: new Date().toISOString().split('T')[0]
        };
        
        // Log exactly what is being sent to the API
        console.log('Sending mood data to API:', JSON.stringify(moodData, null, 2));
        
        // Use the dedicated mood API function
        const response = await addMoodData(moodData);
        
        console.log('API response for mood submission:', response);
        
        if (response && (response.data || response.status === 200)) {
          console.log('Mood saved successfully');
          
          // Update local storage if needed
          try {
            const data = getPeriodData();
            if (data && data.periods && data.periods.length > 0) {
              const currentPeriod = data.periods[data.periods.length - 1];
              if (currentPeriod) {
                if (!currentPeriod.moods) {
                  currentPeriod.moods = [];
                }
                
                const newMood = {
                  date: moodData.date,
                  note: this.selectedMood
                };
                
                // Log what is being added to localStorage
                console.log('Adding mood to local storage:', JSON.stringify(newMood, null, 2));
                
                currentPeriod.moods.push(newMood);
                savePeriodData(currentPeriod);
                console.log('Mood saved to local storage');
              }
            }
          } catch (storageError) {
            console.error('Error updating local storage:', storageError);
          }
          
          // Close the mood dialog and reset selection
          this.selectedMood = null;
          this.yourMood = false;
          this.showPopup = false;
          
          // Provide feedback to the user
          alert('Your mood has been saved successfully!');
        } else {
          console.warn('Unexpected API response:', response);
          alert('Something went wrong. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting mood:', error);
        alert('Failed to save your mood. Please try again later.');
      }
    },
    
    async submitBleedingLevel() {
      if (!this.bleedingLevel) {
        alert('Please select a bleeding level first');
        return;
      }
      
      try {
        const bleedingData = {
          status: this.bleedingLevel,
          date: new Date().toISOString().split('T')[0]
        };
        
        // Log exactly what is being sent to the API
        console.log('Sending bleeding data to API:', JSON.stringify(bleedingData, null, 2));
        
        // Use the updated API function for bleeding status
        const response = await addBleedingStatus(bleedingData);
        
        if (response && (response.data || response.status === 200)) {
          console.log('Bleeding status saved:', response);
          
          // Update local storage as backup
          const data = getPeriodData();
          if (data && data.periods && data.periods.length > 0) {
            const currentPeriod = data.periods[data.periods.length - 1];
            if (currentPeriod) {
              if (!currentPeriod.bleedingLevels) {
                currentPeriod.bleedingLevels = [];
              }
              
              const newBleeding = {
                date: bleedingData.date,
                level: this.bleedingLevel
              };
              
              // Log what is being added to localStorage
              console.log('Adding bleeding level to local storage:', JSON.stringify(newBleeding, null, 2));
              
              currentPeriod.bleedingLevels.push(newBleeding);
              savePeriodData(currentPeriod);
              console.log('Complete period data after adding bleeding level:', JSON.stringify(data, null, 2));
            }
          }
          
          // Close the dialog and reset
          this.bleedingLevel = null;
          this.bleedingStatus = false;
          this.showPopup = false;
          
          // Provide feedback
          alert('Your bleeding level has been saved successfully!');
        } else {
          alert('Something went wrong. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting bleeding level:', error);
        alert('Failed to save your bleeding level. Please try again later.');
      }
    },
    isSameDay(date1, date2) {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    },
    setToday() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      this.selectedDate = `${year}-${month}-${day}`;
    },
    updateCycleCalculations() {
      const data = getPeriodData();
      if (data && data.periods && data.periods.length > 0) {
        const cycles = calculateMenstrualCycles(
          data.periods[data.periods.length - 1].startDate,
          data.cycleLength || 28,
          data.averagePeriodLength || 5
        );
        
        // Save to both localStorage and API
        saveCycleData(cycles);
      }
    },
    selectMood(mood) {
      console.log('Selected mood:', mood);
      this.selectedMood = mood;
    }
  },
  watch: {
    selectedDate(newDate) {
      if (newDate) {
        const selectedDateObj = new Date(newDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to 00:00:00 to ensure fair comparison

        // Check if the selected date is after today
        if (selectedDateObj > today && !this.isSameDay(selectedDateObj, today)) {
          this.selectedDate = null; // Reset the selected date
          this.showError = true; // Show an error message or notification
        } else {
          this.showError = false; // Hide the error message or notification
        }
      }
    }
  },
  computed: {
    maxDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  }
}
</script>

<style scoped>
body {
  overflow-x: hidden;
}

.control-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0px -2px 3px 0px rgba(0, 0, 0, 0.2);
  z-index: 10;
  /* Increase this value if needed */
}

.control-panel__items {
  @apply flex flex-row justify-around;
}

.control-panel__item:nth-child(2) {
  @apply mr-6;
}

.control-panel__item:nth-child(3) {
  @apply ml-6;
}

.control-panel__item:nth-child(3) span:first-child {
  @apply text-lg;
}

.control-panel__item {
  @apply flex flex-col items-center py-4 cursor-pointer;
}

.control-panel__plus-btn {
  @apply absolute left-1/2 transform -translate-x-1/2 -translate-y-5;
}
</style>