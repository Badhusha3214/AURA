
<template>

    <DashboardLayout />
    <IsMobile />
    <div class="flex items-center justify-center h-24 bg-primary">
        <h1 class="text-4xl font-bold text-white">Analytics</h1>
    </div>

    <div class="h-96 flex items-center justify-center flex-col">
        <h1 class="text-4xl font-bold text-primary">{{ counter }}</h1>
        <div class="flex space-x-4 mt-5">
            <button @click="updateCounter(3, '++')" class="font-semibold text-xl bg-primary text-white px-4 py-2 rounded">+</button>
            <button @click="updateCounter(3, '--')" class="font-semibold text-xl bg-primary text-white px-4 py-2 rounded">-</button>
        </div>
    </div>
    
</template>

<script>
    import DashboardLayout from '@/layouts/DashboardLayout.vue'
    import IsMobile from "@/components/IsMobile.vue";

    export default {
        name: 'AnalyticsView',
        components: {
            DashboardLayout,
            IsMobile
        },
        computed: {
            counter: {
                get() {
                    return this.$store.state.counter
                },
                set(value) {
                    this.$store.dispatch('setCounter', value)
                }
            }
        },
        methods: {
            updateCounter(value, action) {
                action === '++' ? this.counter += value : this.counter -= value
            }
        }
    }
</script>