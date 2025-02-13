/*
    ---------------------------------- START : BASIC TERMINOLOGY ----------------------------------


    1. Menstrual Cycle:                  The time from the first day of one period to the first day of the next period. It usually lasts 21 to 35 days.

    2. Follicular Phase:                 [Day-0 to Day-14]      -   The time between the first day of the period and ovulation. It usually lasts 13 to 14 days. It overlaps with the menses phase and ends when you ovulate.
    3. Menstruation:                     [Day-0 to Day-5]       -   The time when the uterus sheds its lining and bleeding occurs. It usually lasts 3 to 7 days.
    4. Ovulation:                        [Day-14]               -   The release of an egg from the ovary. It usually occurs around the middle of the menstrual cycle, from day 11 to day 21. Ovulation can last from 16 to 32 hours.
    5. Luteal Phase:                     [Day-15 to Day-28]     -   The time between ovulation and the start of the next period. It usually lasts 12 to 16 days.

    6. Menstrual Cycle Length:           The number of days from the first day of one period to the first day of the next period.
    7. Menstrual Period Length:          The number of days of bleeding during the period.

    8. Ovulation Date:                   The date when ovulation occurs.
    9. Fertile Window:                   The days around ovulation when the chances of getting pregnant are highest. It usually lasts 6 days, from 5 days before ovulation to the day of ovulation.

    10. Premenstrual Syndrome (PMS):     The physical and emotional symptoms that occur in the days before the period starts. It usually goes away after the period starts.


    ---------------------------------- END : BASIC TERMINOLOGY ----------------------------------
*/









import moment from 'moment';

// New function to get cycle data from localStorage
export const getCycleData = () => {
    const savedCycleData = localStorage.getItem('cycleData');
    if (!savedCycleData) {
        return {
            cycleLength: 28,
            periodLength: 5,
            lastStartDate: null,
            lastEndDate: null
        };
    }
    return JSON.parse(savedCycleData);
};


/**
 * @param {string} lastMenstrualPeriod
 * @param {number} cycleLength
 * @param {number} periodLength
 * @param {string} actualEndDate
 * @returns {object} menstrualCycle
 * 
 * @description
 * -   The function takes the lastMenstrualPeriod, cycleLength and periodLength as input.
 * -   It then calculates the menstrual cycle based on the input, by calling the calculateMenstrualCycles function.
 * -   It returns the menstrual cycle.
*/
export const calculateMenstrualCycles = (lastMenstrualPeriod, cycleLength = null, periodLength = null) => {
    // Get data from localStorage if not provided
    const cycleData = getCycleData();
    const actualCycleLength = cycleLength || cycleData.cycleLength;
    const actualPeriodLength = periodLength || cycleData.periodLength;
    const actualEndDate = cycleData.lastEndDate;

    // Validate required data
    if (!lastMenstrualPeriod) {
        console.warn('Missing last menstrual period date');
        return null;
    }

    let beforeLastMenstrualPeriod = moment(lastMenstrualPeriod)
        .subtract(actualCycleLength, 'days')
        .format('YYYY-MM-DD');

    let nextCycle = getMenstrualCycle(lastMenstrualPeriod, actualCycleLength, actualPeriodLength, actualEndDate);
    let currentCycle = getMenstrualCycle(beforeLastMenstrualPeriod, actualCycleLength, actualPeriodLength);

    return {
        cycleLength: actualCycleLength,
        periodLength: actualPeriodLength,
        lastMenstrualPeriod,
        beforeLastMenstrualPeriod,
        currentCycle,
        nextCycle,
    };
};




/**
 * @param {string} lastMenstrualPeriod
 * @param {number} cycleLength
 * @param {number} periodLength
 * @param {string} actualEndDate
 * @returns {object} menstrualCycle
 * 
 * @description
 * -   The function takes the lastMenstrualPeriod, cycleLength and periodLength as input.
 * -   It then it calculates all the important dates of the menstrual cycle.
 * -   It returns the dates of the menstrual cycle in an object.
*/
export const getMenstrualCycle = (lastMenstrualPeriod, cycleLength, periodLength, actualEndDate = null) => {
    const cycleData = getCycleData();
    
    // If this is calculating the current cycle and we have an actual end date, use it
    const useActualEndDate = actualEndDate && 
        moment(lastMenstrualPeriod).isSame(cycleData.lastStartDate, 'day');

    return {
        // Menstruation Phase (Days 0-5)
        menstruationStartDate: moment(lastMenstrualPeriod).format('YYYY-MM-DD'),
        menstruationEndDate: moment(lastMenstrualPeriod).add(periodLength, 'days').format('YYYY-MM-DD'),

        // Follicular Phase (Days 0-14)
        follicularStartDate: moment(lastMenstrualPeriod).format('YYYY-MM-DD'),
        follicularEndDate: moment(lastMenstrualPeriod).add(14, 'days').format('YYYY-MM-DD'),

        // Fertile window starts 5 days before ovulation
        fertileWindowStartDate: moment(lastMenstrualPeriod)
            .add(cycleLength / 2 - 5, 'days')
            .format('YYYY-MM-DD'),
        
        // Ovulation typically occurs around cycle day 14 (cycleLength / 2)
        ovulationDate: moment(lastMenstrualPeriod)
            .add(cycleLength / 2, 'days')
            .format('YYYY-MM-DD'),
        
        // Fertile window ends on ovulation day
        fertileWindowEndDate: moment(lastMenstrualPeriod)
            .add(cycleLength / 2, 'days')
            .format('YYYY-MM-DD'),

        // Luteal Phase (Days 15-28)
        lutealStartDate: moment(lastMenstrualPeriod).add(15, 'days').format('YYYY-MM-DD'),
        lutealEndDate: moment(lastMenstrualPeriod).add(cycleLength, 'days').format('YYYY-MM-DD'),

        // PMS starts 5 days before next period
        pmsStartDate: moment(lastMenstrualPeriod)
            .add(cycleLength - 5, 'days')
            .format('YYYY-MM-DD'),
        
        // Next period start
        periodStartDate: moment(lastMenstrualPeriod)
            .add(cycleLength, 'days')
            .format('YYYY-MM-DD'),
        
        // PMS ends when period starts
        pmsEndDate: moment(lastMenstrualPeriod)
            .add(cycleLength, 'days')
            .format('YYYY-MM-DD'),
        
        // Use actual end date if available and applicable
        periodEndDate: useActualEndDate ? 
            actualEndDate : 
            moment(lastMenstrualPeriod)
                .add(cycleLength + periodLength, 'days')
                .format('YYYY-MM-DD')
    };
};




