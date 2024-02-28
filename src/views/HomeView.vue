
<template>
    <navbar />

    <DashboardLayout>

        <Calender />

        <CentralCircle />
        
    </DashboardLayout>
</template>

<script>
    import DashboardLayout from '@/layouts/DashboardLayout.vue'
    import CentralCircle from '@/components/CentralCircle.vue'
    import Calender from '@/components/Calender.vue'
    import navbar from '@/components/Navbar.vue'
    
    export default {
        name: 'HomeView',
        components: {
            DashboardLayout,
            Calender,
            CentralCircle,
            navbar
        }
    }
</script>