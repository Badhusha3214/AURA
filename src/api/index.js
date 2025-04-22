import axios from 'axios';
import { useRoute } from 'vue-router';
import { saveApiDataToLocalStorage } from '@/utils/periodStorage';

let token;

export const getBasicData = async () => {
    try {
        const cookies = document.cookie.split(';');
        const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('aura-token='));
        if (!tokenCookie) {
            throw new Error('No token found in cookie');
        }
        const token = tokenCookie.split('=')[1];
        const response = await axios.get(`${import.meta.env.VITE_APP_AURA_API_URL}/user-analytics/getdata`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        return {
            data: {
                id: response.data.user_id || '1',
                firstName: response.data.user_name || '',
                lastName: '',
                email: response.data.email || '',
                dob: response.data.dob || '1990-01-01',
                cycleLength: Number(response.data.last_cycle_regular) || 28,
                periodLength: Number(response.data.duration_period) || 5,
                lastMenstrualPeriod: response.data.last_period_start,
                frequency: response.data.last_cycle_irregular ? 'irregular' : 'regular',
                createdAt: response.data.created_at || '2020-01-01',
                updatedAt: response.data.updated_at || '2020-01-01'
            }
        };
    } catch (error) {
        console.error('Error fetching basic data:', error);
        // Return default data in case of error
        return {
            data: {
                id: '1',
                firstName: '',
                lastName: '',
                email: '',
                dob: '1990-01-01',
                cycleLength: 28,
                periodLength: 5,
                lastMenstrualPeriod: null,
                frequency: 'regular',
                createdAt: '2020-01-01',
                updatedAt: '2020-01-01'
            }
        };
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


export const getdata = async () => {
    try {
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('aura-token='));
      if (!tokenCookie) {
        throw new Error('No token found in cookie');
      }
      const token = tokenCookie.split('=')[1];
      const res = await axios.get(`${import.meta.env.VITE_APP_AURA_API_URL}/user-analytics/getdata`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Save API data to localStorage automatically when received
      if (res && res.data) {
        saveApiDataToLocalStorage(res.data);
      }
      
      console.log('API data received and saved to localStorage:', res);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

export const alluser = async () => {
    try {
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('aura-token='));
      if (!tokenCookie) {
        throw new Error('No token found in cookie');
      }
      const token = tokenCookie.split('=')[1];
      const res = await axios.get(`${import.meta.env.VITE_APP_AURA_API_URL}/admin/all-users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    //   console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

export const graph = async () => {
    try {
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('aura-token='));
      if (!tokenCookie) {
        throw new Error('No token found in cookie');
      }
      const token = tokenCookie.split('=')[1];
      const res = await axios.get(`${import.meta.env.VITE_APP_AURA_API_URL}/admin/graph`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    //   console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
export const UserAppoinments = async () => {
    try {
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('aura-token='));
      if (!tokenCookie) {
        throw new Error('No token found in cookie');
      }
      const token = tokenCookie.split('=')[1];
      const res = await axios.get(`${import.meta.env.VITE_APP_AURA_API_URL}/appoinment/get-appoinments-users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    //   console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  };


export const admindata = async () => {
    try {
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('aura-token='));
      if (!tokenCookie) {
        throw new Error('No token found in cookie');
      }
      const token = tokenCookie.split('=')[1];
      const res = await axios.get(`${import.meta.env.VITE_APP_AURA_API_URL}/admin-analytics/userdata`, {
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

  export const getpatient = async () => {
    try {
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('aura-token='));
      if (!tokenCookie) {
        throw new Error('No token found in cookie');
      }
      const token = tokenCookie.split('=')[1];
      const res = await axios.get(`${import.meta.env.VITE_APP_AURA_API_URL}/appoinment/get-appoinments-doctor`, {
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


export const Newdate = async (data) => {
    try {
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('aura-token='));
      if (!tokenCookie) {
        throw new Error('No token found in cookie');
      }
      const token = tokenCookie.split('=')[1];
      const res = await axios.post(`${import.meta.env.VITE_APP_AURA_API_URL}/user-analytics/period-start`,data , {
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
export const appoinmentAccept = async (data) => {
    try {
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('aura-token='));
      if (!tokenCookie) {
        throw new Error('No token found in cookie');
      }
      const token = tokenCookie.split('=')[1];
      const res = await axios.post(`${import.meta.env.VITE_APP_AURA_API_URL}/appoinment/accept   `,data , {
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
export const rejectAppointment = async (data) => {
    try {
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('aura-token='));
      if (!tokenCookie) {
        throw new Error('No token found in cookie');
      }
      const token = tokenCookie.split('=')[1];
      const res = await axios.post(`${import.meta.env.VITE_APP_AURA_API_URL}/appoinment/reject`,data , {
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

export const takeappoinment = async (data) => {
    try {
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('aura-token='));
      if (!tokenCookie) {
        throw new Error('No token found in cookie');
      }
      const token = tokenCookie.split('=')[1];
      const res = await axios.post(`${import.meta.env.VITE_APP_AURA_API_URL}/appoinment/request`,data , {
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

export const amdoctor = async (data) => {
  try {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('aura-token='));
    if (!tokenCookie) {
      throw new Error('No token found in cookie');
    }
    const token = tokenCookie.split('=')[1];
    
    console.log('Sending doctor toggle request with data:', data);
    
    // Set specific headers and ensure proper content type
    const res = await axios.post(
      `${import.meta.env.VITE_APP_AURA_API_URL}/admin/permissionToggle`, 
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }
    );
    
    console.log('Doctor toggle API response:', res);
    
    // Store response data in localStorage if it's the current user
    const userEmail = localStorage.getItem('email');
    if (userEmail === data.email && res.data && res.status >= 200 && res.status < 300) {
      const isDoctor = res.data.is_doctor === true;
      localStorage.setItem('isdoctor', isDoctor.toString());
      console.log(`Updated local isdoctor status for current user to: ${isDoctor}`);
    }
    
    return res;
  } catch (error) {
    console.error('Error in amdoctor API call:', error);
    return {
      status: error.response?.status || 500,
      data: error.response?.data || { 
        message: error.message || 'Unknown error occurred',
        is_doctor: null
      },
      error: true
    };
  }
};

  export const appoinment = async (data) => {
    try {
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('aura-token='));
      if (!tokenCookie) {
        throw new Error('No token found in cookie');
      }
      const token = tokenCookie.split('=')[1];
      const res = await axios.post(`${import.meta.env.VITE_APP_AURA_API_URL}/appoinment/request`,data , {
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

  export const appoinmentCancl = async (data) => {
    try {
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('aura-token='));
      if (!tokenCookie) {
        throw new Error('No token found in cookie');
      }
      const token = tokenCookie.split('=')[1];
      const res = await axios.post(`${import.meta.env.VITE_APP_AURA_API_URL}/appoinment/cancel`,data , {
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



export const enddate = async (data) => {
    try {
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('aura-token='));
      if (!tokenCookie) {
        throw new Error('No token found in cookie');
      }
      const token = tokenCookie.split('=')[1];
      const res = await axios.post(`${import.meta.env.VITE_APP_AURA_API_URL}/user-analytics/period-end`,data , {
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

  export const personaldetails = async (data) => {
    try {
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('aura-token='));
      if (!tokenCookie) {
        throw new Error('No token found in cookie');
      }
      const token = tokenCookie.split('=')[1];
      const res = await axios.post(`${import.meta.env.VITE_APP_AURA_API_URL}/users/personaldetails`, data, {
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
        console.log('Creating new note with data:', user);
        const cookies = document.cookie.split(';');
        const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('aura-token='));
        if (!tokenCookie) {
            throw new Error('No token found in cookie');
        }
        const token = tokenCookie.split('=')[1];

        // Ensure the content field is properly set
        const payload = {
            title: user.title || 'Note',
            content: user.content || ''
        };

        const res = await axios.post(
            `${import.meta.env.VITE_APP_AURA_API_URL}/notes/add`, 
            payload, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }
        );
        
        console.log('Note creation response:', res);
        return res;
    } catch (error) {
        console.error('Error creating note:', error);
        // Return a structured error object for better error handling
        return {
            error: true,
            status: error.response?.status || 500,
            message: error.message || 'Failed to create note',
            details: error
        };
    }
};

export const getpatientList = async () => {
    try {
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('aura-token='));
      if (!tokenCookie) {
        throw new Error('No token found in cookie');
      }
      const token = tokenCookie.split('=')[1];
      const res = await axios.get(`${import.meta.env.VITE_APP_AURA_API_URL}/appoinment/get-appoinments-doctor`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Patient list from API:', res.data);
      
      if (res.data && res.data.appoinment) {
        return res.data.appoinment.map(appointment => ({
          Name: appointment.user_name,
          Department: 'Patient',
          mode: 'audio call', // This data might need to come from API
          time: new Date(appointment.appointment_time).toLocaleString(),
          appointment_id: appointment.appointment_id,
          appointment_status: appointment.appointment_status
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching patient list:', error);
      // Return fallback data in case of error
      return [];
    }
};

// Helper function to get token consistently
export const getAuthToken = () => {
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('aura-token='));
  if (!tokenCookie) {
    throw new Error('No token found in cookie');
  }
  return tokenCookie.split('=')[1];
};

// Function to add period start date
export const addPeriodStartDate = async (data) => {
  try {
    const token = getAuthToken();
    const res = await axios.post(
      `${import.meta.env.VITE_APP_AURA_API_URL}/user-analytics/period-start`,
      { start_date: data.start_date },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Period start date response:', res);
    return res;
  } catch (error) {
    console.error('Error adding period start date:', error);
    return error;
  }
};

// Function to add period end date
export const addPeriodEndDate = async (data) => {
  try {
    const token = getAuthToken();
    const res = await axios.post(
      `${import.meta.env.VITE_APP_AURA_API_URL}/user-analytics/period-end`,
      { end_date: data.end_date },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Period end date response:', res);
    return res;
  } catch (error) {
    console.error('Error adding period end date:', error);
    return error;
  }
};

// Function to add mood data
export const addMoodData = async (data) => {
  try {
    const token = getAuthToken();
    const res = await axios.post(
      `${import.meta.env.VITE_APP_AURA_API_URL}/user-analytics/add-mood`,
      {
        mood: data.mood,
        date: data.date || new Date().toISOString().split('T')[0]
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Mood data response:', res);
    return res;
  } catch (error) {
    console.error('Error adding mood data:', error);
    return error;
  }
};

// Function to add bleeding status - update to use the new endpoint
export const addBleedingStatus = async (data) => {
  try {
    const token = getAuthToken();
    const res = await axios.post(
      `${import.meta.env.VITE_APP_AURA_API_URL}/user-analytics/add-bleeding`,
      {
        level: data.status,
        date: data.date || new Date().toISOString().split('T')[0]
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Bleeding status response:', res);
    return res;
  } catch (error) {
    console.error('Error adding bleeding status:', error);
    return error;
  }
};

// Function to save cycle data to the database
export const saveCycleDataToAPI = async (cycleData) => {
  try {
    const token = getAuthToken();
    const res = await axios.post(
      `${import.meta.env.VITE_APP_AURA_API_URL}/user-analytics/save-cycle-data`,
      { cycleData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }
    );
    console.log('Cycle data saved to API:', res);
    return res;
  } catch (error) {
    console.error('Error saving cycle data to API:', error);
    return {
      error: true,
      message: error.message || 'Failed to save cycle data',
      details: error
    };
  }
};

// Function to get cycle data from the database
export const getCycleDataFromAPI = async () => {
  try {
    const token = getAuthToken();
    const res = await axios.get(
      `${import.meta.env.VITE_APP_AURA_API_URL}/user-analytics/get-cycle-data`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    );
    console.log('Cycle data retrieved from API:', res);
    return res;
  } catch (error) {
    console.error('Error getting cycle data from API:', error);
    return {
      error: true,
      message: error.message || 'Failed to get cycle data',
      details: error
    };
  }
};

export const checkIsDoctor = async () => {
  try {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('aura-token='));
    if (!tokenCookie) {
      throw new Error('No token found in cookie');
    }
    const token = tokenCookie.split('=')[1];
    const res = await axios.get(`${import.meta.env.VITE_APP_AURA_API_URL}/users/is-doctor`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data?.isDoctor === true;
  } catch (error) {
    console.error('Error checking doctor status:', error);
    return false;
  }
};

export const getAppointmentHistory = async () => {
  try {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('aura-token='));
    if (!tokenCookie) {
      throw new Error('No token found in cookie');
    }
    const token = tokenCookie.split('=')[1];
    const res = await axios.get(`${import.meta.env.VITE_APP_AURA_API_URL}/users/appointment-history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data?.appointments || [];
  } catch (error) {
    console.error('Error fetching appointment history:', error);
    return [];
  }
};

