<template>
    <div class="flex flex-col md:flex-row h-screen">
      <div
        class="md:w-48 bg-gray-800 text-white p-4 transition-transform duration-300 ease-in-out transform -translate-x-full md:translate-x-0"
        :class="{ '-translate-x-full': !showSidebar }"
      >
        <div class="mb-8">
          <img src="/assets/logo.svg" alt="logo" class="h-8" />
        </div>
        <nav>
          <ul class="space-y-2">
            <li>
              <a
                href="#"
                class="flex items-center p-2 rounded-md hover:bg-gray-700 transition duration-300"
                @click.prevent="toggleView('home')"
              >
                <svg
                  class="w-6 h-6 mr-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  ></path>
                </svg>
                <span class="text-gray-300">Home</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center p-2 rounded-md hover:bg-gray-700 transition duration-300"
                @click.prevent="toggleView('users')"
              >
                <svg
                  class="w-6 h-6 mr-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  ></path>
                </svg>
                <span class="text-gray-300">Users</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
  
      <main class="flex-1 p-4 bg-gray-100">
        <div class="md:hidden mb-4">
          <button
            class="p-2 rounded-md bg-gray-800 text-white focus:outline-none"
            @click="showSidebar = !showSidebar"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
  
        <div v-if="currentView === 'home'">
          <div class="bg-white p-6 rounded-md shadow-md">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-2xl font-bold text-gray-800">Users this week</h2>
              <div class="flex items-center text-green-500">
                <span class="mr-1">12%</span>
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 11l5-5m0 0l5 5m-5-5v12"
                  ></path>
                </svg>
              </div>
            </div>
            <div id="area-chart" class="h-64"></div>
            <div class="mt-4 flex justify-between items-center">
              <div class="relative">
                <button
                  class="flex items-center text-gray-600 hover:text-gray-800 focus:outline-none"
                  @click="toggleDateDropdown"
                >
                  <span class="mr-2">Last 7 days</span>
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                <div
                  v-show="showDateDropdown"
                  class="absolute z-10 mt-2 bg-white rounded-md shadow-lg"
                >
                  <div
                    class="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                      >Yesterday</a
                    >
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                      >Today</a
                    >
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                      >Last 7 days</a
                    >
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                      >Last 30 days</a
                    >
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                      >Last 90 days</a
                    >
                  </div>
                </div>
              </div>
              <a
                href="#"
                class="flex items-center text-blue-500 hover:text-blue-700transition duration-300"
>
 <span class="mr-2">Users Report</span>
 <svg
   class="w-4 h-4"
   fill="none"
   stroke="currentColor"
   viewBox="0 0 24 24"
   xmlns="http://www.w3.org/2000/svg"
 >
   <path
     stroke-linecap="round"
     stroke-linejoin="round"
     stroke-width="2"
     d="M17 8l4 4m0 0l-4 4m4-4H3"
   ></path>
 </svg>
</a>
         </div>
       </div>
       <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
         <div
           class="bg-white p-6 rounded-md shadow-md flex flex-col items-center justify-center"
         >
           <h3 class="text-sm font-medium text-gray-500 mb-2">Total Users</h3>
           <span class="text-2xl font-bold text-gray-800">{{ totaluser }}</span>
         </div>
         <div
           class="bg-white p-6 rounded-md shadow-md flex flex-col items-center justify-center"
         >
           <h3 class="text-sm font-medium text-gray-500 mb-2">Doctors</h3>
           <span class="text-2xl font-bold text-gray-800">{{ total_dr }}</span>
         </div>
         <div
           class="bg-white p-6 rounded-md shadow-md flex flex-col items-center justify-center"
         >
           <h3 class="text-sm font-medium text-gray-500 mb-2">Users</h3>
           <span class="text-2xl font-bold text-gray-800">{{ user }}</span>
         </div>
       </div>
     </div>


     <div v-if="currentView === 'users'">
        <div
          v-for="(user, index) in users"
          :key="index"
          class="bg-white p-6 rounded-md shadow-md flex items-center justify-between mb-4"
        >
          <div>
            <h2 class="text-2xl font-bold text-gray-800" :class="{ 'mb-1': user.isDoctor }">
              {{ user.isDoctor ? 'Dr. ' + user.name : user.name }}
            </h2>
            <p class="text-gray-600">{{ user.email }}</p>
          </div>
          <div class="flex items-center">
            <span v-if="user.isDoctor" class="mr-2 text-sm font-medium text-gray-500">Doctor</span>
            <label for="doctorToggle" class="flex items-center cursor-pointer">
              <div class="relative">
                <input
                  :id="'doctorToggle-' + index"
                  type="checkbox"
                  v-model="user.isDoctor"
                  class="sr-only"
                />
                <div
                  class="w-10 h-6 bg-gray-400 rounded-full shadow-inner"
                  :class="{
                    'bg-green-500': user.isDoctor,
                  }"
                ></div>
                <div
                  class="absolute inset-y-0 left-0 w-4 h-4 m-1 bg-white rounded-full shadow transition-transform duration-300 ease-in-out transform"
                  :class="{
                    'translate-x-4': user.isDoctor,
                  }"
                ></div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { admindata } from '@/api/index'
export default {
  data() {
    return {
      data: null,
      totaluser: null,
      total_dr: null,
      user: null,
      showSidebar: false,
      currentView: 'home',
      showDateDropdown: false,
      users: [
        {
          name: 'Sivan Kutty',
          email: 'examplemail@gmail.com',
          isDoctor: true,
        },
        {
          name: 'John Doe',
          email: 'johndoe@example.com',
          isDoctor: false,
        },
        // Add more user objects here
      ],
      chartData: [
        { date: '2023-05-13', users: 10 },
        { date: '2023-05-14', users: 12 },
        { date: '2023-05-15', users: 8 },
        { date: '2023-05-16', users: 14 },
        { date: '2023-05-17', users: 11 },
        { date: '2023-05-18', users: 16 },
        { date: '2023-05-19', users: 13 },
      ],
    };
  },
  computed: {
    totalUsers() {
      return this.users.length;

    },
    totalDoctors() {
      return this.users.filter((user) => user.isDoctor).length;
    },
  },
  mounted() {
    this.renderChart();
  },
  async mounted() {
    this.data = await admindata()
    console.log(this.data.data);
    this.totaluser = this.data.data.total_users_count
    this.total_dr = this.data.data.doctors_users_count
    this.user = this.data.data.normal_users_count
  },
  methods: {
    toggleView(view) {
      this.currentView = view;
    },
    toggleDateDropdown() {
      this.showDateDropdown = !this.showDateDropdown;
    },
    renderChart() {
      const ctx = document.getElementById('area-chart').getContext('2d');
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.chartData.map((item) => new Date(item.date).toLocaleDateString()),
          datasets: [
            {
              label: 'Users',
              data: this.chartData.map((item) => item.users),
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
              fill: true,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
  },
};
</script>
