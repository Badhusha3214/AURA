
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
    @param {string} lastMenstrualPeriod     - Start date of last period
    @param {number} cycleLength             - Length of menstrual cycle in days
    @param {number} periodLength            - Length of period in days (bleeding days)
    @return {object}

    @description :
    Calculate the following:
        1. Next period start date
        2. Ovulation date
        3. Fertile window start date
        4. Fertile window end date
        5. Premenstrual syndrome (PMS) start date
        6. Premenstrual syndrome (PMS) end date

*/
export const calculateDates = (lastMenstrualPeriod, cycleLength) => {
        
    const nextPeriodStartDate = moment(lastMenstrualPeriod).add(cycleLength, 'days').format('YYYY-MM-DD');
    const ovulationDate = moment(lastMenstrualPeriod).add(cycleLength - 14, 'days').format('YYYY-MM-DD');
    const fertileWindowStartDate = moment(lastMenstrualPeriod).add(cycleLength - 19, 'days').format('YYYY-MM-DD');
    const fertileWindowEndDate = moment(lastMenstrualPeriod).add(cycleLength - 14, 'days').format('YYYY-MM-DD');
    const pmsStartDate = moment(lastMenstrualPeriod).add(cycleLength - 28, 'days').format('YYYY-MM-DD');
    const pmsEndDate = moment(lastMenstrualPeriod).add(cycleLength - 26, 'days').format('YYYY-MM-DD');
    
    return {
        nextPeriodStartDate,
        ovulationDate,
        fertileWindowStartDate,
        fertileWindowEndDate,
        pmsStartDate,
        pmsEndDate
    };

};


export const generateComments = (dates) => {

    const { nextPeriodStartDate, ovulationDate, fertileWindowStartDate, fertileWindowEndDate, pmsStartDate, pmsEndDate } = dates;

    const comments = {
        nextPeriodStartDate: {
            title: 'Next Period Start Date',
            description: 'Your Next<br/>Period Starts in',
            date: moment(nextPeriodStartDate).format('YYYY-MM-DD'),
            days: moment(nextPeriodStartDate).diff(moment(), 'days'),
            comments: [
                'Medium chance to get pregnant',
            ]
        },
        ovulationDate: {
            title: 'Ovulation Date',
            description: 'You might be<br/>in Ovulation Phase',
            date: moment(ovulationDate).format('YYYY-MM-DD'),
            days: moment(ovulationDate).diff(moment(), 'days'),
            comments: [
                'High chance to get pregnant.',
            ]
        },
        fertileWindowStartDate: {
            title: 'Fertile Window Start Date',
            description: 'Your Fertile<br/>Window Starts in',
            date: moment(fertileWindowStartDate).format('YYYY-MM-DD'),
            days: moment(fertileWindowStartDate).diff(moment(), 'days'),
            comments: [
                'High chance to get pregnant..',
            ]
        },
        fertileWindowEndDate: {
            title: 'Fertile Window End Date',
            description: 'Your Fertile<br/>Window Ends in',
            date: moment(fertileWindowEndDate).format('YYYY-MM-DD'),
            days: moment(fertileWindowEndDate).diff(moment(), 'days'),
            comments: [
                'High chance to get pregnant...',
            ]
        },
        pmsStartDate: {
            title: 'Premenstrual Syndrome (PMS) Start Date',
            description: 'You might<br/>experience PMS in',
            date: moment(pmsStartDate).format('YYYY-MM-DD'),
            days: moment(pmsStartDate).diff(moment(), 'days'),
            comments: [
                'Physical and emotional symptoms might occur.',
            ]
        },
        pmsEndDate: {
            title: 'Premenstrual Syndrome (PMS) End Date',
            description: 'You might<br/>experience PMS in',
            date: moment(pmsEndDate).format('YYYY-MM-DD'),
            days: moment(pmsEndDate).diff(moment(), 'days'),
            comments: [
                'Physical and emotional symptoms might occur.',
            ]
        },
        // free: {
        //     title: 'Free',
        //     description: 'You are free from<br/>PMS & fertility window',
        //     date: null,
        //     days: null,
        //     comments: [
        //         'Low chance to get pregnant.',
        //     ]
        // }
    };

    return comments;

};