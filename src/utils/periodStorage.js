import moment from 'moment';

const PERIOD_DATA_KEY = 'periodData';

// Get period data from localStorage
export const getPeriodData = () => {
  try {
    const periodData = localStorage.getItem('periodData');
    if (periodData) {
      return JSON.parse(periodData);
    }
    return {
      periods: [],
      cycleLength: 28,
      averagePeriodLength: 5
    };
  } catch (error) {
    console.error('Error getting period data:', error);
    return {
      periods: [],
      cycleLength: 28,
      averagePeriodLength: 5
    };
  }
};

// Save period data to localStorage with proper tracking of all fields
export const savePeriodData = (periodData) => {
  try {
    const data = getPeriodData();
    
    // Check if it's a new period or updating an existing one
    if (periodData.startDate) {
      // Log the data being saved to validate all fields
      console.log('Saving period data to localStorage:', JSON.stringify(periodData, null, 2));
      
      // It's an individual period, find and update or add new
      const existingIndex = data.periods.findIndex(p => 
        p.startDate === periodData.startDate
      );
      
      if (existingIndex !== -1) {
        // Update existing period
        data.periods[existingIndex] = {
          ...data.periods[existingIndex],
          ...periodData,
          // Ensure these arrays are preserved if not in the new data
          moods: periodData.moods || data.periods[existingIndex].moods || [],
          bleedingLevels: periodData.bleedingLevels || data.periods[existingIndex].bleedingLevels || [],
          allDates: periodData.allDates || data.periods[existingIndex].allDates || []
        };
      } else {
        // Add new period with all required fields initialized
        data.periods.push({
          ...periodData,
          moods: periodData.moods || [],
          bleedingLevels: periodData.bleedingLevels || [],
          allDates: periodData.allDates || []
        });
      }
      
      // If there's an end date, calculate the actual period length
      if (periodData.endDate && periodData.startDate) {
        const startDate = new Date(periodData.startDate);
        const endDate = new Date(periodData.endDate);
        const actualPeriodLength = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
        
        // Update average period length
        const completedPeriods = data.periods.filter(p => p.startDate && p.endDate);
        const totalLength = completedPeriods.reduce((sum, period) => {
          const start = new Date(period.startDate);
          const end = new Date(period.endDate);
          return sum + (Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1);
        }, 0);
        
        data.averagePeriodLength = Math.round(totalLength / completedPeriods.length);
      }
      
      // Calculate the average cycle length if we have more than one period
      if (data.periods.length > 1) {
        // Sort periods by start date
        data.periods.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
        
        // Calculate cycle lengths
        const cycleLengths = [];
        for (let i = 1; i < data.periods.length; i++) {
          const prevStart = new Date(data.periods[i-1].startDate);
          const currStart = new Date(data.periods[i].startDate);
          cycleLengths.push(Math.floor((currStart - prevStart) / (1000 * 60 * 60 * 24)));
        }
        
        // Calculate average cycle length
        if (cycleLengths.length > 0) {
          data.cycleLength = Math.round(cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length);
        }
      }
    } else {
      // It's the full period data object
      localStorage.setItem('periodData', JSON.stringify(periodData));
      return;
    }
    
    localStorage.setItem('periodData', JSON.stringify(data));
    console.log('Complete period data saved:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving period data:', error);
  }
};

