<template>
    <div>
        <div class="flex gap-2 justify-between m-2 items-center"> 
            <template v-if="week.length > 0">
                <template v-for="day in week" :key="day.date">
                    <CalenderDate
                        :day="day"
                        :today="today"
                        @click="handleDateClick(day)"
                    />
                </template>
            </template>
        </div>
        
        <!-- Date Status Modal -->
        <div v-if="showStatusModal" class="fixed inset-0 z-50 flex items-center justify-center">
            <div class="absolute inset-0 bg-black opacity-50" @click="closeModal"></div>
            <div class="bg-white rounded-lg p-6 relative z-10 w-11/12 max-w-md">
                <h3 class="text-xl font-bold mb-4">{{ selectedDate.format('MMMM D, YYYY') }}</h3>
                <div class="space-y-4">
                    <!-- Period Status -->
                    <div v-if="dateStatus.isPeriodDay" class="text-pink-600">
                        <p class="font-medium">Period Day</p>
                        <p v-if="dateStatus.bleeding" class="text-sm">
                            Bleeding Level: {{ dateStatus.bleeding.level }}
                        </p>
                    </div>
                    
                    <!-- Fertility Status -->
                    <div v-if="dateStatus.isFertile" class="text-purple-600">
                        <p class="font-medium">Fertile Window</p>
                    </div>
                    
                    <!-- Ovulation Status -->
                    <div v-if="dateStatus.isOvulation" class="text-indigo-600">
                        <p class="font-medium">Ovulation Day</p>
                    </div>
                    
                    <!-- Mood -->
                    <div v-if="dateStatus.mood" class="bg-pink-50 p-3 rounded-lg">
                        <p class="font-medium">Mood</p>
                        <p class="text-sm">{{ dateStatus.mood.note }}</p>
                    </div>
                </div>
                <button 
                    class="mt-4 w-full py-2 bg-gray-100 rounded-lg text-gray-600"
                    @click="closeModal"
                >
                    Close
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import { getPeriodData } from '@/utils/periodStorage'
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
            today: moment().format('D'),
            showStatusModal: false,
            selectedDate: null,
            dateStatus: {}
        }
    },
    methods: {
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
        },
        
        handleDateClick(day) {
            this.selectedDate = moment().date(day.date);
            this.dateStatus = this.getDateStatus(this.selectedDate);
            this.showStatusModal = true;
        },
        
        getDateStatus(date) {
            const data = getPeriodData();
            const formattedDate = date.format('YYYY-MM-DD');
            const status = {
                isPeriodDay: false,
                isFertile: false,
                isOvulation: false,
                bleeding: null,
                mood: null
            };
            
            if (data.periods && data.periods.length > 0) {
                const currentPeriod = data.periods.find(period => {
                    const start = moment(period.startDate);
                    const end = period.endDate ? moment(period.endDate) : start.clone().add(data.averagePeriodLength, 'days');
                    return date.isBetween(start, end, 'day', '[]');
                });
                
                if (currentPeriod) {
                    status.isPeriodDay = true;
                    status.bleeding = currentPeriod.bleedingLevels?.find(b => 
                        moment(b.date).isSame(formattedDate, 'day')
                    );
                    status.mood = currentPeriod.moods?.find(m => 
                        moment(m.date).isSame(formattedDate, 'day')
                    );
                }
            }
            
            return status;
        },
        
        closeModal() {
            this.showStatusModal = false;
            this.selectedDate = null;
            this.dateStatus = {};
        }
    },
    mounted() {
        this.getWeek()
    }
}
</script>