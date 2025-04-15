<template>
  <div class="flex flex-col md:flex-row h-screen overflow-hidden">
    <!-- Sidebar Component -->
    <Sidebar 
      :isOpen="showSidebar" 
      :isAdmin="true" 
      :activeItem="currentView"
      @toggle="toggleSidebar"
      @navigate="toggleView" 
      class="z-30"
    />

    <!-- Mobile menu button - only visible on small screens -->
    <div class="md:hidden fixed top-4 left-4 z-40">
      <button class="p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-500" @click="toggleSidebar">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>

    <!-- Overlay for mobile when sidebar is open -->
    <div 
      v-if="showSidebar" 
      class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
      @click="toggleSidebar"
    ></div>

    <!-- Main content area -->
    <main class="flex-1 p-4 bg-gray-100 overflow-y-auto transition-all duration-300" :class="{'md:ml-0': showSidebar}">
      <!-- Page title -->
      <div class="mb-6 mt-8 md:mt-0">
        <h1 class="text-2xl font-bold text-gray-800">{{ pageTitle }}</h1>
      </div>

      <!-- Home View -->
      <div v-if="currentView === 'home'" class="space-y-6">
        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="bg-white p-6 rounded-md shadow-md flex flex-col items-center justify-center">
            <h3 class="text-sm font-medium text-gray-500 mb-2">Total Users</h3>
            <span class="text-2xl font-bold text-gray-800">{{ totalUsers }}</span>
          </div>
          <div class="bg-white p-6 rounded-md shadow-md flex flex-col items-center justify-center">
            <h3 class="text-sm font-medium text-gray-500 mb-2">Doctors</h3>
            <span class="text-2xl font-bold text-gray-800">{{ totalDoctors }}</span>
          </div>
          <div class="bg-white p-6 rounded-md shadow-md flex flex-col items-center justify-center">
            <h3 class="text-sm font-medium text-gray-500 mb-2">Regular Users</h3>
            <span class="text-2xl font-bold text-gray-800">{{ totalRegularUsers }}</span>
          </div>
        </div>

        <!-- Chart Section -->
        <div class="bg-white p-4 sm:p-6 rounded-md shadow-md">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-0">Users this week</h2>
            <div class="flex items-center text-green-500">
              <span class="mr-1">{{ totalUsers }}</span>
              <span class="text-gray-600 ml-1">total users</span>
            </div>
          </div>
          <div class="relative h-64 sm:h-80">
            <canvas id="area-chart"></canvas>
          </div>
          <div class="mt-4 flex justify-between items-center">
            <div class="relative">
              <button class="flex items-center text-gray-600 hover:text-gray-800 focus:outline-none"
                @click="toggleDateDropdown">
                <span class="mr-2">Last 7 days</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div v-show="showDateDropdown" class="absolute z-10 mt-2 bg-white rounded-md shadow-lg">
                <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem">Yesterday</a>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem">Today</a>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem">Last 7 days</a>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem">Last 30 days</a>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem">Last 90 days</a>
                </div>
              </div>
            </div>
            <a href="#" class="flex items-center text-blue-500 hover:text-blue-700transition duration-300">
            </a>
          </div>
        </div>
        
        <!-- User Type Distribution Chart -->
        <div class="bg-white p-4 sm:p-6 rounded-md shadow-md">
          <div class="mb-4">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800">User Distribution</h2>
            <p class="text-gray-500 mt-1">Distribution of doctors vs regular users</p>
          </div>
          <div class="relative h-64 sm:h-80">
            <canvas id="pie-chart"></canvas>
          </div>
        </div>
      </div>

      <!-- Users View -->
      <div v-if="currentView === 'users'" class="space-y-4">
        <h2 class="text-xl font-bold mb-4 md:hidden">User Management</h2>
        
        <!-- Filter Buttons -->
        <div class="mb-4 flex space-x-2">
          <button 
            @click="userTypeFilter = 'all'" 
            class="px-4 py-2 rounded-md focus:outline-none"
            :class="userTypeFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
          >
            All Users
          </button>
          <button 
            @click="userTypeFilter = 'doctors'" 
            class="px-4 py-2 rounded-md focus:outline-none"
            :class="userTypeFilter === 'doctors' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
          >
            Doctors
          </button>
          <button 
            @click="userTypeFilter = 'regular'" 
            class="px-4 py-2 rounded-md focus:outline-none"
            :class="userTypeFilter === 'regular' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
          >
            Regular Users
          </button>
        </div>
        
        <!-- Search Input -->
        <div class="mb-4">
          <input 
            type="text" 
            v-model="searchTerm" 
            placeholder="Search users by email or name" 
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <!-- User Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="(user, index) in filteredUsers" :key="index"
            class="bg-white p-4 rounded-md shadow-md flex flex-col">
            <div class="flex items-start justify-between mb-3">
              <div>
                <h3 class="text-lg font-semibold text-gray-800">
                  {{ user.doctor ? 'Dr. ' + (user.full_name || 'User') : (user.full_name || 'User') }}
                </h3>
                <p class="text-sm text-gray-600 break-all">{{ user.email }}</p>
              </div>
              <div class="bg-gray-100 px-2 py-1 rounded text-xs font-medium" 
                :class="user.doctor ? 'text-blue-600 bg-blue-100' : 'text-gray-600'">
                {{ user.doctor ? 'Doctor' : 'Regular User' }}
              </div>
            </div>
            
            <div class="mt-auto pt-3 border-t flex items-center justify-between">
              <span class="text-sm font-medium text-gray-500">Doctor Access</span>
              <label :for="`doctorToggle-${index}`" class="flex items-center cursor-pointer">
                <div class="relative">
                  <input :id="`doctorToggle-${index}`" type="checkbox" v-model="user.doctor" class="sr-only"
                    @change="toggleDoctor(user)" />
                  <div class="w-10 h-6 bg-gray-300 rounded-full shadow-inner" :class="{ 'bg-green-500': user.doctor }">
                  </div>
                  <div
                    class="absolute inset-y-0 left-0 w-4 h-4 m-1 bg-white rounded-full shadow transition-transform duration-300 ease-in-out transform"
                    :class="{ 'translate-x-4': user.doctor }"></div>
                </div>
              </label>
            </div>
          </div>
        </div>
        
        <!-- No results message -->
        <div v-if="filteredUsers.length === 0" class="bg-white p-6 rounded-md shadow-md text-center">
          <p class="text-gray-500">No users found matching your search criteria.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { admindata, alluser, amdoctor, graph } from '@/api/index'
