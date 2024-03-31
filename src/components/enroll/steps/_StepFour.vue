<template>
    
    <div class="flex flex-col items-center justify-center">
        <EnrollProgress question="How long dose your period usuallu last? " />

            <Calender />

    <div class="container ">
        <PeriodDuration @setDays="" :days="days"/>
    </div>
    
</div>
<div class="absolute bottom-0 w-full flex justify-center mb-12">
            <div class="relative flex flex-col items-center gap-2 justify-center my-3">

                <button class="text-white font-semibold text-xl w-72 p-3 rounded-full"
                :class="{ 'bg-primary': selected !== null, 'bg-gray-300 cursor-not-allowed': selected === null }"
                @click="triggerNext" :disabled="selected === null"
                >Next</button>
                <button class="flex flex-row items-center gap-2 justify-center text-sm font-medium text-gray-500">I'm not sure</button>

            </div>
        </div>




</template>

<script>
    import EnrollProgress from '@/components/partials/EnrollProgress.vue';
    import Calender from '@/components/Calender.vue';

    export default {
        name: 'StepFour',
        components: {
            EnrollProgress,
            Calender
        },
        data() {
            return {
                choices: Array.from({ length: 15 }, (_, i) => ({
                    option: (i + 1).toString(),
                    value: i + 1
                })),
                selected: null,
                nextEnabled: false
            }
        }
    }
</script>
