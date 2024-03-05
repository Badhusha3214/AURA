
<template>
    
    <div class="flex flex-col items-center justify-center">
        <EnrollProgress question="Are you trying to<br/>conceive?" />
    </div>

    <div class="flex flex-col gap-5" id="accordion-collapse" data-accordion="collapse">
        <template v-for="(choice, index) in choices" :key="index">
            <div class="w-80 bg-tertiary rounded-xl border border-bgPrimary">

                <h2 :id="'accordion-collapse-heading-' + index">
                    <button type="button"
                        class="flex items-center justify-between text-sm w-80 p-5 font-semibold bg-bgPrimary border border-bgPrimary gap-3 rounded-xl"
                        :data-accordion-target="'#accordion-collapse-body-' + index" aria-expanded="false" 
                        :aria-controls="'accordion-collapse-body-' + index"
                        @click="selected = choice.value"
                    >
    
                        <span class="text-black">{{ choice.option }}</span>
    
                        <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">

                        </svg>
                    </button>
                </h2>
    
                <div :id="'accordion-collapse-body-' + index" class="hidden"
                    :aria-labelledby="'accordion-collapse-heading-' + index">
                    <div class="w-80 text-xs font-medium text-justify p-5 rounded-xl">
                        <p class="mb-2 text-black">{{ choice.description }}</p>
                    </div>
                </div>
                
            </div>
        </template>
    </div>
    
</template>


<script>
    import EnrollProgress from '@/components/partials/EnrollProgress.vue';

    export default {
        name: 'StepOne',
        components: {
            EnrollProgress
        },
        data() {
            return {
                choices: [
                    {
                        option: "Yes, I'm trying to conceive",
                        key: "accordion-collapse-heading-0",
                        value: "yes",
                        description: "Lorem ipsum dolor sit amet consectetur. Euismod lacus proin curabitur dignissim tellus blandit massa. Amet fusce semper convallis interdum."
                    },
                    {
                        option: "No, I just wanna track my cycle",
                        key: "accordion-collapse-heading-1",
                        value: "no",
                        description: "Lorem ipsum dolor sit amet consectetur. Euismod lacus proin curabitur dignissim tellus blandit massa. Amet fusce semper convallis interdum."
                    },
                ],
                selected: null,
                nextEnabled: false
            }
        }
    }
</script>