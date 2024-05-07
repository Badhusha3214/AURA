<template>
<IsMobile />
<DashboardLayout />

    <div class="justify-center flex items-center">
        <div class="h-auto w-20">
            <img class="w-full h-full" src="/assets/Profile/profile.png" alt="welcome" />
        </div>
    </div>
    <div v-if="getdata()"></div>
    <div  class="bg-gradient-to-b from-white via-pink-100 to-pink-100absolute w-full flex justify-center mb-12">
        <div class="relative flex flex-col items-center gap-5 justify-center my-3">
            <div>
                <p class="font-medium text-22 w-72 text-center">{{ userName }}</p>
                <p class="font-extralight text-center text-sm">{{email}}</p>
                <p class="font-extralight text-center text-sm">{{ userNumber }}</p>
                <hr class="h-px my-8 bg-gray-500 border-0 dark:bg-gray-700">
            </div>

            <!-- drop down button -->
            <!-- <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
                class="text-black w-64 bg-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button">Monthly analytics downloads<svg class="ml-20 w-2.5 h-2.5 ms-3" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m1 1 4 4 4-4" />
                </svg>
            </button> -->

            <!-- Dropdown menu -->
            <!-- <div id="dropdown"
                class="z-10 hidden bg-gray-2 divide-y divide-gray-100 rounded-lg shadow w-64 dark:bg-gray-400">
                <ul class="py-2 text-sm text-black " aria-labelledby="dropdownDefaultButton">
                    <li>
                        <a href="#"
                            class="block px-4 py-2 text-black">January-2024 Analytics</a>
                    </li>
                    <li>
                        <a href="#"
                            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">March-2023 Analytics</a>
                    </li>
                    <li>
                        <a href="#"
                            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">January-2023 Analytics</a>
                    </li>
                </ul>
            </div> -->

            <notepad />
        </div>
    </div>



    
</template>

<script>
import DashboardLayout from "@/layouts/DashboardLayout.vue";

import notepad from "@/components/Notepad.vue";
import IsMobile from "@/components/IsMobile.vue";


export default {
    name: "ProfileView",
    components: {
        DashboardLayout,

        IsMobile,
        notepad                 
        
    },data() {
      return {
        userName: null,
        userNumber: null,
        email: null,
      };
    },
   
    methods: {
        getdata(){
            this.userName = localStorage.getItem('userName');
            this.userNumber = localStorage.getItem('userNumber');
            this.email = localStorage.getItem('email');
            // this.DOB = localStorage.getItem('DOB');

            console.log('Name:', this.userName);
            console.log('Number:', this.userNumber);
        },
        updateCounter(value, action) {
            action === "++" ? (this.counter += value) : (this.counter -= value);
        },
    },async mounted() {
            if (!document.cookie.includes('aura-token')) {
                this.$router.push('/enroll')
            }
        }
};
</script>
