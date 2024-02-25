
<template>
    <div class="dashboard-layout">
        <div class="content">
            <router-view />
        </div>
        <ControlPanel />
    </div>
</template>


<script>
    import ControlPanel from '@/components/ControlPanel.vue'

    export default {
        components: {
            ControlPanel
        }
    }
</script>