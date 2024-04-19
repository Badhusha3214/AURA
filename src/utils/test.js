import moment from 'moment';

/**
 * @param {string} lastMenstrualPeriod
 * @param {number} cycleLength
 * @param {number} periodLength
 * @returns {object} menstrualCycle
 *
 * @description
 * - The function takes the lastMenstrualPeriod, cycleLength and periodLength as input.
 * - It then calculates the menstrual cycle based on the input, by calling the calculateMenstrualCycles function.
 * - It returns the menstrual cycle.
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

  return menstrualCycle;
};

/**
 * @param {string} lastMenstrualPeriod
 * @param {number} cycleLength
 * @param {number} periodLength
 * @returns {object} menstrualCycle
 *
 * @description
 * - The function takes the lastMenstrualPeriod, cycleLength and periodLength as input.
 * - It then it calculates all the important dates of the menstrual cycle.
 * - It returns the dates of the menstrual cycle in an object.
 */
export const getMenstrualCycle = (lastMenstrualPeriod, cycleLength, periodLength) => {
  return {
    fertileWindowStartDate: moment(lastMenstrualPeriod).add(cycleLength / 2 - 5, 'days').format('YYYY-MM-DD'),
    ovulationDate: moment(lastMenstrualPeriod).add(cycleLength / 2, 'days').format('YYYY-MM-DD'),
    fertileWindowEndDate: moment(lastMenstrualPeriod).add(cycleLength / 2, 'days').format('YYYY-MM-DD'),
    pmsStartDate: moment(lastMenstrualPeriod).add(cycleLength - 5, 'days').format('YYYY-MM-DD'),
    periodStartDate: moment(lastMenstrualPeriod).add(cycleLength, 'days').format('YYYY-MM-DD'),
    pmsEndDate: moment(lastMenstrualPeriod).add(cycleLength, 'days').format('YYYY-MM-DD'),
    periodEndDate: moment(lastMenstrualPeriod).add(cycleLength + periodLength, 'days').format('YYYY-MM-DD'),
  };
};

/**
 * @param {object} currentCycle
 * @param {object} nextCycle
 * @returns {object} closestItem
 *
 * @description
 * - The function takes the currentCycle and nextCycle as input.
 * - It then finds the closest date to the current date across the two cycles.
 * - It returns the closest date.
 */
export const findClosestDate = (currentCycle, nextCycle) => {
  let currentDate = moment().format('YYYY-MM-DD');

  let currentCycleDates = Object.keys(currentCycle).map((key) => ({ key, value: currentCycle[key] }));
  let nextCycleDates = Object.keys(nextCycle).map((key) => ({ key, value: nextCycle[key] }));

  let allDates = currentCycleDates.concat(nextCycleDates);

  let closestItem = allDates.reduce((a, b) => (moment(a.value).isAfter(currentDate) ? a : b));

  return closestItem;
};

