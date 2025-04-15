<template>
  <div
    class="sidebar md:w-64 bg-gray-800 text-white fixed md:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out h-full"
    :class="{ '-translate-x-full': !isOpen, 'translate-x-0': isOpen }">
    <div class="flex justify-between items-center p-4 border-b border-gray-700">
      <div class="flex items-center space-x-3">
        <img src="/assets/logo.png" alt="Logo" class="h-8" />
        <h2 class="text-xl font-bold">Aura</h2>
      </div>
      <button @click="toggleSidebar" class="text-white md:hidden">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <div class="p-4">
      <!-- Admin navigation -->
      <div class="space-y-2">
        <button @click="navigateTo('home')" 
          class="w-full flex items-center p-2 rounded-lg text-left hover:bg-gray-700 transition-colors"
          :class="{ 'bg-gray-700': activeItem === 'home' }">
          <svg class="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          <span>Dashboard</span>
        </button>

        <button @click="navigateTo('users')" 
          class="w-full flex items-center p-2 rounded-lg text-left hover:bg-gray-700 transition-colors"
          :class="{ 'bg-gray-700': activeItem === 'users' }">
          <svg class="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          <span>Users</span>
        </button>

        <!-- <button @click="navigateTo('analytics')" 
          class="w-full flex items-center p-2 rounded-lg text-left hover:bg-gray-700 transition-colors"
          :class="{ 'bg-gray-700': activeItem === 'analytics' }">
          <svg class="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
          <span>Analytics</span>
        </button> -->
      </div>
    </div>

    <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
      <button @click="logout" class="w-full flex items-center p-2 rounded-lg text-left hover:bg-gray-700 transition-colors">
        <svg class="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
        </svg>
        <span>Logout</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    activeItem: {
      type: String,
      default: 'home'
    }
  },
  data() {
    return {
      isMobile: window.innerWidth < 768
    };
  },
  mounted() {
    window.addEventListener('resize', this.checkScreenSize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScreenSize);
  },
  methods: {
    checkScreenSize() {
      this.isMobile = window.innerWidth < 768;
    },
    toggleSidebar() {
      this.$emit('toggle');
    },
    navigateTo(route) {
      this.$emit('navigate', route);
      
      // Close sidebar on mobile after navigation
      if (this.isMobile) {
        this.$emit('toggle');
      }
    },
    logout() {
      document.cookie = "aura-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      localStorage.clear();
      
      // Redirect to login page
      this.$router.push('/enroll');
    }
  }
}
</script>

<style scoped>
.sidebar {
  height: 100vh;
  overflow-y: auto;
}
</style>
