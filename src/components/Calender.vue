
<template>
    <div>

        <div class="flex gap-2 justify-between m-2 items-center"> 

            <template v-if="week.length > 0">
                <template v-for="day in week" :key="day.date">

                    <CalenderDate
                        :day="day"
                        :today="today"
                    />

                </template>
            </template>
            
        </div>

    </div>
</template>


<script>
    import moment from 'moment'
    
    import CalenderDate from '@/components/partials/CalenderDate.vue'
    
    export default {
        name: 'Calender',
        components: {
            CalenderDate
        },
        data() {
            return {
                date: moment(),
                week: [],
                today: moment().format('D')
            }
        },
        methods: {
            // get date and day of this week as an array
            getWeek() {
                let week = []
                let date = this.date
                let startOfWeek = date.clone().startOf('week')
                let endOfWeek = date.clone().endOf('week')
                let day = startOfWeek.clone().subtract(1, 'day')
                while (day.isBefore(endOfWeek, 'day')) {
                    week.push({
                        day: day.add(1, 'day').format('ddd'),
                        date: day.format('D'),
                        active: false
                    })
                }
                this.week = week
            }
        },
        mounted() {
            this.getWeek()
        }
    }
</script>