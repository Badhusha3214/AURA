<template>
    <div class="flex flex-col items-center justify-center">
        <EnrollProgress question="How long dose your period usuallu last? " />
    </div>
    
    <div class="container ">
        <div class="flex flex-wrap justify-center gap-4">
            <button v-for="(choice, index) in choices"
            :key="index"
            class="rounded-full py-3 px-6  hover:bg-secondary text-gray-800 font-bold"
            @click="selected = choice.value"
            :class="{ 'bg-primary text-white': selected === choice.value }"
            >
            {{ choice.option }}
        </button>
    </div>
</div>
</template>

<script>
    import EnrollProgress from '@/components/partials/EnrollProgress.vue';

    export default {
        name: 'StepTwo',
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
