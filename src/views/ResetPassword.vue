<template>
    <div class="flex justify-center items-center h-screen bg-gradient-to-b from-white via-pink-100 to-pink-100absolute">
        <div class="password-change-page bg-white p-8 rounded-lg shadow-lg">
            <h1 class="text-3xl font-bold text-pink-600 mb-6">Change Password</h1>
            <form @submit.prevent="changePassword" class="space-y-6">
                <div class="form-group">
                    <label for="newPassword" class="block font-medium text-pink-600 mb-2">New Password</label>
                    <input type="password" id="newPassword" v-model="newPassword" required
                        class="border border-pink-300 rounded-md px-4 py-3 w-full focus:outline-none focus:ring focus:ring-pink-300" />
                </div>
                <div class="form-group">
                    <label for="confirmNewPassword" class="block font-medium text-pink-600 mb-2">Confirm New
                        Password</label>
                    <input type="password" id="confirmNewPassword" v-model="confirmNewPassword" required
                        class="border border-pink-300 rounded-md px-4 py-3 w-full focus:outline-none focus:ring focus:ring-pink-300" />
                </div>
                <button type="submit" :disabled="loading"
                    class="bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-6 rounded-md w-full">
                    <span v-if="loading">Changing Password...</span>
                    <span v-else>Change Password</span>
                </button>
                <div v-if="error" class="text-red-500">{{ error }}</div>
            </form>
        </div>
    </div>
</template>

<script>
import { resetpassword } from '@/api/index.js'

export default {
    data() {
        return {
            newPassword: '',
            confirmNewPassword: '',
            loading: false,
            error: ''
        }
    },
    methods: {
        async changePassword() {
            if (this.newPassword !== this.confirmNewPassword) {
                this.error = 'New password and confirm new password must match.'
                return
            }

            this.loading = true
            this.error = ''
            
            try {
                await resetpassword({ newPassword: this.newPassword }).then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        console.log(this.user);
                        this.$router.push('/enroll')
                    } else if (response.response.status === 400) {
                        // this.error = response.response.data.message;
                        console.log(this.error);
                    }
                }).catch((error) => {
                    this.error = error;
                })
                // Reset the form
                this.newPassword = ''
                this.confirmNewPassword = ''
            } catch (error) {
                this.error = error
                console.log(error)
            } finally {
                this.loading = false
            }
        }   
    }
}
</script>

<style scoped>
.password-change-page {
    max-width: 400px;
}

.form-group {
    margin-bottom: 1.5rem;
}
</style>



<!-- async getUserLogin() {
        if (this.mode === 'enroll') {
          await userRegister({
            email: this.email,
            password: this.password
          }).then((response) => {
            console.log(response);
            if (response.status === 201) {
              this.user.email = response.data.email;
              console.log(this.user.email);
              console.log(this.user);
              localStorage.setItem('email', this.email);
              this.$emit('triggerNext', 'otp')
            } else if (response.response.status === 400) {
              this.error = response.response.data[message];
              console.log(this.error);
            }
          }).catch((error) => {
            this.error = error;
          }) -->