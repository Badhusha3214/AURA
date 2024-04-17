
import axios from 'axios';



export const getBasicData = () => {
    return {
        data: {
            id: '123',
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane@company.com',
            dob: '1990-01-01',
    
            cycleLength: 31,                    // Length of menstrual cycle in days
            periodLength: 8,                    // Length of period in days (bleeding days)
            lastMenstrualPeriod: '2024-04-02',  // Start date of last period
            frequency: 'regular',               // 'regular' | 'irregular'
            
            createdAt: '2020-01-01',
            updatedAt: '2020-01-01'
        }
    }
};



export const userRegister = async (user) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_AURA_API_URL}/users/register`, user);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        return error;   
    }
};



export const userLogin = async (user) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_AURA_API_URL}/users/login`, user);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};




export const userVerify = async (user) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_AURA_API_URL}/users/verify`, user);
        console.log(res.data)
        return res;
        
    } catch (error) {
        console.log(error);
        return error;
    }
};
export const resendotp = async (user) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_AURA_API_URL}/users/otpresend`, user);
        console.log(res)
        return res;
        
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const userdetail = async (user) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_AURA_API_URL}/users/userdetail`, user);
        { headers: { Authorization: `Bearer ${aura-token}` } }       
        console.log(token);
        console.log(res)
        return res;
        
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const forgotPassword = async (user) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_AURA_API_URL}/users/forgotPassword`, user);
        console.log(res)
        return res;
        
    } catch (error) {
        console.log(error);
        return error;
    }
};

