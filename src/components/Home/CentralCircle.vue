<template>
    <div class="central-circle flex items-center justify-center p-6 flex-col">
        <div class="central-circle-container w-80 h-80 relative">
            <!-- Single orbiting circle -->
            <div class="orbit-container">
                <div class="orbit-circle"></div>
            </div>
            
            <div class="central-circle__outer border-4 border-secondary rounded-full flex items-center justify-center">
                <div class="central-circle__inner bg-circle rounded-full flex flex-col items-center justify-center p-6">
                    <div class="central-circle__content flex flex-col items-center">
                        <span class="text-xl font-medium text-center text-white" v-html="info"></span>
                        <template v-if="days > 0">
                            <span class="text-4xl font-semibold mt-3 text-white">{{ days }} {{ days > 1 ? 'Days' : 'Day' }}</span>
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <div class="central-circle__comment mt-4">
            <p class="text-center text-circle font-semibold text-xl">{{ comment }}</p>
        </div>
    </div>
</template>

<script>
import { getPeriodData } from '@/utils/periodStorage';
import moment from 'moment';

export default {
    name: 'CentralCircle',
    props: {
        info: {
            type: String,
            default: 'Welcome'
        },
        days: {
            type: Number,
            default: 0
        },
        comment: {
            type: String,
            default: 'Track your cycle'
        },
        dates: {
            type: Object,
            default: () => ({})
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
    },
    mounted() {
        console.log("CentralCircle mounted with days:", this.days);
    },
    watch: {
        days(newVal) {
            console.log("Days value changed to:", newVal);
        }
    }
}
</script>

<style scoped>
.central-circle {
    min-height: 40vh;
}

.central-circle-container {
    position: relative;
}

.central-circle__outer {
    width: 100%;
    height: 100%;
    border-color: #F46E98; /* Updated to requested color */
    display: flex;
    align-items: center;
    justify-content: center;
}

.central-circle__inner {
    width: 90%;
    height: 90%;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    background-color: #F46E98; /* Added custom background color */
}

.central-circle__content {
    text-align: center;
}

/* Single orbit animation */
.orbit-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10;
    pointer-events: none;
}

.orbit-circle {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: #F46E98;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    top: 145px;
    left: 150px;
    transform: translateX(-50%);
    animation: orbit 12s linear infinite;
}

@keyframes orbit {
    0% {
        transform: rotate(0deg) translateX(160px) rotate(0deg);
    }
    100% {
        transform: rotate(360deg) translateX(160px) rotate(-360deg);
    }
}

.text-secondary {
    color: #F46E98; /* Updated to requested color */
}

.text-circle {
    color: #F46E98; /* Added custom text color */
}

.bg-circle {
    background-color: #F46E98; /* Added custom background color */
}

.border-secondary {
    border-color: #F46E98; /* Updated to requested color */
}

.day-count {
    line-height: 1;
}
</style>