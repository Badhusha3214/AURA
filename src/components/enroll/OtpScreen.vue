<template>
    <div class="flex flex-col min-h-screen">
      <div class="flex-grow flex flex-col items-center justify-center">
        <div class="w-full md:p-4 lg:w-1/3 lg:py-20 flex justify-center">
          <img class="w-1/2 h-1/2" src="/assets/illustration/pin.svg" alt="welcome" />
        </div>
        
        <div class="flex flex-col items-center gap-5 justify-center my-3">
          <div>
            <p class="font-semibold text-2xl w-72 text-center">OTP Verification mari mari</p>
            <hr class="w-48 h-1 mx-auto bg-pink-500 border-0 rounded dark:bg-gray-700">
          </div>
          <span class="text-xs text-black-500">Enter the OTP that send to your email</span>
          <input v-model="otp" type="text" maxlength="6"
            class="w-full p-3 text-lg text-center rounded text-gray-900 border border-gray-300 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Enter OTP" required>
  
          <p v-if="message" class="text-xs mt-1 text-red-500">{{ message }}</p>
          <button @click="resendOtp" :disabled="resendButtonDisabled" class="text-red-500 font-semibold text-lg p-3 bg-white" type="button">
            {{ resendButtonText }}
          </button>
          <div v-if="showTimer" class="text-sm text-gray-500">Resend OTP in {{ timer }} seconds</div>
        </div>
      </div>
  
      <div class=" w-full flex justify-center p-5 mt-auto">
        <button @click="usersverify" class="text-white font-semibold w-full text-lg p-3 rounded-full"
          :class="enableButton ? 'bg-primary' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
          :disabled="!enableButton" type="button">Next</button>
      </div>
    </div>
  </template>

<script>
import { userVerify, resendotp } from '@/api/index.js'
import router from '@/router';

export default {
    name: "OtpScreen",
    data() {
        return {
            otp: null,
            message: null,
            email: localStorage.getItem('email'),
            error: null,
            enableButton: false,
            timer: 30, // Initial timer value (30 seconds)
            showTimer: true, // Flag to control the timer visibility
            timerInterval: null, // Interval reference for the timer
            resendButtonDisabled: true, // Flag to disable the "Resend Otp" button
            resendButtonText: 'Resend OTP', // Text for the "Resend Otp" button
        }
    },
    computed: {
        user: {
            get() {
                return this.$store.state.user
            },
            set(value) {
                this.$store.dispatch('setUser', value)
            }
        }, passkey: {
            get() {
                return this.$store.state.passkey
            },
            set(v) {
                this.savepass(v)
            }
        },
    },
    methods: {
        async usersverify() {
            await userVerify({
                otp: this.otp,
                email: this.email,
                password: this.passkey
            }).then((response) => {
                if (response.status === 200) {
                    document.cookie = `aura-token=${response.data.Token}; max-age=864000`;
                    this.user.email = response.data.email;
                    router.push('/steps');
                } else {
                    this.message = response.data.message;
                }
            }).catch((error) => {
                this.error = error;
            });
        },
        async resendOtp() {
            this.resendButtonDisabled = true; // Disable the "Resend Otp" button
            this.resendButtonText = 'Resending...'; // Change the button text
            this.showTimer = true; // Show the timer
            this.startTimer(); // Start the timer

            await resendotp({
                email: this.email,
            }).then((response) => {
                if (response.status === 200) {
                    this.user.email = response.data.email;
                    this.message = "OTP sent successfully";
                    console.log(response);
                } else {
                    this.message = response.data.message;
                    this.message = "Try again";
                    console.log(this.email);
                }
            }).catch((error) => {
                this.error = error;
                console.log(this.email);
            });
        },
        startTimer() {
            this.timerInterval = setInterval(() => {
                this.timer--;
                if (this.timer === 0) {
                    this.stopTimer();
                }
            }, 1000); // Update the timer every second
        },
        stopTimer() {
            clearInterval(this.timerInterval);
            this.timer = 30; // Reset the timer to 30 seconds
            this.showTimer = false; // Hide the timer
            this.resendButtonDisabled = false; // Enable the "Resend Otp" button
            this.resendButtonText = 'Resend Otp'; // Reset the button text
        },
    },
    watch: {
        otp() {
            const mobileRegex = /^[0-9]{6}$/;
            if (!mobileRegex.test(this.otp)) {
                this.message = "Please enter a valid OTP";
                this.enableButton = false;
            } else {
                this.enableButton = true;
                this.message = null;
            }
        }
    },
    mounted() {
        this.startTimer(); // Start the timer when the component is mounted
    },
    beforeUnmount() {
        this.stopTimer(); // Stop the timer when the component is unmounted
    },
}
</script>