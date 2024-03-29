<template>

    <div class=" w-full flex justify-center">
        <div class="relative flex flex-col items-center justify-center mt-40">
            <div class="w-full lg:w-1/3 lg:py-20 ">
                <img class="w-full h-full" src="/assets/illustration/pin.svg" alt="welcome" />
            </div>
        </div>
    </div>

    <div class="absolute w-full flex justify-center mb-12">

        <div class="relative flex flex-col items-center gap-5 justify-center my-3">
            <div>
                <p class="font-semibold text-2xl w-72 text-center">OTP Verification</p>
                <hr class="w-48 h-1 mx-auto bg-pink-500 border-0 rounded dark:bg-gray-700">
            </div>
            <span class="text-xs text-black-500">Enter the OTP that send to your email</span>
            <input v-model="otp" type="text" maxlength="6"
                class="w-full p-3 text-lg text-center rounded text-gray-900 border border-gray-300 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Enter OTP" required>

            <p v-if="message" class="text-xs mt-1 text-red-500">{{ message }}</p>
        </div>

    </div>

    <div class="absolute bottom-0 w-screen flex justify-center p-5 mb-12">
        <button @click="usersverify" class="text-white font-semibold w-full text-lg p-3 rounded-full"
            :class="enableButton ? 'bg-primary' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
            :disabled="enableButton ? true : false"
            type="button">Next</button>
    </div>

</template>

<script>
import { userVerify } from '@/api/index.js'
import router from '@/router';

export default {
    name: "OtpScreen",
    data() {
        return {
            otp: null,
            message: null,
            error: null,
            enableButton: false,
        }
    },
    methods: {
        async usersverify() {
            await userVerify({
                otp: this.otp,
            }).then((response) => {
                if (response.status === 200) {
                    document.cookie = `aura-token=${response.data.token}; max-age=864000`;
                    router.push('/steps');
                } else {
                    this.message = response.data.message;
                }
            }).catch((error) => {
                this.error = error;
            });
        }
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
    }
}
</script>
