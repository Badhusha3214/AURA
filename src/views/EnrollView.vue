<template>
    <EnrollLayout>
        <div class="flex flex-col items-center justify-center">
            <div class="my-10 py-10">
                <router-view />
            </div>

            <div class="absolute bottom-0 w-full flex justify-center mb-12">
                <div class="relative flex flex-col items-center gap-2 justify-center my-3">
                    <button class="text-white font-bold text-2xl w-72 p-3 rounded-full" :class="{'bg-primary': nextEnabled, 'bg-gray-300 cursor-not-allowed': !nextEnabled}" @click="nextStep" :disabled="!nextEnabled">Next</button>
                    <button class="text-sm font-medium text-gray-500">I'm not sure</button>
                </div>
            </div>
        </div>
    </EnrollLayout>
</template>

<script>
    import EnrollLayout from '@/layouts/EnrollLayout.vue'

    export default {
        name: 'EnrollView',
        components: {
            EnrollLayout
        },
        data() {
            return {
                nextEnabled: true,
                currentStep: 0 // Track the current step
            }
        },
        methods: {
            nextStep() {
                // Increment the current step
                this.currentStep++;
                
                // Navigate to the next step using Vue Router
                this.$router.push({ name: `Step${this.currentStep}` });
            }
        }
    }
</script>
