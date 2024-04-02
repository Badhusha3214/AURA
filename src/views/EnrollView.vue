<template>
<<<<<<< HEAD
    <EnrollLayout>
=======
    <!-- <EnrollLayout> -->
>>>>>>> 9f741b2 (WIP)

        <template v-if="showSplash">
            <SplashScreen 
                @triggerWelcome="triggerWelcome"
                @setMode="setMode"
            />
        </template>

        <div v-show="showWelcome">
            <WelcomeScreen
                :mode="mode"
                @triggerNext="triggerNext"
            />
        </div>

        <template v-if="showOtp">
            <OtpScreen />
        </template>

<<<<<<< HEAD
    </EnrollLayout>
=======
    <!-- </EnrollLayout> -->
>>>>>>> 9f741b2 (WIP)
</template>

<script>
    import EnrollLayout from '@/layouts/EnrollLayout.vue'
    import SplashScreen from '@/components/enroll/SplashScreen.vue'
    import WelcomeScreen from '@/components/enroll/WelcomeScreen.vue'
    import OtpScreen from '@/components/enroll/OtpScreen.vue'

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