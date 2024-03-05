
import axios from 'axios';



export const getBasicData = () => {
    return {
        data: {
            id: '123',
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane@company.com',
            dob: '1990-01-01',
    
            cycleLength: 28,                    // Length of menstrual cycle in days
            periodLength: 5,                    // Length of period in days (bleeding days)
            lastMenstrualPeriod: '2024-02-01',  // Start date of last period
            frequency: 'regular',               // 'regular' | 'irregular'
            
            createdAt: '2020-01-01',
            updatedAt: '2020-01-01'
        }
    }
};