<template>
    <div class="calender-date cursor-pointer" @click="$emit('click')">

        <button class="w-full h-full">
            <div ref="date" class="calender-date__day border border-primary rounded-lg p-2" :class="day.date === today ? 'bg-primary text-white' : 'bg-white text-primary'">
                
                <p class="text-sm font-medium">{{ day.day }}</p>
                <span class="text-base font-semibold">{{ day.date.length === 1 ? '0' + day.date : day.date }}</span>
            
            </div>
        </button>
        
    </div>
</template>


<script>
    export default {
        name: 'CalenderDate',
        props: {
            day: {
                type: Object,
                required: true
            },
            today: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                thisDate: {
                    day: this.day.day,
                    date: this.day.date
                },
            }
        },
        emits: ['click']
    }
</script>


<style scoped lang="scss">
    .calender-date {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 100%;
        
        &__day {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 0.5rem;
            width: 100%;
        }
    }
</style>