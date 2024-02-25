
<template>
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
    import CentralCircle from '@/components/CentralCircle.vue'
    import Calender from '@/components/Calender.vue'

    import { calculateDates, generateComments } from '@/utils/helpers.js'
    import { getBasicData } from '@/api/index.js'
    
    export default {
        name: 'HomeView',
        components: {
            DashboardLayout,
            Calender,
            CentralCircle
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
                    this.dates = calculateDates(lastMenstrualPeriod, cycleLength)
                } else {
                    this.frequency = 'irregular'
                }
            },
            async commentPriority() {

                // let msgArray = Object.keys(this.messages).map(key => this.messages[key])

                // object of objects to array of objects, along with the key as a property
                let msgArray = Object.keys(this.messages).map(key => {
                    return {
                        key: key,
                        ...this.messages[key]
                    }
                })
                
                msgArray = msgArray.filter(obj => obj.days >= 0)
                msgArray.sort((a, b) => a.days - b.days)

                // console.log(msgArray);

                if (msgArray.length < 6) {
                    let newDates = calculateDates(this.messages.nextPeriodStartDate.date, this.cycleLength)
                    let resolvedDates = newDates;

                    for (let key in msgArray) {
                        if (msgArray.hasOwnProperty(key)) {
                            // console.log(msgArray[key].key);
                            resolvedDates[msgArray[key].key] = msgArray[key].date
                        }
                    }

                    this.messages = generateComments(resolvedDates)
                    
                    msgArray = Object.keys(this.messages).map(key => this.messages[key])
                    msgArray = msgArray.filter(obj => obj.days >= 0)
                    msgArray.sort((a, b) => a.days - b.days)

                    console.log(msgArray);

                }

                this.comment = msgArray[0].comments[0]
                this.info = msgArray[0].description
                this.days = msgArray[0].days
            }
        },
        async mounted() {
            await this.getBasicData()
            await this.getDates(this.lastMenstrualPeriod, this.cycleLength, this.periodLength)

            this.messages = generateComments(this.dates)
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