// Utility to verify what data is being stored
export const debugStoredPeriodData = () => {
  try {
    const data = getPeriodData();
    console.log('Current stored period data:', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Error retrieving stored period data:', error);
    return null;
  }
};

// Get monthly analytics data for the calendar view
export const getMonthlyAnalytics = () => {
  try {
    const data = getPeriodData();
    const monthlyData = {};
    
    // Process each period to generate monthly data
    data.periods.forEach(period => {
      if (!period.startDate) return;
      
      const startDate = new Date(period.startDate);
      const endDate = period.endDate ? new Date(period.endDate) : new Date(startDate);
      
      // Generate all dates between start and end
      const allDates = period.allDates || [];
      if (allDates.length === 0 && period.endDate) {
        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
          allDates.push(new Date(currentDate).toISOString().split('T')[0]);
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
      
      // Organize by month and year
      allDates.forEach(dateStr => {
        const date = new Date(dateStr);
        const yearMonth = `${date.getFullYear()}-${date.getMonth() + 1}`;
        
        if (!monthlyData[yearMonth]) {
          monthlyData[yearMonth] = {
            periodDates: [],
            symptoms: []
          };
        }
        
        // Add the day to period dates if not already included
        const day = date.getDate();
        if (!monthlyData[yearMonth].periodDates.includes(day)) {
          monthlyData[yearMonth].periodDates.push(day);
        }
      });
      
      // Add symptoms (moods and bleeding levels)
      period.moods?.forEach(mood => {
        const moodDate = new Date(mood.date);
        const yearMonth = `${moodDate.getFullYear()}-${moodDate.getMonth() + 1}`;
        
        if (!monthlyData[yearMonth]) {
          monthlyData[yearMonth] = {
            periodDates: [],
            symptoms: []
          };
        }
        
        monthlyData[yearMonth].symptoms.push({
          type: 'mood',
          date: moodDate.getDate(),
          value: mood.note
        });
      });
      
      period.bleedingLevels?.forEach(bleeding => {
        const bleedingDate = new Date(bleeding.date);
        const yearMonth = `${bleedingDate.getFullYear()}-${bleedingDate.getMonth() + 1}`;
        
        if (!monthlyData[yearMonth]) {
          monthlyData[yearMonth] = {
            periodDates: [],
            symptoms: []
          };
        }
        
        monthlyData[yearMonth].symptoms.push({
          type: 'bleeding',
          date: bleedingDate.getDate(),
          value: bleeding.level
        });
      });
    });
    
    return monthlyData;
  } catch (error) {
    console.error('Error generating monthly analytics:', error);
    return {};
  }
};

// New function to sync API period data with local storage
export const syncPeriodDataFromAPI = (apiData) => {
  try {
    if (!apiData || !apiData.periods) {
      return;
    }
    
    const existingData = getPeriodData();
    
    // Update periods from API data
    const periods = apiData.periods.map(period => {
      // Find if we have this period already in local storage
      const existingPeriod = existingData.periods.find(p => 
        p.startDate === period.startDate
      );
      
      // Convert period format
      return {
        startDate: period.startDate,
        endDate: period.endDate,
        // Keep any existing allDates or calculate them
        allDates: existingPeriod?.allDates || calculateAllDates(period.startDate, period.endDate),
        // Preserve or initialize tracking data
        bleedingLevels: period.bleedingLevels || existingPeriod?.bleedingLevels || [],
        moods: period.moods || existingPeriod?.moods || []
      };
    });
    
    // Calculate average cycle length
    let cycleLength = apiData.last_cycle_regular || existingData.cycleLength || 28;
    
    // Calculate average period length
    let periodLength = apiData.duration_period || existingData.averagePeriodLength || 5;
    
    // Create data object
    const data = {
      periods,
      cycleLength,
      averagePeriodLength: periodLength
    };
    
    // Save to local storage
    localStorage.setItem('periodData', JSON.stringify(data));
    return data;
  } catch (error) {
    console.error('Error syncing period data from API:', error);
  }
};

// Helper to calculate all dates between start and end
function calculateAllDates(startDate, endDate) {
  if (!startDate || !endDate) return [];
  
  const allDates = [];
  const currentDate = new Date(startDate);
  const end = new Date(endDate);
  
  while (currentDate <= end) {
    allDates.push(new Date(currentDate).toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return allDates;
}

// Add function to calculate cycle statistics for graphs
export const getCycleStatistics = (periods) => {
  if (!periods || periods.length === 0) {
    return {
      averageCycleLength: 28,
      averagePeriodLength: 5,
      shortestCycle: 28,
      longestCycle: 28,
      cycleRegularity: 'regular'
    };
  }
  
  // Sort periods by date
  const sortedPeriods = [...periods].sort((a, b) => 
    new Date(a.startDate) - new Date(b.startDate)
  );
  
  // Calculate cycle lengths between consecutive periods
  const cycleLengths = [];
  for (let i = 1; i < sortedPeriods.length; i++) {
    const prevStart = new Date(sortedPeriods[i-1].startDate);
    const currStart = new Date(sortedPeriods[i].startDate);
    const cycleLength = Math.round((currStart - prevStart) / (1000 * 60 * 60 * 24));
    if (cycleLength > 0 && cycleLength < 100) { // Filter out unrealistic values
      cycleLengths.push(cycleLength);
    }
  }
  
  // Calculate period lengths for each period
  const periodLengths = sortedPeriods.map(period => {
    if (period.endDate && period.startDate) {
      const start = new Date(period.startDate);
      const end = new Date(period.endDate);
      return Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
    }
    return null;
  }).filter(length => length !== null);
  
  // Calculate statistics
  const averageCycleLength = cycleLengths.length > 0 ? 
    Math.round(cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length) : 28;
  
  const averagePeriodLength = periodLengths.length > 0 ? 
    Math.round(periodLengths.reduce((a, b) => a + b, 0) / periodLengths.length) : 5;
  
  const shortestCycle = cycleLengths.length > 0 ? 
    Math.min(...cycleLengths) : averageCycleLength;
  
  const longestCycle = cycleLengths.length > 0 ? 
    Math.max(...cycleLengths) : averageCycleLength;
  
  // Determine regularity (if max difference is more than 7 days, consider irregular)
  const cycleRegularity = (longestCycle - shortestCycle) > 7 ? 'irregular' : 'regular';
  
  return {
    averageCycleLength,
    averagePeriodLength,
    shortestCycle,
    longestCycle,
    cycleRegularity,
    cycleLengths,
    periodLengths
  };
};

// Save API response data to localStorage
export const saveApiDataToLocalStorage = (apiData) => {
  try {
    if (!apiData) return null;
    
    console.log('Saving API data to localStorage:', apiData);
    
    // Create a structured period data object from API data
    const periodData = {
      periods: [],
      cycleLength: apiData.last_cycle_regular || 28,
      averagePeriodLength: apiData.duration_period || 5
    };
    
    // Process periods data if available
    if (apiData.periods && Array.isArray(apiData.periods)) {
      periodData.periods = apiData.periods.map(period => {
        // Calculate all dates between start and end date if both exist
        let allDates = [];
        if (period.startDate && period.endDate) {
          const startDate = new Date(period.startDate);
          const endDate = new Date(period.endDate);
          const currentDate = new Date(startDate);
          
          while (currentDate <= endDate) {
            allDates.push(new Date(currentDate).toISOString().split('T')[0]);
            currentDate.setDate(currentDate.getDate() + 1);
          }
        }
        
        return {
          startDate: period.startDate,
          endDate: period.endDate || null,
          allDates: allDates,
          moods: period.moods || [],
          bleedingLevels: period.bleedingLevels || []
        };
      });
    } 
    // Process legacy period_dates format if no periods array
    else if (apiData.period_dates && Array.isArray(apiData.period_dates)) {
      apiData.period_dates.forEach(monthlyData => {
        const month = parseInt(monthlyData.period_month);
        const year = parseInt(monthlyData.period_year);
        
        // Get period days
        let periodDates = [];
        if (typeof monthlyData.period_dates === 'string') {
          periodDates = monthlyData.period_dates.split(',').map(d => parseInt(d.trim()));
        } else if (Array.isArray(monthlyData.period_dates)) {
          periodDates = monthlyData.period_dates.map(d => parseInt(d));
        }
        
        if (periodDates.length > 0) {
          // Create dates from period days
          const dates = periodDates.map(day => {
            return new Date(year, month, day).toISOString().split('T')[0];
          });
          
          // Add to periods array
          if (dates.length > 0) {
            periodData.periods.push({
              startDate: dates[0],
              endDate: dates[dates.length - 1],
              allDates: dates,
              moods: [],
              bleedingLevels: []
            });
          }
        }
      });
    }
    
    // Use last_period_start from API if available and periods array is empty
    if (periodData.periods.length === 0 && apiData.last_period_start) {
      periodData.periods.push({
        startDate: apiData.last_period_start,
        endDate: null,
        allDates: [apiData.last_period_start],
        moods: [],
        bleedingLevels: []
      });
    }
    
    // Save to local storage
    localStorage.setItem('periodData', JSON.stringify(periodData));
    console.log('Saved period data to localStorage:', periodData);
    
    return periodData;
  } catch (error) {
    console.error('Error saving API data to localStorage:', error);
    return null;
  }
};

// Function to initialize period data structure from enrollment information
export const initializePeriodDataFromEnrollment = () => {
  try {
    // Get data from localStorage
    const lastPeriodStart = localStorage.getItem('last_period_start');
    const cycleLength = localStorage.getItem('last_cycle_regular');
    const periodLength = localStorage.getItem('duration_period');
    
    if (!lastPeriodStart || !cycleLength || !periodLength) {
      console.log('Missing required data to initialize period data from enrollment');
      return null;
    }
    
    // Format date to ensure YYYY-MM-DD format
    let formattedStartDate = lastPeriodStart;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(lastPeriodStart)) {
      try {
        // Try to parse various date formats
        if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(lastPeriodStart)) {
          // Handle YYYY-M-D format with single digit month/day
          const [year, month, day] = lastPeriodStart.split('-');
          formattedStartDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        } else {
          // Other formats (MM/DD/YYYY, etc.)
          const date = new Date(lastPeriodStart);
          formattedStartDate = date.toISOString().split('T')[0];
        }
      } catch (e) {
        console.error('Error formatting date:', e);
        return null;
      }
    }
    
    // Calculate end date
    const startDate = new Date(formattedStartDate);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + Number(periodLength) - 1);
    
    const endDateStr = endDate.toISOString().split('T')[0];
    
    // Generate all dates between start and end
    const allDates = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      allDates.push(new Date(currentDate).toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Create period data structure
    const periodData = {
      periods: [{
        startDate: formattedStartDate,
        endDate: endDateStr,
        allDates: allDates,
        moods: [],
        bleedingLevels: []
      }],
      cycleLength: Number(cycleLength),
      averagePeriodLength: Number(periodLength)
    };
    
    // Save to localStorage
    localStorage.setItem(PERIOD_DATA_KEY, JSON.stringify(periodData));
    console.log('Period data initialized from enrollment data:', periodData);
    
    return periodData;
  } catch (error) {
    console.error('Error initializing period data from enrollment:', error);
    return null;
  }
};
