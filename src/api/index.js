
import axios from 'axios';
import { useRoute } from 'vue-router';

let token;

export const getBasicData = () => {
    return {
        data: {
            id: '1',
            firstName: 'Jane',
            lastName: 'Doe',
            email: localStorage.getItem('email'),
            dob: '1990-01-01',

            cycleLength: Number(localStorage.getItem('last_cycle_regular')),                    // Length of menstrual cycle in days
            periodLength: Number(localStorage.getItem('duration_period')),                    // Length of period in days (bleeding days)
            lastMenstrualPeriod: localStorage.getItem('last_period_start'),  // Start date of last period
            frequency: 'regular',               // 'regular' | 'irregular'

            createdAt: '2020-01-01',
            updatedAt: '2020-01-01'
        }
    }
    //     data: {
    //         id: '1',
    //         firstName: 'Jane',
    //         lastName: 'Doe',
    //         email: localStorage.getItem('email'),
    //         dob: '1990-01-01',

    //         cycleLength: 28,                    // Length of menstrual cycle in days
    //         periodLength: 6,                    // Length of period in days (bleeding days)
    //         lastMenstrualPeriod: 2024-5-9,  // Start date of last period
    //         frequency: 'regular',               // 'regular' | 'irregular'

    //         createdAt: '2020-01-01',
    //         updatedAt: '2020-01-01'
    //     }
    // }
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

export const Getnote = async () => {
    try {
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('aura-token='));
      if (!tokenCookie) {
        throw new Error('No token found in cookie');
      }
      const token = tokenCookie.split('=')[1];
      const res = await axios.get(`${import.meta.env.VITE_APP_AURA_API_URL}/notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  };


export const personaldetails = async () => {
    try {
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('aura-token='));
      if (!tokenCookie) {
        throw new Error('No token found in cookie');
      }
      const token = tokenCookie.split('=')[1];
      const res = await axios.post(`${import.meta.env.VITE_APP_AURA_API_URL}users/personaldetails`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
        token = res.data.Token
        return res;
    } catch (error) {
        // console.log(error);
        return error.response;
    }
};


export const deleteNote = async (noteId) => {
    try {
        const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('aura-token='));
      if (!tokenCookie) {
        throw new Error('No token found in cookie');
      }
      const token = tokenCookie.split('=')[1];
      const res = await axios.delete(`${import.meta.env.VITE_APP_AURA_API_URL}/notes/${noteId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      return res;
    } catch (error) {
      return error;
    }
  };




export const userVerify = async (user) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_AURA_API_URL}/users/verify`, user);
        // console.log(res.data)
        return res;

    } catch (error) {
        // console.log(error);
        return error;
    }
};
export const resendotp = async (user) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_AURA_API_URL}/users/otpresend`, user);
        // console.log(res)
        return res;

    } catch (error) {
        // console.log(error);
        return error;
    }
};

export const userdetail = async (user) => {
    try {
        const cookies = document.cookie.split(';');
        const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('aura-token='));
        if (!tokenCookie) {
            throw new Error('No token found in cookie');
        }
        const token = tokenCookie.split('=')[1];

        const res = await axios.post(`${import.meta.env.VITE_APP_AURA_API_URL}/users/userdetail`, user, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(res.headers);
        // console.log(res.data);
        return res.data;
    } catch (error) {
        // console.log(error);
        return error;
    }
};

export const forgotPassword = async (user) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_AURA_API_URL}/users/forgotPassword`, user);
        // console.log(res)
        return res;

    } catch (error) {
        // console.log(error);
        return error;
    }
};



export const resetpassword = async (user) => {
    try {
        // // Assuming the URL is stored in a variable named url
        const url = window.location.href;

        // // Define a regex pattern to match the token parameter in the URL
        const tokenPattern = /token=([^&]+)/;

        // // Use the regex pattern to extract the token from the URL
        const match = url.match(tokenPattern);

        // // Check if a match is found and extract the token value
        const token = match ? match[1] : null;


    if(token){
        const res = await axios.post(`${import.meta.env.VITE_APP_AURA_API_URL}/users/reset-password/${token}`, user);
        // console.log(res)
        return res;
    }
    else{
        window.location.href = '/404';  
    }

    } catch (error) {
        // console.log(error);
        return error;
    }
};

export const deleteAccount = async (user) => {
    try {
        const cookies = document.cookie.split(';');
        const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('aura-token='));
        if (!tokenCookie) {
            throw new Error('No token found in cookie');
        }
        const token = tokenCookie.split('=')[1];

        const res = await axios.post(`${import.meta.env.VITE_APP_AURA_API_URL}/users/delete-account`, user, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(res.headers);
        // console.log(res.data);
        return res;
    } catch (error) {
        // console.log(error);
        return error;
    }
};

export const Newnote = async (user) => {
    try {
        const cookies = document.cookie.split(';');
        const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('aura-token='));
        if (!tokenCookie) {
            throw new Error('No token found in cookie');
        }
        const token = tokenCookie.split('=')[1];

        const res = await axios.post(`${import.meta.env.VITE_APP_AURA_API_URL}/notes/add`, user, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res.headers);
        console.log(res.data);
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getDoctorsList = async()=>{
    let data = [
        {
            Name: 'Dr. Shemmy raj',
            Department:  'Gynaecologist',
            Hospital: 'N S S MEDICAL MISSION HOSPITAL, PERUNNA, CHANGANACHERRY',
        },
        {
            Name: 'Dr. Thankappan raj',
            Department:  'Gynaecologist',
            Hospital: 'N S S MEDICAL MISSION HOSPITAL, PERUNNA, CHANGANACHERRY',
        },
        {
            Name: 'Dr. Rajesh raj',
            Department:  'Gynaecologist',
            Hospital: 'N S S MEDICAL MISSION HOSPITAL, PERUNNA, CHANGANACHERRY',
        },
        {
            Name: 'Dr. Shashikala',
            Department:  'General surgeon',
            Hospital: 'N S S MEDICAL MISSION HOSPITAL, PERUNNA, CHANGANACHERRY',
        },
        {
            Name: 'Dr. Sushamma',
            Department:  'General surgeon',
            Hospital: 'N S S MEDICAL MISSION HOSPITAL, PERUNNA, CHANGANACHERRY',
        },
    ]

    return data;
};
export const getpatientList = async()=>{
    let data = [
        {
            Name: 'Saabu',
            Department:  'Gynaecologist',
            mode: 'audio call',
            time: '30/04/2024 12:30 PM'
        },
        {
            Name: 'taakol karan',
            Department:  'Gynaecologist',
            mode: 'audio call',
            time: '30/04/2024 12:00 PM'

        },
        {
            Name: 'pappuraajan',
            Department:  'Gynaecologist',
            mode: 'audio call',
            time: '30/04/2024 12:40 PM'
        },
        {
            Name: 'Shashikala',
            Department:  'General surgeon',
            mode: 'vedio call',
            time: '30/04/2024 12:00 PM'
        },
        {
            Name: 'shikari shambu',
            Department:  'General surgeon',
            mode: 'vedio call',
            time: '30/04/2024 12:00 PM'
        },
    ]

    return data;
};

