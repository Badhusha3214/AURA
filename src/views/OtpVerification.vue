<template>
<div class=" w-full flex justify-center mb-12">
    <div class="relative flex flex-col items-center gap-2 justify-center my-3">
        <div class="w-full lg:w-1/3 py-4 lg:py-20 ">
            <img class="w-full h-full" src="/assets/illustration/pin.svg" alt="Socials" />
        </div>
    </div>
</div>
<div class="absolute w-full flex justify-center mb-12">
    <div class="relative flex flex-col items-center gap-2 justify-center my-3">
        <div class="font-bold text-2xl w-72 p-0 rounded-full text-center">OTP Verification</div>
        <hr class="w-48 h-1 mx-auto my-0 bg-pink-500 border-0 rounded md:my-10 dark:bg-gray-700">
        <p class="text-xs mt-6 text-black-500">Enter the OTP that send to your Gmail</p>
        <p v-if="message" class="text-xs mt-1 text-red-500">{{ message }}</p>
        <input v-model="otp" type="password" id="default-search" class="block w-full p-4 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" -      -      -        -      -      - " required />
    </div>
</div>

<!-- <form class="max-w-md mx-auto">   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form> -->
<div class="absolute bottom-0 w-full flex justify-center mb-12">
    <div class="relative flex flex-col items-center gap-2 justify-center my-3">
        <button @click="usersverify" class="text-white font-bold text-2xl w-72 p-3 rounded-full bg-primary">Next</button>
    </div>
</div>
</template>

<script>
import {
    userVerify
} from '@/api/index.js'

export default {
    name: "OtpVerification",
    data() {
        return {
            otp: "",
            message: "",

        }
    },
    methods: {
        async usersverify() {
            await userVerify({
                otp: this.otp,

            }).then((response) => {
                if (response.status === 200) {
                    // check the cread and proced
                    console.log(this.otp);
                    console.log(response.data.Token);
                    document.cookie = `token=${response.data.Token}; max-age=864000`;
                    this.$router.push('/');
                } else if (response.response.status === 404) {
                    // check and display error
                    console.log(this.otp);
                    console.log(response.response.data.message);
                    this.message = response.response.data.message

                } else {
                    console.log(response.response.status);
                    console.log(response.data);
                }
            }).catch((error) => {
                this.error = error;
            });
        },

        nextaction() {
            // this.$router.push( "/home" );
        }

    }
}
</script>

<style>
input[type="password"]::placeholder {
    text-align: center;
}
</style>
