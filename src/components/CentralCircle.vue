
<template>
    <div class="central-circle">

        <div class="central-circle-container w-80 h-80">
            <div class="central-circle__outer border border-4 border-secondary">
                <div class="central-circle__inner">
                    
                    <div class="central-circle__content">
                        <span class="text-xl font-medium">Your Next</span>
                        <span class="text-xl font-medium">Period Starts in</span>
                        <span class="text-4xl font-semibold mt-3">{{ days }} Days</span>
                    </div>
                        
                </div>
            </div>
        </div>

        <div class="central-circle__comment">
            <p class="text-center text-secondary font-semibold text-xl">{{ comment }}</p>
        </div>
        
    </div>
</template>


<script>
    export default {
        name: 'CentralCircle',
        data() {
            return {
                days: 5,
                comment: 'Medium chance to get pregnant'
            }
        }
    }
</script>


<style lang="scss" scoped>
    .central-circle {

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 2rem 0;

        &__outer {
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100%;
        }

        &__inner {
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 80%;
            width: 80%;
            background: radial-gradient(circle, #FFFFFF -50%, #FF8AB0 50%, #F43976 100%);

        }

        &__content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
        }

        &__comment {
            margin-top: 1rem;
            width: 75%;
        }

    }
</style>