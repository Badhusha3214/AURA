
<template>

    <IsMobile />


    <popup />
        
    <DashboardLayout>

 
        <Calender />
        
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
                comment: 'Low chance to get pregnant.',
                info: 'You are free from<br/>PMS & fertility window',
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
            }
            await this.getBasicData()
            await this.getDates(this.lastMenstrualPeriod, this.cycleLength, this.periodLength)
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