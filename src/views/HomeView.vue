<template>
    <IsMobile />
    <popup />
    <DashboardLayout>
        <Calender class="w-full"/>
        
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
    import moment from 'moment';
    import { inject } from 'vue';

    import { calculateMenstrualCycles, findClosestDate, getMessage, saveCycleData } from '@/utils/helpers.js'
    import { getBasicData, getdata, getCycleDataFromAPI } from '@/api/index.js'
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
        setup() {
            // Get the global state to register this component
            const globalState = inject('globalState', null);
            return { globalState };
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
                info: 'ur cycle tracker',
                days: 0
            }
        },
        methods: {
            async getBasicData() {
                try {
                    console.log('Fetching basic data from API...');
                    
                    // Check for local storage data first
                    const localLastPeriodStart = localStorage.getItem('last_period_start');
                    const localCycleLength = localStorage.getItem('last_cycle_regular');
                    const localPeriodLength = localStorage.getItem('duration_period');
                    const localUserName = localStorage.getItem('userName');
                    
                    console.log('LocalStorage period data:', {
                        lastPeriodStart: localLastPeriodStart,
                        cycleLength: localCycleLength,
                        periodLength: localPeriodLength,
                        userName: localUserName
                    });
                    
                    // If we have local data from enrollment, use it immediately
                    if (localLastPeriodStart && localCycleLength && localPeriodLength) {
                        // Parse and validate the date format
                        const formattedLastPeriod = this.formatDateIfNeeded(localLastPeriodStart);
                        
                        this.lastMenstrualPeriod = formattedLastPeriod;
                        this.cycleLength = Number(localCycleLength);
                        this.periodLength = Number(localPeriodLength);
                        this.frequency = localStorage.getItem('mode') || 'regular';
                        
                        // Show personalized welcome if userName is available
                        if (localUserName) {
                            this.info = `Welcome ${localUserName}`;
                            this.comment = "Processing your cycle data...";
                        } else {
                            this.info = "Welcome to<br/>Your Cycle Tracker";
                            this.comment = "Processing your cycle data...";
                        }
                        
                        // Calculate current phase based on localStorage data right away
                        this.calculateCurrentPhase(formattedLastPeriod, Number(localCycleLength), Number(localPeriodLength));
                        
                        // Proceed with local data without waiting for API
                        this.getDates(formattedLastPeriod, Number(localCycleLength), Number(localPeriodLength));
                    }
                    
                    // Still fetch from API to get the latest data
                    const response = await getBasicData();
                    console.log('Basic data API response:', response);
                    this.basicData = response.data;
                    
                    // ...existing API call code...
                    
                    return {
                        lastMenstrualPeriod: this.lastMenstrualPeriod,
                        cycleLength: this.cycleLength,
                        periodLength: this.periodLength,
                        frequency: this.frequency
                    };
                } catch (error) {
                    console.error('Error in getBasicData:', error);
                    
                    // On API error, try using localStorage data as fallback
                    const localLastPeriodStart = localStorage.getItem('last_period_start');
                    const localCycleLength = localStorage.getItem('last_cycle_regular');
                    const localPeriodLength = localStorage.getItem('duration_period');
                    
                    if (localLastPeriodStart && localCycleLength && localPeriodLength) {
                        const formattedLastPeriod = this.formatDateIfNeeded(localLastPeriodStart);
                        
                        return {
                            lastMenstrualPeriod: formattedLastPeriod,
                            cycleLength: Number(localCycleLength),
                            periodLength: Number(localPeriodLength),
                            frequency: localStorage.getItem('mode') || 'regular'
                        };
                    }
                    
                    return null;
                }
            },
            
            // New helper method to ensure correct date format
            formatDateIfNeeded(dateString) {
                if (!dateString) return null;
                
                // Check if the date is already in correct format (YYYY-MM-DD)
                if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(dateString)) {
                    // Ensure single-digit months and days are padded with zeros
                    const [year, month, day] = dateString.split('-');
                    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                }
                
                // Handle other date formats
                try {
                    const date = new Date(dateString);
                    if (isNaN(date.getTime())) {
                        console.error('Invalid date format:', dateString);
                        return null;
                    }
                    return date.toISOString().split('T')[0];
                } catch (error) {
                    console.error('Error formatting date:', dateString, error);
                    return null;
                }
            },
            
            async getDates(lastMenstrualPeriod, cycleLength, periodLength) {
                try {
                    console.log('Getting dates with params:', { lastMenstrualPeriod, cycleLength, periodLength });
                    
                    // First try to get data from API
                    const apiCycleData = await getCycleDataFromAPI();
                    if (apiCycleData?.data?.cycle_data) {
                        console.log('Using cycle data from API');
                        this.dates = apiCycleData.data.cycle_data;
                        
                        if (this.dates && this.dates.currentCycle && this.dates.nextCycle) {
                            let closestItem = findClosestDate(this.dates.currentCycle, this.dates.nextCycle);
                            if (closestItem) {
                                let msg = getMessage(closestItem);
                                this.info = msg.description;
                                this.comment = msg.comments[0];
                                this.days = msg.days || 0;
                            }
                            this.determineCurrentPhase();
                            return;
                        }
                    }
                    
                    // If no API data, calculate new cycle data
                    if (this.basicData.frequency === 'regular') {
                        this.frequency = 'regular';
                        console.log('Calculating menstrual cycles for regular period');
                        this.dates = calculateMenstrualCycles(lastMenstrualPeriod, cycleLength, periodLength);
                        console.log('Calculated dates:', this.dates);
                        
                        // Save calculated data to both localStorage and API
                        await saveCycleData(this.dates);
                        
                        if (this.dates && this.dates.currentCycle && this.dates.nextCycle) {
                            let closestItem = findClosestDate(this.dates.currentCycle, this.dates.nextCycle);
                            console.log('Closest date found:', closestItem);
                            
                            if (closestItem) {
                                let msg = getMessage(closestItem)
                                console.log('Message for closest date:', msg);
                                
                                this.info = msg.description
                                this.comment = msg.comments[0]
                                this.days = msg.days
                            } else {
                                console.warn('No closest date found, using default values');
                                this.info = 'Track your cycle'
                                this.comment = 'No cycle data available'
                                this.days = 0
                            }
                            
                            // Determine current phase and update UI
                            this.determineCurrentPhase();
                        } else {
                            console.warn('Incomplete dates object:', this.dates);
                            this.info = 'Track your cycle'
                            this.comment = 'Insufficient cycle data'
                            this.days = 0
                        }
                    } else {
                        console.log('Setting frequency to irregular');
                        this.frequency = 'irregular'
                    }
                } catch (error) {
                    console.error('Error in getDates:', error);
                    this.info = 'Error calculating cycle'
                    this.comment = 'Please try again later'
                    this.days = 0
                }
            },
            
            determineCurrentPhase() {
                const today = moment();
                console.log('Determining current phase for date:', today.format('YYYY-MM-DD'));
                
                if (!this.dates || !this.dates.currentCycle || !this.dates.nextCycle) {
                    console.warn('No cycle data available for phase determination');
                    return;
                }
                
                const { currentCycle, nextCycle } = this.dates;
                const todayStr = today.format('YYYY-MM-DD');
                
                // Check if in menstruation phase
                if (today.isBetween(
                    moment(nextCycle.menstruationStartDate).subtract(1, 'day'),
                    moment(nextCycle.menstruationEndDate),
                    'day',
                    '[]'
                )) {
                    const dayOfPeriod = today.diff(moment(nextCycle.menstruationStartDate), 'days') + 1;
                    this.info = "Menstruation<br/>Phase Day";
                    this.days = dayOfPeriod;
                    this.comment = "Track your bleeding level and symptoms";
                    return;
                }
                
                // Check if in follicular phase (overlaps with menstruation)
                if (today.isBetween(
                    moment(nextCycle.follicularStartDate).subtract(1, 'day'),
                    moment(nextCycle.follicularEndDate),
                    'day',
                    '[]'
                ) && !today.isBetween(
                    moment(nextCycle.menstruationStartDate).subtract(1, 'day'),
                    moment(nextCycle.menstruationEndDate),
                    'day',
                    '[]'
                )) {
                    const dayOfPhase = today.diff(moment(nextCycle.follicularStartDate), 'days') + 1;
                    this.info = "Follicular<br/>Phase Day";
                    this.days = dayOfPhase;
                    this.comment = "Body preparing for ovulation";
                    return;
                }
                
                // Check if in fertile window
                if (today.isBetween(
                    moment(nextCycle.fertileWindowStartDate).subtract(1, 'day'),
                    moment(nextCycle.fertileWindowEndDate),
                    'day',
                    '[]'
                )) {
                    const dayOfWindow = today.diff(moment(nextCycle.fertileWindowStartDate), 'days') + 1;
                    this.info = "Fertile Window<br/>Day";
                    this.days = dayOfWindow;
                    this.comment = "Higher chance of getting pregnant";
                    return;
                }
                
                // Check if ovulation day
                if (today.isSame(moment(nextCycle.ovulationDate), 'day')) {
                    this.info = "Ovulation<br/>Day";
                    this.days = 1;
                    this.comment = "Peak fertility day";
                    return;
                }
                
                // Check if in luteal phase
                if (today.isBetween(
                    moment(nextCycle.lutealStartDate).subtract(1, 'day'),
                    moment(nextCycle.lutealEndDate),
                    'day',
                    '[]'
                )) {
                    const dayOfPhase = today.diff(moment(nextCycle.lutealStartDate), 'days') + 1;
                    this.info = "Luteal<br/>Phase Day";
                    this.days = dayOfPhase;
                    this.comment = "Post-ovulation phase";
                    return;
                }
                
                // Check if in PMS phase
                if (today.isBetween(
                    moment(nextCycle.pmsStartDate).subtract(1, 'day'),
                    moment(nextCycle.pmsEndDate),
                    'day',
                    '[]'
                )) {
                    const dayOfPMS = today.diff(moment(nextCycle.pmsStartDate), 'days') + 1;
                    this.info = "PMS<br/>Phase Day";
                    this.days = dayOfPMS;
                    this.comment = "Take care of yourself during PMS";
                    return;
                }
                
                // If none of the above, calculate days until next period
                const nextPeriodStart = moment(nextCycle.periodStartDate);
                if (today.isBefore(nextPeriodStart)) {
                    const daysUntil = nextPeriodStart.diff(today, 'days');
                    this.info = "Days Until<br/>Next Period";
                    this.days = daysUntil;
                    this.comment = `Your next period starts in ${daysUntil} days`;
                    return;
                }
                
                console.log('Could not determine exact cycle phase, using default closest phase');
            },
            
            // Method to be triggered from ControlPanel
            async refreshData() {
                console.log('HomeView refreshData called');
                try {
                    const cycleData = await getdata();
                    console.log('Fresh API data:', cycleData);
                    
                    if (cycleData && cycleData.data) {
                        const apiData = cycleData.data;
                        
                        this.lastMenstrualPeriod = apiData.last_period_start;
                        this.cycleLength = Number(apiData.last_cycle_regular) || 28;
                        this.periodLength = Number(apiData.duration_period) || 5;
                        
                        if (apiData.last_period_start) {
                            const lastStartDate = new Date(apiData.last_period_start);
                            const today = new Date();
                            
                            const daysSinceStart = Math.floor((today - lastStartDate) / (1000 * 60 * 60 * 24));
                            
                            if (daysSinceStart <= this.periodLength) {
                                this.info = "Menstruation<br/>Phase Day";
                                this.days = daysSinceStart + 1;
                                this.comment = "Track your bleeding level and symptoms";
                            } else {
                                const nextPeriodDate = new Date(lastStartDate);
                                nextPeriodDate.setDate(nextPeriodDate.getDate() + this.cycleLength);
                                
                                const daysUntilNext = Math.floor((nextPeriodDate - today) / (1000 * 60 * 60 * 24));
                                
                                if (daysUntilNext >= 0) {
                                    this.info = "Days Until<br/>Next Period";
                                    this.days = daysUntilNext;
                                    this.comment = `Your next period starts in ${daysUntilNext} days`;
                                } else {
                                    this.info = "Period<br/>Overdue";
                                    this.days = Math.abs(daysUntilNext);
                                    this.comment = `Your period is ${Math.abs(daysUntilNext)} days overdue`;
                                }
                            }
                        }
                    }
                } catch (error) {
                    console.error('Error refreshing data:', error);
                }
            },
            
            // New method to immediately show cycle status based on localStorage data
            calculateCurrentPhase(lastPeriodStart, cycleLength, periodLength) {
                try {
                    if (!lastPeriodStart || !cycleLength || !periodLength) {
                        return;
                    }
                    
                    const lastStartDate = new Date(lastPeriodStart);
                    const today = new Date();
                    
                    // Calculate days since period start
                    const daysSinceStart = Math.floor((today - lastStartDate) / (1000 * 60 * 60 * 24));
                    
                    // If within period days, show menstruation phase
                    if (daysSinceStart <= periodLength) {
                        this.info = "Menstruation<br/>Phase Day";
                        this.days = daysSinceStart + 1;
                        this.comment = "Track your bleeding level and symptoms";
                    } else {
                        // Calculate next period date
                        const nextPeriodDate = new Date(lastStartDate);
                        nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLength);
                        
                        const daysUntilNext = Math.floor((nextPeriodDate - today) / (1000 * 60 * 60 * 24));
                        
                        if (daysUntilNext >= 0) {
                            this.info = "Days Until<br/>Next Period";
                            this.days = daysUntilNext;
                            this.comment = `Your next period starts in ${daysUntilNext} days`;
                            
                            // Show ovulation info if in that phase
                            const ovulationDay = Math.floor(cycleLength / 2);
                            const daysPastLastPeriod = daysSinceStart;
                            
                            if (Math.abs(daysPastLastPeriod - ovulationDay) <= 2) {
                                this.info = "Ovulation<br/>Phase";
                                this.comment = "Peak fertility time";
                            } else if (daysPastLastPeriod > ovulationDay && daysUntilNext <= 7) {
                                this.info = "Pre-menstrual<br/>Phase";
                                this.comment = "PMS symptoms may appear";
                            } else if (daysPastLastPeriod < ovulationDay) {
                                this.info = "Follicular<br/>Phase";
                                this.comment = "Your body is preparing for ovulation";
                            } else {
                                this.info = "Luteal<br/>Phase";
                                this.comment = "Post-ovulation period";
                            }
                        } else {
                            this.info = "Period<br/>Overdue";
                            this.days = Math.abs(daysUntilNext);
                            this.comment = `Your period is ${Math.abs(daysUntilNext)} days overdue`;
                        }
                    }
                } catch (error) {
                    console.error('Error calculating current phase:', error);
                    // Don't overwrite existing info/comment if calculation fails
                }
            }
        },
        async mounted() {
            console.log('HomeView component mounted');
            
            // Register this component instance with the global state
            if (this.globalState) {
                this.globalState.registerHomeView(this);
            }
            
            if (!document.cookie.includes('aura-token')) {
                console.log('No aura-token found, redirecting to /enroll');
                this.$router.push('/enroll');
                return;
            }
            
            try {
                // Check localStorage for enrollment data first
                const enrollmentComplete = localStorage.getItem('last_period_start') && 
                                          localStorage.getItem('last_cycle_regular') && 
                                          localStorage.getItem('duration_period');
                                          
                if (enrollmentComplete) {
                    console.log('Enrollment data found in localStorage');
                    
                    // Initialize periodData in localStorage if not already present
                    const periodData = localStorage.getItem('periodData');
                    if (!periodData || periodData === '{"periods":[],"cycleLength":"25","averagePeriodLength":5}') {
                        console.log('Initializing periodData from enrollment data');
                        
                        const lastPeriodStart = this.formatDateIfNeeded(localStorage.getItem('last_period_start'));
                        const cycleLength = localStorage.getItem('last_cycle_regular');
                        const periodLength = localStorage.getItem('duration_period');
                        
                        // Create initial period entry
                        const initialPeriodData = {
                            periods: [{
                                startDate: lastPeriodStart,
                                endDate: moment(lastPeriodStart).add(Number(periodLength) - 1, 'days').format('YYYY-MM-DD'),
                                allDates: [],
                                moods: [],
                                bleedingLevels: []
                            }],
                            cycleLength: Number(cycleLength),
                            averagePeriodLength: Number(periodLength)
                        };
                        
                        // Calculate all dates for the initial period
                        const startDate = new Date(lastPeriodStart);
                        const endDate = new Date(initialPeriodData.periods[0].endDate);
                        const currentDate = new Date(startDate);
                        
                        while (currentDate <= endDate) {
                            initialPeriodData.periods[0].allDates.push(
                                new Date(currentDate).toISOString().split('T')[0]
                            );
                            currentDate.setDate(currentDate.getDate() + 1);
                        }
                        
                        localStorage.setItem('periodData', JSON.stringify(initialPeriodData));
                        
                        // Immediately show current cycle phase based on localStorage data
                        this.calculateCurrentPhase(lastPeriodStart, Number(cycleLength), Number(periodLength));
                    }
                }
                
                // Get period data directly from API
                await this.getBasicData();
                
                // Only proceed with complex calculations if we don't have direct display data already
                if (this.info === 'ur cycle tracker' && this.comment === 'Track your cycle') {
                    console.log('No direct display data, using calculated values');
                    
                    if (this.lastMenstrualPeriod && this.cycleLength && this.periodLength) {
                        await this.getDates(this.lastMenstrualPeriod, this.cycleLength, this.periodLength);
                        this.determineCurrentPhase();
                    } else {
                        console.log('Missing required data for cycle calculation');
                        this.info = 'Welcome to<br/>Your Cycle Tracker';
                        this.comment = 'Add your period start date to begin tracking';
                        this.days = 0;
                    }
                } else {
                    console.log('Using direct display data from API');
                }
            } catch (error) {
                console.error('Error in mounted hook:', error);
                this.info = 'Error Loading Data';
                this.comment = 'Please try again later';
                this.days = 0;
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