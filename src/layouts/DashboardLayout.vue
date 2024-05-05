
<template>
    <Navbar />
    <div class="dashboard-layout">
        <div class="content">
            <slot />
        </div>
        <ControlPanel />
    </div>
</template>


<script>
    import ControlPanel from '@/components/ControlPanel.vue'
    import Navbar from '@/components/Navbar.vue'

    export default {
        components: {
            Navbar,
            ControlPanel
        }
    }
</script>