import Chart from 'chart.js/auto';
import Sidebar from '@/components/Sidebar.vue';

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      showSidebar: true, // Default to true for desktop
      currentView: 'home',
      showDateDropdown: false,
      users: [],
      searchTerm: '',
      userTypeFilter: 'all', // Add this line for the user type filter
      chartData: [
        { date: '2023-05-13', users: 10 },
        { date: '2023-05-14', users: 12 },
        { date: '2023-05-15', users: 8 },
        { date: '2023-05-16', users: 14 },
        { date: '2023-05-17', users: 11 },
        { date: '2023-05-18', users: 16 },
        { date: '2023-05-19', users: 13 },
      ],
      userTypeData: {
        doctors: 0,
        regular: 0
      },
      error: null,
    };
  },
  computed: {
    pageTitle() {
      switch(this.currentView) {
        case 'home': return 'Admin Dashboard';
        case 'users': return 'User Management';
        case 'analytics': return 'Analytics';
        default: return 'Admin Dashboard';
      }
    },
    totalUsers() {
      return this.users.length;
    },
    totalDoctors() {
      return this.users.filter(user => user.doctor).length;
    },
    totalRegularUsers() {
      return this.users.filter(user => !user.doctor).length;
    },
    filteredUsers() {
      let result = this.users;
      
      // Apply user type filter
      if (this.userTypeFilter === 'doctors') {
        result = result.filter(user => user.doctor);
      } else if (this.userTypeFilter === 'regular') {
        result = result.filter(user => !user.doctor);
      }
      
      // Apply search filter
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase();
        result = result.filter(user => {
          const email = user.email.toLowerCase();
          const name = (user.full_name || '').toLowerCase();
          return email.includes(term) || name.includes(term);
        });
      }
      
      return result;
    }
  },
  async mounted() {
    try {
      // Set sidebar based on screen size
      this.showSidebar = window.innerWidth >= 768;
      
      if (!document.cookie.includes('aura-token')) {
        this.$router.push('/enroll');
        return;
      }
      
      // Listen for window resize for responsive behavior
      window.addEventListener('resize', this.handleResize);
      
      // Listen for clicks outside dropdown to close it
      document.addEventListener('click', this.handleOutsideClick);
      
      // Fetch user list from API
      const userResponse = await alluser();
      console.log('Raw user response:', userResponse);
      
      if (userResponse && userResponse.data && userResponse.data.users) { 
        console.log('User data from API:', userResponse.data);
        
        // Process user data correctly based on API structure
        this.users = userResponse.data.users
          .filter(user => user.email) // Only include users with email
          .map(user => ({
            email: user.email,
            doctor: user.details?.doctor === true,
            full_name: user.details?.full_name || user.email.split('@')[0], // Use email username as fallback
            verified: user.verified
          }));
        
        console.log('Processed users:', this.users);
        
        // Update userTypeData for pie chart
        this.userTypeData = {
          doctors: this.users.filter(user => user.doctor).length,
          regular: this.users.filter(user => !user.doctor).length
        };
      }

      // Try to fetch graph data from API
      try {
        const graphResponse = await graph();
        console.log('Raw graph response:', graphResponse);
        
        if (graphResponse && graphResponse.data) {
          const graphData = graphResponse.data;
          console.log('Graph data from API:', graphData);
          
          // Update chart data based on userRegistrations or generate from users
          if (graphData.userRegistrations && graphData.userRegistrations.length > 0) {
            this.chartData = graphData.userRegistrations.map(item => ({
              date: `${item._id.year}-${item._id.month}`,
              users: item.count
            }));
          } else {
            // If no registration data, generate from users (as fallback)
            this.generateChartDataFromUsers();
          }
        }
      } catch (graphError) {
        console.error('Using user data for chart as graph API failed:', graphError);
        // Generate chart data from users as fallback
        this.generateChartDataFromUsers();
      }

      this.$nextTick(() => {
        this.renderChart();
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      this.error = 'Failed to load data. Please try again.';
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('click', this.handleOutsideClick);
  },
  methods: {
    handleResize() {
      // Update sidebar visibility based on screen width
      this.showSidebar = window.innerWidth >= 768;
    },
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    handleOutsideClick(event) {
      // Close dropdown when clicking outside
      const dropdown = document.querySelector('.relative');
      if (this.showDateDropdown && dropdown && !dropdown.contains(event.target)) {
        this.showDateDropdown = false;
      }
    },
    logout() {
      document.cookie = "aura-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      localStorage.clear();
      this.$router.push('/enroll');
    },
    toggleView(view) {
      this.currentView = view;
      // On mobile, close sidebar after navigation
      if (window.innerWidth < 768) {
        this.showSidebar = false;
      }
    },
    toggleDateDropdown(event) {
      // Prevent click from propagating to document
      event.stopPropagation();
      this.showDateDropdown = !this.showDateDropdown;
    },
    generateChartDataFromUsers() {
      // Generate date-based data from users
      // We'll create a mock timeline by distributing users across the last 7 days
      const today = new Date();
      this.chartData = [];
      
      // Count of doctors and regular users for pie chart
      this.userTypeData = {
        doctors: this.users.filter(user => user.doctor).length,
        regular: this.users.filter(user => !user.doctor).length
      };
      
      // Create last 7 days data for line chart
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        // Distribute users - this is mock data just for visualization
        // In a real app, you'd want user registration dates
        const dateStr = date.toISOString().split('T')[0];
        
        // Simulate some users joining each day by distributing total count
        // This is just for demonstration - in reality you would use actual registration dates
        const userCount = Math.floor(this.users.length / 7) + 
                        (i < this.users.length % 7 ? 1 : 0);
        
        this.chartData.push({
          date: dateStr,
          users: userCount
        });
      }
    },
    
    renderChart() {
      const canvas = document.getElementById('area-chart');
      if (!canvas) {
        console.error('Chart canvas not found');
        return;
      }
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('Canvas context not available');
        return;
      }
      
      // Create line chart for user growth
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.chartData.map(item => new Date(item.date).toLocaleDateString()),
          datasets: [
            {
              label: 'Users',
              data: this.chartData.map(item => item.users),
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 2,
              tension: 0.4,
              fill: true,
              pointBackgroundColor: '#fff',
              pointBorderColor: 'rgba(54, 162, 235, 1)',
              pointRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: 10,
              titleFont: {
                size: 14
              },
              bodyFont: {
                size: 13
              }
            }
          }
        },
      });
      
      // Create a pie chart to show doctor vs regular user distribution
      const pieCanvas = document.getElementById('pie-chart');
      if (pieCanvas) {
        const pieCtx = pieCanvas.getContext('2d');
        new Chart(pieCtx, {
          type: 'pie',
          data: {
            labels: ['Doctors', 'Regular Users'],
            datasets: [{
              data: [this.userTypeData.doctors, this.userTypeData.regular],
              backgroundColor: [
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 99, 132, 0.7)'
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom'
              },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                padding: 10
              }
            }
          }
        });
      }
    },
    async toggleDoctor(user) {
      try {
        // Update function to use correct API structure
        const userData = {
          email: user.email,
          permissionType: 'doctor'
        };
    
        const response = await amdoctor(userData);
        console.log('Doctor toggle response:', response);
    
        if (response && response.data) {
          // Update user in the array based on the response
          const updatedUsers = this.users.map(u => {
            if (u.email === user.email) {
              return { 
                ...u, 
                doctor: !u.doctor // Toggle the doctor status
              };
            }
            return u;
          });
          this.users = updatedUsers;
          
          // Update userTypeData for pie chart after toggling
          this.userTypeData = {
            doctors: this.users.filter(user => user.doctor).length,
            regular: this.users.filter(user => !user.doctor).length
          };
          
          // Re-render the pie chart to reflect changes
          this.renderChart();
        }
      } catch (error) {
        console.error('Error toggling doctor status:', error);
        this.error = 'Failed to update user status. Please try again.';
        // Revert the checkbox state on error
        user.doctor = !user.doctor;
      }
    }
  },
};
</script>

<style scoped>
/* Fixed positioning for sidebar */
.md\:ml-64 {
  margin-left: 16rem; /* Matches the sidebar width of 64 (16rem) */
}

/* Smoother transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Ensure container doesn't overflow */
.overflow-hidden {
  overflow: hidden;
}

/* Only show scrollbar on main content */
.overflow-y-auto {
  overflow-y: auto;
}

@media (max-width: 768px) {
  .md\:ml-64 {
    margin-left: 0;
  }
}
</style>