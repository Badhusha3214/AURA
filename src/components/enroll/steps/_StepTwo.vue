<template>
    <div class="my-10 py-10">

        <div class="flex flex-col items-center justify-center">
            <EnrollProgress question="How long does your period usually last?" />
        </div>


        <div class="container">
            <div class="flex flex-wrap justify-center gap-4">

                <button v-for="(choice, index) in choices" :key="index"
                    class="rounded-full py-3 px-6 hover:bg-secondary text-gray-800 font-bold"
                    @click="selected = choice.value" :class="{ 'bg-primary text-white': selected === choice.value }">
                    {{ choice.option }}
                </button>

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

    </div>
</template>

<script>
import EnrollProgress from '@/components/partials/EnrollProgress.vue';

export default {
    emits: ['updateEnrollData', 'triggerNext'],
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
            selected: null
        }
    },
    methods: {
        updateEnrollData() {
            this.$emit('updateEnrollData', {
                periodDuration: this.selected
            })
        },
        triggerNext() {
            this.updateEnrollData()
            this.$emit('triggerNext', 'StepThree')
        }
    }
}
</script>
