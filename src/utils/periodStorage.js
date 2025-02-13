import moment from 'moment';

const PERIOD_DATA_KEY = 'periodData';

// Define all functions
const getPeriodData = () => {
    const data = localStorage.getItem(PERIOD_DATA_KEY);
    return data ? JSON.parse(data) : {
        periods: [],
        cycleLength: 28,
        averagePeriodLength: 5
    };
};

const calculateAveragePeriodLength = (periods) => {
    // Only consider completed periods (with both start and end dates)
    const validPeriods = periods.filter(p => {
        if (!p.startDate || !p.endDate) return false;
        const start = moment(p.startDate);
        const end = moment(p.endDate);
        return end.isSameOrAfter(start); // Only include if end date is after or same as start date
    });
    
    if (validPeriods.length === 0) {
        return 5; // Default if no valid periods
    }

    const lengths = validPeriods.map(period => {
        const start = moment(period.startDate);
        const end = moment(period.endDate);
        const length = end.diff(start, 'days') + 1; // Add 1 to include both start and end days
        return length > 0 ? length : 5; // Use default if calculation is invalid
    }).filter(length => length >= 1 && length <= 15); // Filter out unrealistic lengths

    if (lengths.length === 0) return 5;
    
    const total = lengths.reduce((sum, length) => sum + length, 0);
    return Math.round(total / lengths.length);
};

const calculateCycleLengths = (periods) => {
    if (periods.length < 2) return 28; // Default if not enough data

    const cycleLengths = [];
    for (let i = 1; i < periods.length; i++) {
        const prevStart = moment(periods[i-1].startDate);
        const currentStart = moment(periods[i].startDate);
        const cycleLength = currentStart.diff(prevStart, 'days');
        if (cycleLength > 0) {
            cycleLengths.push(cycleLength);
        }
    }

    if (cycleLengths.length === 0) return 28;
    const total = cycleLengths.reduce((sum, length) => sum + length, 0);
    return Math.round(total / cycleLengths.length);
};

const savePeriodData = (newPeriod) => {
    const data = getPeriodData();
    
    if (data.periods.length > 0) {
        const lastPeriod = data.periods[data.periods.length - 1];
        
        if (!lastPeriod.endDate && newPeriod.endDate) {
            // Validate end date is after start date
            const startDate = moment(lastPeriod.startDate);
            const endDate = moment(newPeriod.endDate);
            
            if (endDate.isSameOrAfter(startDate)) {
                lastPeriod.endDate = newPeriod.endDate;
                data.periods[data.periods.length - 1] = lastPeriod;
                
                // Calculate and update period length immediately
                const length = endDate.diff(startDate, 'days') + 1;
                data.averagePeriodLength = length;
            }
        } else if (!newPeriod.endDate) {
            data.periods.push(newPeriod);
        }
    } else {
        data.periods.push(newPeriod);
    }

    // Recalculate averages only for completed periods
    if (data.periods.some(p => p.endDate)) {
        data.averagePeriodLength = calculateAveragePeriodLength(data.periods);
    }

    localStorage.setItem(PERIOD_DATA_KEY, JSON.stringify(data));
    return data;
};

const getMonthlyAnalytics = () => {
    try {
        const data = getPeriodData();
        const monthlyData = {};
        
        if (!data.periods) return {};

        data.periods.forEach(period => {
            if (!period.startDate) return;
            
            const startDate = moment(period.startDate);
            const monthKey = `${startDate.year()}-${startDate.month() + 1}`;
            
            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = {
                    month: startDate.month() + 1,
                    year: startDate.year(),
                    periodDates: [],
                    cycleLength: data.cycleLength || 28,
                    periodLength: data.averagePeriodLength || 5,
                    symptoms: []
                };
            }
            
            // Calculate actual period length for this period
            let periodLength = 5; // default
            if (period.endDate) {
                const endDate = moment(period.endDate);
                periodLength = endDate.diff(startDate, 'days') + 1;
            }
            
            monthlyData[monthKey].periodLength = periodLength;
            
            // Add period dates
            let currentDate = startDate.clone();
            const endDate = period.endDate ? moment(period.endDate) : currentDate.clone().add(periodLength - 1, 'days');
            
            while (currentDate.isSameOrBefore(endDate)) {
                monthlyData[monthKey].periodDates.push(currentDate.date());
                currentDate.add(1, 'day');
            }
            
            // Add symptoms and moods
            if (period.bleedingLevels) {
                period.bleedingLevels.forEach(level => {
                    monthlyData[monthKey].symptoms.push({
                        date: new Date(level.date).getDate(),
                        type: 'bleeding',
                        level: level.level
                    });
                });
            }
            
            if (period.moods) {
                period.moods.forEach(mood => {
                    monthlyData[monthKey].symptoms.push({
                        date: new Date(mood.date).getDate(),
                        type: 'mood',
                        note: mood.note
                    });
                });
            }
        });
        
        return monthlyData;
    } catch (error) {
        console.error('Error in getMonthlyAnalytics:', error);
        return {};
    }
};

// Single export statement for all functions
export {
    getPeriodData,
    savePeriodData,
    getMonthlyAnalytics
};