/**
 * @param {object} currentCycle
 * @param {object} nextCycle
 * @returns {object} closestItem
 * 
 * @description
 * -   The function takes the currentCycle and nextCycle as input.
 * -   It then finds the closest date to the current date across the two cycles.
 * -   It returns the closest date.
*/
export const findClosestDate = (currentCycle, nextCycle) => {
    let currentDate = moment().format('YYYY-MM-DD');

    // Filter out past dates
    let currentCycleDates = Object.keys(currentCycle)
        .map(key => ({ key, value: currentCycle[key] }))
        .filter(item => moment(item.value).isSameOrAfter(currentDate, 'day'));

    let nextCycleDates = Object.keys(nextCycle)
        .map(key => ({ key, value: nextCycle[key] }))
        .filter(item => moment(item.value).isSameOrAfter(currentDate, 'day'));

    let allDates = currentCycleDates.concat(nextCycleDates);

    // Sort by date and get the closest future date
    let closestItem = allDates.sort((a, b) => 
        moment(a.value).diff(moment(currentDate)) - 
        moment(b.value).diff(moment(currentDate))
    )[0];

    return closestItem;
};




/**
 * @param {object} closestItem
 * @returns {string} message
 * 
 * @description
 * -   The function takes the closestItem as input.
 * -   It then returns the message based on the closest date.
 * -   It returns the message.
*/
export const getMessage = (closestItem) => {
    let currentDate = moment().format('YYYY-MM-DD');
    let closestDate = moment(closestItem.value);
    let dayCount = closestDate.diff(moment(currentDate), 'days');

    switch (closestItem.key) {
        case 'menstruationPhase':
            return {
                message: "You're in menstruation phase",
                days: dayCount,
                description: "Menstruation<br/>Phase (Days 1-5)",
                comments: [
                    'Period bleeding occurs',
                    'Hormone levels are low',
                    'May experience cramps and fatigue',
                    'Take care of your body'
                ]
            };

        case 'follicularPhase':
            return {
                message: "You're in follicular phase",
                days: dayCount,
                description: "Follicular<br/>Phase (Days 1-14)",
                comments: [
                    'Estrogen levels rising',
                    'Body preparing for ovulation',
                    'Energy levels increasing',
                    'Good time for exercise'
                ]
            };

        case 'fertileWindow':
            return {
                message: "You're in your fertile window",
                days: dayCount,
                description: "Fertile Window<br/>(Days 10-15)",
                comments: [
                    'Highest chance of pregnancy',
                    'Peak fertility period',
                    'Increased sex drive',
                    'Track cervical mucus changes'
                ]
            };

        case 'ovulationPhase':
            return {
                message: "You're in ovulation phase",
                days: dayCount,
                description: "Ovulation<br/>Phase (Day 14)",
                comments: [
                    'Egg release from ovary',
                    'Peak fertility day',
                    'May feel mild pain',
                    'Most energetic phase'
                ]
            };

        case 'lutealPhase':
            return {
                message: "You're in luteal phase",
                days: dayCount,
                description: "Luteal<br/>Phase (Days 15-28)",
                comments: [
                    'Progesterone rises',
                    'May feel premenstrual symptoms',
                    'Body temperature increases',
                    'Energy levels may decrease'
                ]
            };

        case 'pmsPhase':
            return {
                message: "You're experiencing PMS",
                days: dayCount,
                description: "PMS<br/>(Days 21-28)",
                comments: [
                    'Mood changes common',
                    'May experience bloating',
                    'Breast tenderness possible',
                    'Practice self-care'
                ]
            };

        // Keep existing cases but update their content
        case 'fertileWindowStartDate':
            return {
                message: `Fertile window begins in ${dayCount} days`,
                days: dayCount,
                description: "Approaching<br/>Fertile Window",
                comments: [
                    'Prepare for fertility peak',
                    'Track ovulation signs',
                    'Optimal for conception',
                    'Energy levels rising'
                ]
            };

        // ...other existing cases with updated messaging...

        default:
            return {
                message: "Tracking your cycle",
                days: 0,
                description: "Cycle<br/>Monitoring",
                comments: [
                    'Keep tracking symptoms',
                    'Monitor your patterns',
                    'Stay healthy and active',
                    'Contact doctor if concerned'
                ]
            };
    }
};



