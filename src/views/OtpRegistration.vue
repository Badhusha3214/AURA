<template>

    <OtpVerification/>
    
</template>
<script>
   import OtpVerification from '@/components/otp.vue'

export default{
    name: "OtpRegistration",
    components: {
        OtpVerification
    },
    methods:{
        nextaction(){
            this.$router.push( '/RegistrationConfirm' );
        }
    }
}
</script>