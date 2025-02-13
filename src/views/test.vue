<template>
    <otp></otp>
</template>
<script>
import { userVerify, resendotp } from '@/api/index.js'
import router from '@/router';
import otp from '@/components/enroll/OtpScreen.vue'

export default{
    name: "OtpScreen",
    components: {
        otp
    },
    data(){
        return{
            otp: null,
            message: null,
            email: localStorage.getItem('email'),
            error: null,
            enableButton: false,
            timer: 30,
            showTimer: true,
            timerInterval: null,
            resendButtonDisabled: true,
            resendButtonText: 'Resend OTP',
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
        async resendotp() {
            await resendotp({
                email: this.email
            }).then((response) => {
                if (response.status === 200) {
                    this.message = response.data.message;
                    this.resendButtonDisabled = true;
                    this.resendButtonText = 'Resend OTP in 30s';
                    this.timer = 30;
                    this.showTimer = true;
                    this.timerInterval = setInterval(() => {
                        this.timer--;
                        if (this.timer === 0) {
                            clearInterval(this.timerInterval);
                            this.resendButtonDisabled = false;
                            this.resendButtonText = 'Resend OTP';
                        }
                    }, 1000);
                } else {
                    this.message = response.data.message;
                }
            }).catch((error) => {
                this.error = error;
            });
        },
        savepass(v) {
            this.$store.dispatch('setPasskey', v)
        }
    },
    beforeDestroy() {
        clearInterval(this.timerInterval);
    }
}

</script>
