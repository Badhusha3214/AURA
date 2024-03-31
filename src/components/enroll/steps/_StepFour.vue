<template>
    <div class="flex flex-col items-center justify-center">
        <EnrollProgress question="How long does your period usually last?" />
        <Calendar @dateSelected="handleDateSelected" />
        <div class="container">
        </div>
    </div>
    <div class="absolute bottom-0 w-full flex justify-center mb-12">
        <div class="relative flex flex-col items-center gap-2 justify-center my-3">
            <button class="text-white font-semibold text-xl w-72 p-3 rounded-full" :class="{
            'bg-primary': selected !== null,
            'bg-gray-300 cursor-not-allowed': selected == null,
        }" @click="triggerNext" :disabled="selected == null">
                Next
            </button>
            <button class="flex flex-row items-center gap-2 justify-center text-sm font-medium text-gray-500">
                I'm not sure
            </button>
        </div>
    </div>
</template>

<script>
import EnrollProgress from '@/components/partials/EnrollProgress.vue';
import Calendar from '@/components/Calender.vue';

export default {
    emits: ['updateEnrollData', 'triggerNext'],
    name: 'StepFour',
    components: {
        EnrollProgress,
        Calendar,
    },
    data() {
        return {
            selected: null,
            days: null,
        };
    },
    methods: {
        handleDateSelected(date) {
            this.selected = date;
            console.log('Selected dateaaa:', date);
        },
        triggerNext() {
            this.$emit('updateEnrollData', { lastperiod: this.selected });
            this.$emit('triggerNext', 'Splash');
        },
    },
};
</script>