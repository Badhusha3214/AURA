<template>
    <!-- <IsMobile /> -->
    <EnrollLayout>
        <!-- Back button - only shown on welcome and OTP screens -->
        <div v-if="showWelcome || showOtp" class="back-button-container">
            <button @click="goBack" class="back-button">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                <span>Back</span>
            </button>
        </div>

        <template v-if="showSplash">
            <SplashScreen @triggerWelcome="triggerWelcome" @setMode="setMode" />
        </template>

        <div v-show="showWelcome">
            <WelcomeScreen :mode="mode" :loading="loading" @triggerNext="triggerNext" />
        </div>

        <template v-if="showOtp">
            <OtpScreen :otpData="otpData" />
        </template>

    </EnrollLayout>
    <!-- </EnrollLayout> -->
</template>

<script>
import EnrollLayout from '@/layouts/EnrollLayout.vue'
import SplashScreen from '@/components/enroll/SplashScreen.vue'
import WelcomeScreen from '@/components/enroll/WelcomeScreen.vue'
import OtpScreen from '@/components/enroll/OtpScreen.vue'
// import IsMobile from "@/components/IsMobile.vue";

export default {
    name: 'EnrollView',
    data() {
        return {
            showSplash: true,
            showWelcome: false,
            showOtp: false,
            mode: "enroll",
            loading: false, 
            otpData: {
                status: null,
                email: null,
                message: null
            }
        }
    },
    components: {
        EnrollLayout,
        SplashScreen,
        // IsMobile,
        WelcomeScreen,
        OtpScreen
    },
    methods: {
        triggerWelcome() {
            this.showSplash = false
            this.showWelcome = true
        },
        setMode(mode) {
            this.mode = mode
        },
        triggerNext(response) {
            console.log('triggerNext with response:', response);
            
            if (response && response.data && response.data.status === 'pending') {
                // Handle API response object
                this.otpData = {
                    status: 'pending',
                    email: response.data.email || '',
                    message: response.data.message || 'Please check your email for OTP'
                };
                
                this.showWelcome = false;
                this.showOtp = true;
            } else if (response && response.status === 'pending') {
                // Handle simplified response object
                this.otpData = {
                    ...response,
                    message: response.message || 'Please check your email for OTP'
                };
                
                this.showWelcome = false;
                this.showOtp = true;
            } else if (typeof response === 'string' && response === 'otp') {
                // Legacy handling for string mode
                this.otpData = {
                    status: 'pending',
                    message: 'Please check your email for OTP'
                };
                
                this.showWelcome = false;
                this.showOtp = true;
            } else if (response && response.data && response.data.Token) {
                // Successful login with token
                const token = response.data.Token;
                document.cookie = `aura-token=${token}; path=/; max-age=${60*60*24*7}`; // 7 days
                
                // Ensure the periodData structure is properly initialized
                this.initializePeriodData();
                
                // Redirect to home page
                this.$router.push('/');
            } else {
                // Default redirect
                // Ensure the periodData structure is properly initialized
                this.initializePeriodData();
                this.$router.push('/');
            }
        },
        // New method to initialize period data from localStorage values
        initializePeriodData() {
            const lastPeriodStart = localStorage.getItem('last_period_start');
            const cycleLength = localStorage.getItem('last_cycle_regular');
            const periodLength = localStorage.getItem('duration_period');
            
            if (lastPeriodStart && cycleLength && periodLength) {
                console.log('Initializing periodData from enrollment data');
                
                // Format the date to ensure YYYY-MM-DD format
                let formattedDate = lastPeriodStart;
                if (!/^\d{4}-\d{1,2}-\d{1,2}$/.test(lastPeriodStart)) {
                    try {
                        const date = new Date(lastPeriodStart);
                        formattedDate = date.toISOString().split('T')[0];
                    } catch (e) {
                        console.error('Error formatting date:', e);
                    }
                }
                
                // Create or update periodData structure
                const periodData = {
                    periods: [{
                        startDate: formattedDate,
                        endDate: new Date(new Date(formattedDate).getTime() + ((Number(periodLength) - 1) * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
                        allDates: [],
                        moods: [],
                        bleedingLevels: []
                    }],
                    cycleLength: Number(cycleLength),
                    averagePeriodLength: Number(periodLength)
                };
                
                // Generate all dates between start and end
                const startDate = new Date(formattedDate);
                const endDate = new Date(periodData.periods[0].endDate);
                const allDates = [];
                let currentDate = new Date(startDate);
                
                while (currentDate <= endDate) {
                    allDates.push(new Date(currentDate).toISOString().split('T')[0]);
                    currentDate.setDate(currentDate.getDate() + 1);
                }
                
                periodData.periods[0].allDates = allDates;
                
                // Store updated period data
                localStorage.setItem('periodData', JSON.stringify(periodData));
            }
        },
        goBack() {
            if (this.showOtp) {
                // Go back to welcome screen from OTP screen
                this.showOtp = false;
                this.showWelcome = true;
            } else if (this.showWelcome) {
                // Go back to splash screen from welcome screen
                this.showWelcome = false;
                this.showSplash = true;
            }
        }
    }
}
</script>

<style scoped>
.back-button-container {
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: 10;
}

.back-button {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    background-color: #f3f4f6;
    color: #374151;
    border: none;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.back-button:hover {
    background-color: #e5e7eb;
}

.back-button svg {
    margin-right: 0.5rem;
}
</style>