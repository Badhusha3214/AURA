<template>
    
    <div class="flex flex-col items-center justify-center">
        <EnrollProgress question="How long dose your period usuallu last? " />
       
    
        <div class=" w-8 h-8 " inline-datepicker data-date="02/25/2022"></div>

    <div class="container ">
        <PeriodDuration @setDays="" :days="days"/>
    </div>
    
</div>

<div inline-datepicker data-date="02/25/2022"></div>

</template>

<script>
    import EnrollProgress from '@/components/partials/EnrollProgress.vue';

    export default {
        name: 'StepFour',
        components: {
            EnrollProgress
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
