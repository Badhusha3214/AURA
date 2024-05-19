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
    <div v-if="showDatePicker" class="fixed inset-0 z-50 flex justify-center items-center">
      <div class="absolute inset-0 bg-black opacity-50" @click="showDatePicker = false"></div>
      <div class="bg-white rounded-lg p-6 relative z-10">
        <h2 class="text-xl font-bold mb-4">Select Your Starting Date</h2>
        <div v-if="showError" class="text-red-500 mt-2">
          Please enter a date on or before today.
        </div>
        <div class="mr-4">
          <input type="date" id="datePicker" class="form-input rounded-xl bg-gray-50" v-model="selectedDate">
        </div>
        <button class="mt-4 bg-primary text-white rounded-md px-4 py-2" @click="submitDate">Submit</button>
      </div>
    </div>

    <!-- ENDING -->
    <div v-if="showendingDatePicker" class="fixed inset-0 z-50 flex justify-center items-center">
      <div class="absolute inset-0 bg-black opacity-50" @click="showDatePicker = false"></div>
      <div class="bg-white rounded-lg p-6 relative z-10">
        <h2 class="text-xl font-bold mb-4">Select Your Ending Date</h2>
        <div v-if="showError" class="text-red-500 mt-2">
          Please enter a date on or before today.
        </div>
        <div class="mr-4">
          <input type="date" id="datePicker" class="form-input rounded-xl bg-gray-50" v-model="selectedDate">
        </div>
        <button class="mt-4 bg-primary text-white rounded-md px-4 py-2" @click="submitendDate">Submit</button>
      </div>
    </div>

    <!-- Mood -->
    <div v-if="yourMood" class="fixed inset-0 z-50 flex justify-center items-center">
      <div class="absolute inset-0 bg-black opacity-50" @click="showDatePicker = false"></div>
      <div class="bg-white rounded-lg p-6 relative z-10">
        <h2 class="text-xl font-bold mb-4">About Your Moods</h2>
        <p>During the periods time</p>
        <textarea v-model="newNoteContent"
          class=" border-white w-full rounded-md px-4 py-2  placeholder-gray-400  text-base h-48"
          placeholder="Content"></textarea>
        <button class="mt-4 bg-primary text-white rounded-md px-4 py-2" @click="submitmood">Submit</button>
      </div>
    </div>

    <!-- Bleeding Status -->
    <div v-if="bleedingStatus" class="fixed inset-0 z-50 flex justify-center items-center">
      <div class="absolute inset-0 bg-black opacity-50" @click="bleedingStatus = false"></div>
      <div class="bg-white rounded-lg p-6 relative z-10 flex flex-col items-center">
        <h2 class="text-xl font-bold mb-4">How was your bleeding</h2>
        <div class="flex flex-col items-start mb-4">
          <div class="flex items-center mb-2">
            <input id="heavy" class="peer/draft text-red-600 focus:ring-red-500 dark:focus:ring-red-600" type="radio" name="status" value="heavy" v-model="bleedingLevel" />
            <label for="heavy" class="peer-checked/draft:text-pink-500 ml-2">Heavy</label>
          </div>
          <div class="flex items-center mb-2">
            <input id="medium" class="peer/draft text-pink-600 focus:ring-pink-500" type="radio" name="status" value="medium" v-model="bleedingLevel" />
            <label for="medium" class="peer-checked/draft:text-pink-500 ml-2">Medium</label>
          </div>
          <div class="flex items-center">
            <input id="low" class="peer/draft text-pink-600 focus:ring-pink-500" type="radio" name="status" value="low" v-model="bleedingLevel" />
            <label for="low" class="peer-checked/draft:text-pink-500 ml-2">Low</label>
          </div>
        </div>
        <button class="mt-4 bg-primary text-white rounded-md px-4 py-2" @click="submitBleedingLevel">Submit</button>
      </div>
    </div>

  </div>
</template>
<script>

import {Newdate , enddate} from '@/api/index'

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
      ]
    }
  },
  mounted() {
    const currentPath = this.$route.path;
    if (currentPath === '/') {
      this.activeControl = 'home';
    } else {
      this.activeControl = currentPath.split('/')[1];
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
    await Newdate({ start_date: this.selectedDate })
      .then((Response) => {
        console.log(Response);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log('last_period_start:', this.selectedDate);
    localStorage.setItem('last_period_start', this.selectedDate);
    localStorage.setItem('last_period_end', "");
    this.showDatePicker = false;
  } catch (error) {
    console.log(error);
  }
},
    async submitendDate() {
      try {
        await enddate({ end_date:this.selectedDate })
        .then((Response) => {
          console.log(Response);
        })
        console.log('last_period_end', this.selectedDate);
        localStorage.setItem('last_period_end', this.selectedDate);
        this.showendingDatePicker = false;
      } catch (error){
        console.log(error);
      }
      },
    submitmood() {
      // console.log("kitti mone kiti");
      localStorage.setItem('Moods', this.newNoteContent);
      this.yourMood = false;
    },
    submitBleedingLevel() {
      // Handle the selected bleeding level here
      console.log('Bleeding Level:', this.bleedingLevel);
      // Reset or close the modal as needed
      this.bleedingStatus = false;
    },
    isSameDay(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  },
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
  z-index: 10; /* Increase this value if needed */
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