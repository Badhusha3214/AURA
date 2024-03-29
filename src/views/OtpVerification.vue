<template>
    
    <OtpVerification/>

</template>

<script>
import OtpVerification from '@/components/otp.vue'

    export default{
        name: "OtpLogin",
        components: {
            OtpVerification
        },
        methods:{
        nextaction(){
            this.$router.push( '/confirmation' );
        }

    }
    }
</script>
