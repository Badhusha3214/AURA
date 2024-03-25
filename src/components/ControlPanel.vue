<template>
    <div class="control-panel absolute bottom-0 w-full bg-white">
      <div class="control-panel__items">
        <router-link
          v-for="control in controls"
          :key="control.name"
          :to="control.route"
          class="control-panel__item"
          :class="{
            'text-primary': activeControl === control.name.toLowerCase(),
            'text-accent': activeControl !== control.name.toLowerCase(),
          }"
        >
          <span :class="control.icon" class="text-2xl"></span>
          <span class="text-xs font-semibold">{{ control.name }}</span>
        </router-link>
      </div>
      <div class="control-panel__plus-btn -mt-10">
        <button
          class="bg-primary text-white rounded-full -mt-10 w-14 h-14"
          @click="showPopup = true"
        >
          <span class="text-2xl icon-ic-add"></span>
        </button>
      </div>
  
      <!-- Slide Popup -->
      <div
        v-if="showPopup"
        class="fixed inset-x-0 top-0 z-50 flex items-start justify-center pt-96 "
      >
        <div
          class="absolute inset-0 "
          @click="showPopup = false"
        ></div>
        <div
          class="bg-secondary   rounded-lg p-6 mx-auto relative z-10 transition-all duration-300 transform"
          :class="{ 'translate-y-0': showPopup, '-translate-y-full': !showPopup }"
        >
          <div class="grid  grid-cols-4 gap-8 w-max">
            <div
              v-for="icon in icons"
              :key="icon.name"
              class="flex flex-col  items-center"
            >
              <div class="bg-gray-200  rounded-full p-8">
                <span :class="icon.iconClass" class="text-2xl"></span>
              </div>
              <span class="text-sm  mt-2">{{ icon.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ControlPanel',
    data() {
      return {
        controls: [
          { name: 'Home', icon: 'icon-ic-home', route: '/home' },
          { name: 'Appoinment', icon: 'icon-ic-appoinment', route: '/appoinment' },
          { name: 'Analytics', icon: 'icon-ic-analytics', route: '/analytics' },
          { name: 'Profile', icon: 'icon-ic-profile', route: '/profile' }
        ],
        activeControl: null,
        showPopup: false,
        icons: [
          { name: 'Icon 1', iconClass: 'icon-ic-icon1' },
          { name: 'Icon 2', iconClass: 'icon-ic-icon2' },
          { name: 'Icon 3', iconClass: 'icon-ic-icon3' },
          { name: 'Icon 4', iconClass: 'icon-ic-icon4' },
          { name: 'Icon 5', iconClass: 'icon-ic-icon5' },
          { name: 'Icon 6', iconClass: 'icon-ic-icon6' },
          { name: 'Icon 7', iconClass: 'icon-ic-icon7' },
          { name: 'Icon 8', iconClass: 'icon-ic-icon8' },
          { name: 'Icon 9', iconClass: 'icon-ic-icon9' },
          { name: 'Icon 10', iconClass: 'icon-ic-icon10' },
          { name: 'Icon 11', iconClass: 'icon-ic-icon11' },
          { name: 'Icon 12', iconClass: 'icon-ic-icon12' }
        ]
      }
    },
    mounted() {
      this.activeControl = this.$route.path.split('/')[1]
    }
  }
  </script>
  
  <style scoped>
  .control-panel {
    box-shadow: 0px -2px 3px 0px rgba(0, 0, 0, 0.2);
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