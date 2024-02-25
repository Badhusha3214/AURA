
<template>
    <div class="control-panel absolute bottom-0 w-full bg-white">

        <div class="control-panel__items">
            <router-link
                v-for="control in controls"
                :key="control.name"
                :to="control.route"
                class="control-panel__item"
                :class="{ 'text-primary': activeControl === control.name.toLowerCase(), 'text-secondary': activeControl !== control.name.toLowerCase() }"
            >
                <span :class="control.icon" class="text-2xl"></span>
                <span class="text-xs font-semibold">{{ control.name }}</span>
            </router-link>
        </div>

        <div class="control-panel__plus-btn">
            <button class="bg-primary text-white rounded-full w-14 h-14">
                <span class="text-2xl icon-ic-add"></span>
            </button>
        </div>
        
    </div>
</template>


<script>
export default {
    name: 'ControlPanel',
    data() {
        return {
            controls: [
                {
                    name: 'Home',
                    icon: 'icon-ic-home',
                    route: '/home'
                },
                {
                    name: 'Appoinment',
                    icon: 'icon-ic-appoinment',
                    route: '/appoinment'
                },
                {
                    name: 'Analytics',
                    icon: 'icon-ic-analytics',
                    route: '/analytics'
                },
                {
                    name: 'Profile',
                    icon: 'icon-ic-profile',
                    route: '/profile'
                }
            ],
            activeControl: null
        }
    },
    mounted() {
        this.activeControl = this.$route.path.split('/')[1]
    }
}
</script>


<style scoped lang="scss">
    .control-panel {

        box-shadow: 0px -2px 3px 0px rgba(0, 0, 0, 0.2);        
        
        &__items {
            display: flex;
            flex-direction: row;
            justify-content: space-around;

            .control-panel__item:nth-child(2) {
                margin-right: 1.5rem;
            }

            .control-panel__item:nth-child(3) {
                margin-left: 1.5rem;
            }

            .control-panel__item:nth-child(3) span:first-child {
                font-size: 1.25rem;
            }
        }
        
        &__item {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1rem;
            gap: 0.30rem;
            cursor: pointer;
        }

        &__plus-btn {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: -1.75rem;
        }

    }
</style>