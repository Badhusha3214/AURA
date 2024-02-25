
<template>
    <DashboardLayout>

        <CentralCircle />
        
    </DashboardLayout>
</template>

<script>
    import DashboardLayout from '@/layouts/DashboardLayout.vue'
    import CentralCircle from '@/components/CentralCircle.vue'
    
    export default {
        name: 'HomeView',
        components: {
            DashboardLayout,
            CentralCircle
        }
    }
</script>