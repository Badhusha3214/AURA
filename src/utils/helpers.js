
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




/*
    @param {string} lastMenstrualPeriod
    @param {number} cycleLength
    @param {number} periodLength
    @returns {object} menstrualCycle

    @description
    -   The function takes the lastMenstrualPeriod, cycleLength and periodLength as input.
    -   It then calculates the menstrual cycle based on the input, by calling the calculateMenstrualCycles function.
    -   It returns the menstrual cycle.
*/
export const calculateMenstrualCycles = (lastMenstrualPeriod, cycleLength, periodLength) => {

    let beforeLastMenstrualPeriod = moment(lastMenstrualPeriod).subtract(cycleLength, 'days').format('YYYY-MM-DD');

    let nextCycle = getMenstrualCycle(lastMenstrualPeriod, cycleLength, periodLength);
    let currentCycle = getMenstrualCycle(beforeLastMenstrualPeriod, cycleLength, periodLength);
    
    let menstrualCycle = {

        cycleLength: cycleLength,
        periodLength: periodLength,

        lastMenstrualPeriod: lastMenstrualPeriod,
        beforeLastMenstrualPeriod: beforeLastMenstrualPeriod,

        currentCycle: currentCycle,
        nextCycle: nextCycle,
        
    };

    // console.log(menstrualCycle);
    
    return menstrualCycle;

};




/*
    @param {string} lastMenstrualPeriod
    @param {number} cycleLength
    @param {number} periodLength
    @returns {object} menstrualCycle

    @description
    -   The function takes the lastMenstrualPeriod, cycleLength and periodLength as input.
    -   It then it calculates all the important dates of the menstrual cycle.
    -   It returns the dates of the menstrual cycle in an object.
*/
export const getMenstrualCycle = (lastMenstrualPeriod, cycleLength, periodLength) => {

    return {
        fertileWindowStartDate: moment(lastMenstrualPeriod).add(cycleLength / 2 - 5, 'days').format('YYYY-MM-DD'),
        ovulationDate: moment(lastMenstrualPeriod).add(cycleLength / 2, 'days').format('YYYY-MM-DD'),
        fertileWindowEndDate: moment(lastMenstrualPeriod).add(cycleLength / 2, 'days').format('YYYY-MM-DD'),
        
        pmsStartDate: moment(lastMenstrualPeriod).add(cycleLength - 5, 'days').format('YYYY-MM-DD'),
        periodStartDate: moment(lastMenstrualPeriod).add(cycleLength, 'days').format('YYYY-MM-DD'),
        pmsEndDate: moment(lastMenstrualPeriod).add(cycleLength, 'days').format('YYYY-MM-DD'),
        periodEndDate: moment(lastMenstrualPeriod).add(cycleLength + periodLength, 'days').format('YYYY-MM-DD')
    }

};




/*
    @param {object} currentCycle
    @param {object} nextCycle
    @returns {object} closestItem

    @description
    -   The function takes the currentCycle and nextCycle as input.
    -   It then finds the closest date to the current date across the two cycles.
    -   It returns the closest date.
*/
export const findClosestDate = (currentCycle, nextCycle) => {

    let currentDate = moment().format('YYYY-MM-DD');

    let currentCycleDates = Object.keys(currentCycle).map(key => ({ key, value: currentCycle[key] }));
    let nextCycleDates = Object.keys(nextCycle).map(key => ({ key, value: nextCycle[key] }));

    let allDates = currentCycleDates.concat(nextCycleDates);

    let closestItem = allDates.reduce((a, b) => moment(a.value).isAfter(currentDate) ? a : b);
    // console.log("closestItem: ", closestItem);
    
    return closestItem;

};




/*
    @param {object} closestItem
    @returns {string} message

    @description
    -   The function takes the closestItem as input.
    -   It then returns the message based on the closest date.
*/
export const getMessage = (closestItem) => {

    let currentDate = moment().format('YYYY-MM-DD');
    let closestDate = moment(closestItem.value).format('YYYY-MM-DD');

    switch (closestItem.key) {

        case 'fertileWindowStartDate':
            return {
                message: `Your fertile window opens in ${moment(closestDate).diff(currentDate, 'days')} days`,
                days: moment(closestDate).diff(currentDate, 'days'),
                description: 'Your Fertile<br/>Window Starts in',
                comments: [
                    'High chance to get pregnant.',
                ]
            }
        
        case 'ovulationDate':
            return {
                message: `You might ovulate in ${moment(closestDate).diff(currentDate, 'days')} days`,
                days: moment(closestDate).diff(currentDate, 'days'),
                description: 'You might be<br/>in Ovulation Phase',
                comments: [
                    'You might experience ovulation pain, etc.',
                    'High chance to get pregnant..',
                ]
            };

        case 'fertileWindowEndDate':
            return {
                message: `Your fertile window ends in ${moment(closestDate).diff(currentDate, 'days')} days`,
                days: moment(closestDate).diff(currentDate, 'days'),
                description: 'Your Fertile<br/>Window Ends in',
                comments: [
                    'High chance to get pregnant..',
                ]
            };

        case 'pmsStartDate':
            return {
                message: `Your PMS starts in ${moment(closestDate).diff(currentDate, 'days')} days`,
                days: moment(closestDate).diff(currentDate, 'days'),
                description: 'You might<br/>experience PMS in',
                comments: [
                    'You might experience mood swings, bloating, etc.',
                    'Low chance to get pregnant'
                ]
            };

        case 'periodStartDate':
            return {
                message: `Your period starts in ${moment(closestDate).diff(currentDate, 'days')} days`,
                days: moment(closestDate).diff(currentDate, 'days'),
                description: 'Your Period<br/>Starts in',
                comments: [
                    'You might experience cramps, mood swings, etc.',
                    'Medium chance to get pregnant'
                ]
            };

        case 'pmsEndDate':
            return {
                message: `Your PMS ends in ${moment(closestDate).diff(currentDate, 'days')} days`,
                days: moment(closestDate).diff(currentDate, 'days'),
                description: 'You might<br/>experience PMS in',
                comments: [
                    'You might experience mood swings, bloating, etc.',
                    'Low chance to get pregnant'
                ]
            };

        case 'periodEndDate':
            return {
                message: `Your period ends in ${moment(closestDate).diff(currentDate, 'days')} days`,
                days: moment(closestDate).diff(currentDate, 'days'),
                description: 'Your Period<br/>Ends in',
                comments: [
                    'You might experience cramps, mood swings, etc.',
                    'Medium chance to get pregnant'
                ]
            
            };
            
        default:
            return `Your next cycle starts in ${moment(closestDate).diff(currentDate, 'days')} days`;
    }

};



