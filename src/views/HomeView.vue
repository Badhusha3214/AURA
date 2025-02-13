<template>

    <IsMobile />


    <popup />
        
    <DashboardLayout>


        <Calender  class="w-full"/>
        
        <CentralCircle
            :dates="dates"
            :comment="comment"
            :info="info"
            :days="days"
        />
        
    </DashboardLayout>

</template>

<script>
    import DashboardLayout from '@/layouts/DashboardLayout.vue'
    import CentralCircle from '@/components/Home/CentralCircle.vue'
    import Popup from '@/components/CompleteProfile.vue'
    import Calender from '@/components/Home/Calender.vue'
    import IsMobile from "@/components/IsMobile.vue";

    import { calculateMenstrualCycles, findClosestDate, getMessage } from '@/utils/helpers.js'
    import { getBasicData } from '@/api/index.js'
    import { getPeriodData } from '@/utils/periodStorage';

    export default {
        name: 'HomeView',
        components: {
            DashboardLayout,
            Calender,
            CentralCircle,
            IsMobile,
            Popup
        },
        data() {
            return {
                basicData: {},
                dates: {},

                lastMenstrualPeriod: null,
                cycleLength: null,
                periodLength: null,
                frequency: null,

                messages: {},
                comment: 'Track your cycle',
                info: 'Welcome to your cycle tracker',
                days: 0
            }
        },
        methods: {
            async getBasicData() {
                try {
                    const response = await getBasicData()
                    this.basicData = response.data

                    this.lastMenstrualPeriod = this.basicData.lastMenstrualPeriod
                    this.cycleLength = this.basicData.cycleLength
                    this.periodLength = this.basicData.periodLength

                } catch (error) {
                    console.log(error)
                }
            },
            
            async getDates(lastMenstrualPeriod, cycleLength, periodLength) {
                const data = getPeriodData();
                
                // Check if there's an active period first
                if (data.periods.length > 0) {
                    const currentPeriod = data.periods[data.periods.length - 1];
                    if (moment().isSameOrAfter(currentPeriod.startDate)) {
                        // Don't calculate cycles if we're in an active period
                        // CentralCircle component will handle the display
                        return;
                    }
                }

                // Otherwise calculate next cycle dates
                if (this.basicData.frequency === 'regular') {
                    this.frequency = 'regular'

                    this.dates = calculateMenstrualCycles(lastMenstrualPeriod, cycleLength, periodLength)
                    let closestItem = findClosestDate(this.dates.currentCycle, this.dates.nextCycle)
                    let msg = getMessage(closestItem)
                    // console.log(msg);
                    this.info = msg.description
                    this.comment = msg.comments[0]
                    this.days = msg.days

                } else {
                    this.frequency = 'irregular'
                }
            },
            
        },
        async mounted() {
            if (!document.cookie.includes('aura-token')) {
                this.$router.push('/enroll')
                return;
            }
            
            const periodData = getPeriodData();
            
            if (periodData.periods && periodData.periods.length > 0) {
                const lastPeriod = periodData.periods[periodData.periods.length - 1];
                const today = moment();
                const startDate = moment(lastPeriod.startDate);
                const endDate = lastPeriod.endDate ? moment(lastPeriod.endDate) : null;
                
                // Check if period has ended
                if (endDate && today.isAfter(endDate)) {
                    const nextPeriodStart = moment(startDate).add(periodData.cycleLength || 28, 'days');
                    this.days = nextPeriodStart.diff(today, 'days');
                    this.info = "Days Until<br/>Next Period";
                    this.comment = "Your period has ended";
                } else if (!endDate || today.isBetween(startDate, endDate, 'day', '[]')) {
                    const daysSinceStart = today.diff(startDate, 'days') + 1;
                    
                    // Determine current phase
                    if (daysSinceStart <= 5) {
                        this.info = "Menstruation<br/>Phase Day";
                        this.days = daysSinceStart;
                        this.comment = "Track your bleeding level and symptoms";
                    } else if (daysSinceStart <= 14) {
                        this.info = "Follicular<br/>Phase Day";
                        this.days = daysSinceStart;
                        this.comment = daysSinceStart >= 9 ? "You're in your fertile window" : "Body preparing for ovulation";
                    } else if (daysSinceStart <= 28) {
                        this.info = daysSinceStart === 14 ? "Ovulation<br/>Day" : "Luteal<br/>Phase Day";
                        this.days = daysSinceStart;
                        this.comment = daysSinceStart === 14 ? "Peak fertility day" : "Post-ovulation phase";
                    }
                } else {
                    await this.getDates(lastPeriod.startDate, periodData.cycleLength, periodData.averagePeriodLength);
                }
            } else {
                const basicData = await this.getBasicData();
                await this.getDates(this.lastMenstrualPeriod, this.cycleLength, this.periodLength);
            }
        },
        watch: {
            messages: {
                handler() {
                    this.commentPriority()
                },
                deep: true
            }
        }
    }
</script>