<template>
    <IsMobile />
    <EnrollLayout>

        <template v-if="showSplash">
            <SplashScreen @triggerWelcome="triggerWelcome" @setMode="setMode" />
        </template>

        <div v-show="showWelcome">
            <WelcomeScreen :mode="mode" @triggerNext="triggerNext" />
        </div>

        <template v-if="showOtp">
            <OtpScreen />
        </template>

    </EnrollLayout>
    <!-- </EnrollLayout> -->
</template>

<script>
import EnrollLayout from '@/layouts/EnrollLayout.vue'
import SplashScreen from '@/components/enroll/SplashScreen.vue'
import WelcomeScreen from '@/components/enroll/WelcomeScreen.vue'
import OtpScreen from '@/components/enroll/OtpScreen.vue'
import IsMobile from "@/components/IsMobile.vue";

export default {
    name: 'EnrollView',
    data() {
        return {
            showSplash: true,
            showWelcome: false,
            showOtp: false,
            mode: "enroll"
        }
    },
    components: {
        EnrollLayout,
        SplashScreen,
        IsMobile,
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
        triggerNext(mode) {
            if (mode === 'otp') {
                this.showWelcome = false
                this.showOtp = true
            } else {
                this.$router.push('/')
            }
        }
    }
}
</script>