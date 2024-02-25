
<template>
    <DashboardLayout>

        <Calender />

        <CentralCircle />
        
    </DashboardLayout>
</template>

<script>
    import DashboardLayout from '@/layouts/DashboardLayout.vue'
    import CentralCircle from '@/components/CentralCircle.vue'
    import Calender from '@/components/Calender.vue'
    
    export default {
        name: 'HomeView',
        components: {
            DashboardLayout,
            Calender,
            CentralCircle
        }
    }
</script>