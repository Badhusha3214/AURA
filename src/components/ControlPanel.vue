<template>
  <div class="control-panel fixed bottom-0 left-0 right-0 w-full bg-white">
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
          <router-link v-for="icon in icons" :key="icon.name" :to="icon.route" class="flex flex-col items-center">
            <div class="w-10 h-10 rounded-full overflow-hidden">
              <img :src="icon.iconSrc" :alt="icon.name" class="w-full h-full object-cover" />
            </div>
            <span class="text-sm text-center mt-2">{{ icon.name }}</span>
          </router-link>
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
        { name: 'Home', icon: 'icon-ic-home', route: '/' },
        { name: 'Appoinment', icon: 'icon-ic-appoinment', route: '/appoinment' },
        { name: 'Analytics', icon: 'icon-ic-analytics', route: '/analytics' },
        { name: 'Profile', icon: 'icon-ic-profile', route: '/profile' }
      ],
      activeControl: null,
      showPopup: false,
      icons: [
        { name: 'Protected Sex', iconSrc: '/assets/Icons/Group 59.png', route: '/icon1' },
        { name: 'Very Heavy', iconSrc: '/assets/Icons/Group 60.png', route: '/icon2' },
        { name: 'Your Mood', iconSrc: '/assets/Icons/Group 61.png', route: '/icon3' },
        { name: 'Drink Water', iconSrc: '/assets/Icons/Group 62.png', route: '/icon4' },
        { name: 'Icon 5', iconSrc: '/assets/Icons/Group 59.png', route: '/icon5' },
        { name: 'Icon 6', iconSrc: '/assets/Icons/Group 60.png', route: '/icon6' },
        { name: 'Icon 7', iconSrc: '/assets/Icons/Group 61.png', route: '/icon7' },
        { name: 'Icon 8', iconSrc: '/assets/Icons/Group 62.png', route: '/icon8' },
        { name: 'Icon 9', iconSrc: '/assets/Icons/Group 59.png', route: '/icon9' },
        { name: 'Icon 10', iconSrc: '/assets/Icons/Group 60.png', route: '/icon10' },
        { name: 'Icon 11', iconSrc: '/assets/Icons/Group 61.png', route: '/icon11' },
        { name: 'Icon 12', iconSrc: '/assets/Icons/Group 62.png', route: '/icon12' }
      ]
    }
  },
  mounted() {
    this.activeControl = this.$route.path.split('/')[1]
  },
  methods: {
    togglePopup() {
      this.showPopup = !this.showPopup
    }
  }
}
</script>

<style scoped>
.control-panel {
  box-shadow: 0px -2px 3px 0px rgba(0, 0, 0, 0.2);
  z-index: 10;
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