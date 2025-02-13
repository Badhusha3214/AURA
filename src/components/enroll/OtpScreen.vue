<template>
    <div class="flex flex-col min-h-screen px-4 sm:px-6 lg:px-8">
      <!-- Content Section -->
      <div class="flex-1 flex flex-col items-center justify-start pt-8 sm:pt-12">
        <!-- Image container -->
        <div class="w-full md:p-4 sm:w-2/3 md:w-1/2 lg:w-1/3 flex justify-center">
          <img class="w-48 sm:w-56 md:w-64 lg:w-72 animate-float" src="/assets/illustration/pin.svg" alt="welcome" />
        </div>
        
        <!-- OTP Form Section -->
        <div class="flex flex-col items-center gap-4 sm:gap-5 justify-center my-3 w-full max-w-md animate-fadeIn">
            <div>
                <p class="font-semibold text-xl sm:text-2xl w-full sm:w-72 text-center">OTP Verification</p>
                <hr class="w-32 sm:w-48 h-1 mx-auto bg-pink-500 border-0 rounded dark:bg-gray-700">
            </div>
            <span class="text-xs sm:text-sm text-black-500 text-center">Enter the OTP that send to your email</span>
            <input v-model="otp" type="text" maxlength="6"
            class="w-full max-w-xs p-2 sm:p-3 text-base sm:text-lg text-center rounded text-gray-900 border border-gray-300 bg-gray-50 transition-all duration-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="Enter OTP" required>

            <p v-if="message" class="text-xs sm:text-sm mt-1 text-red-500">{{ message }}</p>
            <button @click="resendOtp" :disabled="resendButtonDisabled" 
                class="text-red-500 font-semibold text-base sm:text-lg p-2 sm:p-3 bg-white hover:bg-gray-50" type="button">
                {{ resendButtonText }}
            </button>
            <div v-if="showTimer" class="text-xs sm:text-sm text-gray-500">Resend OTP in {{ timer }} seconds</div>
        </div>
      </div>

      <!-- Button Section - Fixed at bottom -->
      <div class="sticky bottom-0 left-0 right-0 w-full bg-white py-4 px-4 sm:px-6 ">
        <div class="max-w-md mx-auto">
          <button @click="usersverify" 
            class="text-white font-semibold w-full text-base sm:text-lg p-2.5 sm:p-3 rounded-full transition-colors"
            :class="enableButton ? 'bg-primary hover:bg-primary/90' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
            :disabled="!enableButton" type="button">
            Next
          </button>
        </div>
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

<style scoped>
.shadow-top {
  box-shadow: 0 -4px 6px -1px rgb(0 0 0 / 0.1), 0 -2px 4px -2px rgb(0 0 0 / 0.1);
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}

.animate-fadeIn {
    animation: fadeIn 0.5s ease-out;
}

@keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.transition-all {
    transition: all 0.3s ease;
}

input:focus {
    transform: scale(1.02);
}

button {
    transition: all 0.3s ease;
}

button:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

button:not(:disabled):active {
    transform: translateY(0);
}
</style>