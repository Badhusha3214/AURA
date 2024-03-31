<template>
    <EnrollLayout>


        <template v-if="displayStep === 'StepOne'">
            <StepOne
                @updateEnrollData="updateEnrollData"
                @triggerNext="triggerNext"
            />
        </template>


        <template v-else-if="displayStep === 'StepTwo'">
            <StepTwo
                @updateEnrollData="updateEnrollData"
                @triggerNext="triggerNext"
            />
        </template>


        <template v-else-if="displayStep === 'StepThree'">
            <StepThree
                @updateEnrollData="updateEnrollData"
                @triggerNext="triggerNext"
            />
        </template>

        <template v-else-if="displayStep === 'StepFour'">
            <StepFour
                @updateEnrollData="updateEnrollData"
                @triggerNext="triggerNext"
            />
        </template>


    </EnrollLayout>
</template>

<script>
    import EnrollLayout from '@/layouts/EnrollLayout.vue'

    import StepOne from '@/components/enroll/steps/_StepOne.vue'
    import StepTwo from '@/components/enroll/steps/_StepTwo.vue'
    import StepThree from '@/components/enroll/steps/_StepThree.vue'
    import StepFour from '@/components/enroll/steps/_StepFour.vue'


    export default {
        name: 'StepsView',
        components: {
            EnrollLayout,
            StepOne,
            StepTwo,
            StepThree,
            StepFour
        },
        data() {
            return {
                displayStep: 'StepOne'
            }
        },
        computed: {
            enrollData: {
                get() {
                    return this.$store.state.enrollData
                },
                set(value) {
                    this.$store.dispatch('setEnrollData', value)
                }
            }
        },
        // mounted() {
        //     if (!document.cookie.includes('aura-token')) {
        //         this.$router.push('/enroll')
        //     }
        // },

        methods: {
            updateEnrollData(data) {
                this.enrollData = {
                    ...this.enrollData,
                    ...data
                }
            },
            triggerNext(step) {
                this.displayStep = step
            }
        }

    }
</script>