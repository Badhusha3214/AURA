<template>
    <div v-if="!checkLocalStorage()" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Sign in to our platform
                    </h3>
                </div>
                <!-- Modal body -->
                <div class="p-4 md:p-5">
                    <form class="space-y-4" @submit.prevent="submitForm">
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter
                                your name</label>
                            <input type="text" v-model="name" name="name" id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-tertiary focus:border-tertiary block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Name" required />
                        </div>
                        <div>
                            <label for="number"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter your mobile
                                number</label>
                            <input type="text" v-model="number" name="number" id="number"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-tertiary focus:border-tertiary block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Mobile Number" required @input="validateNumber" />
                            <p v-if="numberError" class="text-red-500 text-sm mt-1">{{ numberError }}</p>
                        </div>
                        <label for="number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter
                            your date of birth</label>
                        <div class="flex justify-between">
                            <div class="flex items-start">
                                <div class="relative max-w-sm">
                                    <input type="text" v-model="dob.day" maxlength="2" placeholder="DD"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-tertiary focus:border-tertiary block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        @input="validateDOB('day')" />
                                    <p v-if="dobError.day" class="text-red-500 text-sm mt-1">{{ dobError.day }}</p>
                                </div>
                                <div class="relative max-w-sm mx-2">
                                    <input type="text" v-model="dob.month" maxlength="2" placeholder="MM"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-tertiary focus:border-tertiary block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        @input="validateDOB('month')" />
                                    <p v-if="dobError.month" class="text-red-500 text-sm mt-1">{{ dobError.month }}</p>
                                </div>
                                <div class="relative max-w-sm">
                                    <input type="text" v-model="dob.year" maxlength="4" placeholder="YYYY"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-tertiary focus:border-tertiary block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray -400 dark:text-white"
                                        @input="validateDOB('year')" />
                                    <p v-if="dobError.year" class="text-red-500 text-sm mt-1">{{ dobError.year }}</p>
                                </div>
                            </div>
                        </div>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Please provide your date of birth for age
                            verification.</p>
                        <button type="submit"
                            class="w-full text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-tertiary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            :disabled="!isFormValid">Done</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
    name: 'CompleteProfile',
    data() {
        return {
            name: '',
            number: '',
            numberError: '',
            dob: {
                day: '',
                month: '',
                year: ''
            },
            dobError: {
                day: '',
                month: '',
                year: ''
            }
        }
    },
    computed: {
        isFormValid() {
            return this.name.trim() !== '' && this.number.trim() !== '' && !this.numberError && !this.dobError.day && !this.dobError.month && !this.dobError.year
        }
    },
    methods: {
        checkLocalStorage() {
            const userName = localStorage.getItem('userName');
            const userNumber = localStorage.getItem('userNumber');
            const DOB = localStorage.getItem('DOB');

            return userName && userNumber && DOB;
        },
        submitForm() {
            localStorage.setItem('userName', this.name);
            localStorage.setItem('userNumber', this.number);
            localStorage.setItem('DOB', `${this.dob.day}/${this.dob.month}/${this.dob.year}`);

            // Handle form submission logic here
            console.log('Name:', this.name);
            console.log('Number:', this.number);
            console.log('DOB:', `${this.dob.day}/${this.dob.month}/${this.dob.year}`);
                this.$router.push('/profile')  

            // Close the popup or navigate to the next page
            // For example: this.$emit('close-popup');
        },
        validateNumber() {
            const numberRegex = /^[-\s]?(\d{10}|\d{3}[-\s]?\d{3}[-\s]?\d{4})$/;
            if (!numberRegex.test(this.number)) {
                this.numberError = 'Please enter a valid number';
            } else {
                this.numberError = '';
            }
        },
        validateDOB(field) {
    const value = this.dob[field];
    const numericRegex = /^[0-9]+$/;

    if (!numericRegex.test(value)) {
        this.dobError[field] = 'Please enter a valid number';
    } else {
        this.dobError[field] = '';

        if (field === 'day' && (value < 1 || value > 31)) {
            this.dobError[field] = 'Please enter a valid day';
        }

        if (field === 'month' && (value < 1 || value > 12)) {
            this.dobError[field] = 'Please enter a valid month';
        }

        if (field === 'year') {
            const currentYear = dayjs().year();
            const enteredYear = parseInt(value, 10);

            // Check if the user is between 10 and 150 years old
            if (currentYear - enteredYear < 10 || currentYear - enteredYear > 150) {
                this.dobError[field] = 'Please enter a valid year (must be between 10 and 150 years old)';
            }
        }
    }
}
    },
    watch: {
        number(newValue) {
            this.validateNumber();
        }
    }
}
</script>