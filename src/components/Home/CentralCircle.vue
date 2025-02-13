<template>
    <div class="central-circle">

        <div class="central-circle-container w-80 h-80">
            <div class="central-circle__outer border border-4 border-secondary">
                <div class="central-circle__inner">
                    
                    <div class="central-circle__content">
                        <span class="text-xl font-medium text-center" v-html="localInfo"></span>

                        <template v-if="localDays">
                            <span class="text-4xl font-semibold mt-3">{{ localDays }} {{ localDays > 1 ? 'Days' : 'Day' }}</span>
                        </template>
                    </div>
                        
                </div>
            </div>
        </div>

        <div class="central-circle__comment">
            <p class="text-center text-secondary font-semibold text-xl">{{ localComment }}</p>
        </div>
        
    </div>
</template>

<script>
import { getPeriodData } from '@/utils/periodStorage';
import moment from 'moment';

export default {
  name: 'CentralCircle',
  props: {
    dates: {
      type: Object,
      default: () => ({})
    },
    comment: {
      type: String,
      default: ''
    },
    info: {
      type: String,
      default: ''
    },
    days: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      localInfo: this.info,
      localDays: this.days,
      localComment: this.comment
    }
  },
  methods: {
    updateCircleData() {
      const data = getPeriodData();
      const today = moment();
      
      if (data.periods && data.periods.length > 0) {
        const currentPeriod = data.periods[data.periods.length - 1];
        const startDate = moment(currentPeriod.startDate);
        const endDate = currentPeriod.endDate ? moment(currentPeriod.endDate) : null;

        // If period has ended, calculate next period
        if (endDate && today.isAfter(endDate)) {
          const nextPeriodStart = moment(startDate).add(data.cycleLength || 28, 'days');
          const daysUntilNext = nextPeriodStart.diff(today, 'days');
          
          this.localDays = daysUntilNext;
          this.localInfo = "Days Until<br/>Next Period";
          this.localComment = "Your period has ended";
          return;
        }

        // If period is active (between start and end date or no end date yet)
        if (!endDate || today.isBetween(startDate, endDate, 'day', '[]')) {
          const daysSinceStart = today.diff(startDate, 'days') + 1;
          
          if (daysSinceStart <= 5) {
            this.localInfo = "Menstruation<br/>Phase";
            this.localDays = daysSinceStart;
            this.localComment = "Period bleeding occurs. Track your symptoms.";
          }
          return;
        }

        // If we're past menstruation, show other phases
        const daysSinceStart = today.diff(startDate, 'days') + 1;
        if (daysSinceStart <= 14) {
          this.localInfo = "Follicular<br/>Phase";
          this.localDays = daysSinceStart;
          this.localComment = "Body preparing for ovulation";
        } else if (daysSinceStart === 14) {
          this.localInfo = "Ovulation<br/>Day";
          this.localDays = daysSinceStart;
          this.localComment = "Peak fertility day";
        } else if (daysSinceStart <= 28) {
          this.localInfo = "Luteal<br/>Phase";
          this.localDays = daysSinceStart;
          this.localComment = "Post-ovulation phase";
        }
      }
    }
  },
  created() {
    this.updateCircleData();
    setInterval(this.updateCircleData, 3600000);
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
            width: 70%;
        }

    }
</style>