/**
 * @param {object} closestItem
 * @returns {string} message
 *
 * @description
 * - The function takes the closestItem as input.
 * - It then returns the message based on the closest date.
 * - It returns the message.
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
        comments: ['High chance to get pregnant.'],
      };

    case 'ovulationDate':
      return {
        message: `You might ovulate in ${moment(closestDate).diff(currentDate, 'days')} days`,
        days: moment(closestDate).diff(currentDate, 'days'),
        description: 'You might be<br/>in Ovulation Phase',
        comments: [
          'You might experience ovulation pain, etc.',
          'High chance to get pregnant..',
        ],
      };

    case 'fertileWindowEndDate':
      return {
        message: `Your fertile window ends in ${moment(closestDate).diff(currentDate, 'days')} days`,
        days: moment(closestDate).diff(currentDate, 'days'),
        description: 'Your Fertile<br/>Window Ends in',
        comments: ['High chance to get pregnant..'],
      };

    case 'pmsStartDate':
      return {
        message: `Your PMS starts in ${moment(closestDate).diff(currentDate, 'days')} days`,
        days: moment(closestDate).diff(currentDate, 'days'),
        description: 'You might<br/>experience PMS in',
        comments: [
          'You might experience mood swings, bloating, etc.',
          'Low chance to get pregnant',
        ],
      };

    case 'periodStartDate':
      return {
        message: `Your period starts in ${moment(closestDate).diff(currentDate, 'days')} days`,
        days: moment(closestDate).diff(currentDate, 'days'),
        description: 'Your Period<br/>Starts in',
        comments: [
          'You might experience cramps, mood swings, etc.',
          'Medium chance to get pregnant',
        ],
      };

    case 'pmsEndDate':
      return {
        message: `Your PMS ends in ${moment(closestDate).diff(currentDate, 'days')} days`,
        days: moment(closestDate).diff(currentDate, 'days'),
        description: 'You might<br/>experience PMS in',
        comments: [
          'You might experience mood swings, bloating, etc.',
          'Low chance to get pregnant',
        ],
      };

    case 'periodEndDate':
      return {
        message: `Your period ends in ${moment(closestDate).diff(currentDate, 'days')} days`,
        days: moment(closestDate).diff(currentDate, 'days'),
        description: 'Your Period<br/>Ends in',
        comments: [
          'You might experience cramps, mood swings, etc.',
          'Medium chance to get pregnant',
        ],
      };

    default:
      return `Your next cycle starts in ${moment(closestDate).diff(currentDate, 'days')} days`;
  }
};

/**
 * @param {string} lastMenstrualPeriod
 * @returns {object} menstrualCycle
 *
 * @description
 * - The function takes the lastMenstrualPeriod as input.
 * - It calculates the cycle length and period length based on the user's previous cycles.
 * - It then calculates the menstrual cycle based on the input, by calling the calculateMenstrualCycles function.
 * - It returns the menstrual cycle.
 */
export const calculateMenstrualCyclesWithHistory = (lastMenstrualPeriod) => {
  // Fetch the user's previous cycle history from a database or local storage
  let previousCycleHistory = getUserCycleHistory();

  // Calculate the average cycle length and period length from the history
  let averageCycleLength = calculateAverageCycleLength(previousCycleHistory);
  let averagePeriodLength = calculateAveragePeriodLength(previousCycleHistory);

  // Call the original calculateMenstrualCycles function with the calculated values
  return calculateMenstrualCycles(lastMenstrualPeriod, averageCycleLength, averagePeriodLength);
};

/**
 * @param {array} cycleHistory
 * @returns {number} averageCycleLength
 *
 * @description
 * - The function takes the user's previous cycle history as input.
 * - It calculates the average cycle length from the history.
 * - It returns the average cycle length.
 */
export const calculateAverageCycleLength = (cycleHistory) => {
  let totalCycleLength = cycleHistory.reduce((sum, cycle) => sum + cycle.cycleLength, 0);
  return Math.round(totalCycleLength / cycleHistory.length);
};

/**
 * @param {array} cycleHistory
 * @returns {number} averagePeriodLength
 *
 * @description
 * - The function takes the user's previous cycle history as input.
 * - It calculates the average period length from the history.
 * - It returns the average period length.
 */
export const calculateAveragePeriodLength = (cycleHistory) => {
  let totalPeriodLength = cycleHistory.reduce((sum, cycle) => sum + cycle.periodLength, 0);
  return Math.round(totalPeriodLength / cycleHistory.length);
};

/**
 * @returns {array} cycleHistory
 *
 * @description
 * - The function fetches the user's previous cycle history from a database or local storage.
 * - It returns the cycle history.
 */
export const getUserCycleHistory = () => {
  // Fetch the user's previous cycle history from a database or local storage
  // and return it as an array of menstrual cycle objects
  return [
    { lastMenstrualPeriod: '2023-03-01', cycleLength: 28, periodLength: 5 },
    { lastMenstrualPeriod: '2023-04-01', cycleLength: 30, periodLength: 6 },
    { lastMenstrualPeriod: '2023-05-01', cycleLength: 29, periodLength: 4 },
  ];
};



// ----------------------------------------pc page----------------------------------

// // in your Vue.js component
// export default {
//     mounted() {
//       this.checkDeviceType();
//     },
//     methods: {
//       checkDeviceType() {
//         // Check if the user is using a mobile device
//         const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
//         if (isMobile) {
//           // Redirect to the "/" route if the user is on a mobile device
//           this.$router.push('/');
//         } else {
//           // Redirect to a different page if the user is on a PC
//           this.$router.push('/pcview');
//         }
//       }
//     }
//   }