
<template>
    <div class="dashboard-layout">
        <div class="content">
            <slot />
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