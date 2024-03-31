<template>
    <navbar />

    <div class="justify-center flex items-center">
        <div class="h-auto w-20">
            <img class="w-full h-full" src="/assets/Profile/profile.png" alt="welcome" />
        </div>
    </div>
    <div class="absolute w-full flex justify-center mb-12">
        <div class="relative flex flex-col items-center gap-5 justify-center my-3">
            <div>
                <p class="font-medium text-22 w-72 text-center">Ms. Shamallya Agarthi</p>
                <p class="font-extralight text-center text-sm">example.email@gmail.com</p>
                <p class="font-extralight text-center text-sm">+91 9651965325</p>
                <hr class="h-px my-8 bg-gray-500 border-0 dark:bg-gray-700">
            </div>

            <!-- drop down button -->
            <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
                class="text-white w-64 bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-tertiary font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button">Dropdown button <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m1 1 4 4 4-4" />
                </svg>
            </button>

            <!-- Dropdown menu -->
            <div id="dropdown"
                class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li>
                        <a href="#"
                            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">January-2024 Analytics</a>
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
            </div>

        </div>
    </div>


    <!-- 
        <div class="h-96 flex items-center justify-center flex-col">
            <h1 class="text-4xl font-bold text-primary">{{ counter }}</h1>
            <div class="flex space-x-4 mt-5">
                <button @click="updateCounter(2, '++')" class="font-semibold text-xl bg-primary text-white px-4 py-2 rounded">+</button>
                <button @click="updateCounter(2, '--')" class="font-semibold text-xl bg-primary text-white px-4 py-2 rounded">-</button>
            </div>
        </div> -->

    <DashboardLayout />
</template>

<script>
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import navbar from "@/components/Navbar.vue";

export default {
    name: "ProfileView",
    components: {
        DashboardLayout,
        navbar,
    },
    computed: {
        counter: {
            get() {
                return this.$store.state.counter;
            },
            set(value) {
                this.$store.dispatch("setCounter", value);
            },
        },
    },
    methods: {
        updateCounter(value, action) {
            action === "++" ? (this.counter += value) : (this.counter -= value);
        },
    },
};
</script>
