<template>
   <div v-if="doctors.length > 0">
    <div v-for="doctor in doctors" :key="doctor.id">
      <!-- Doctor card template -->
      <div
        class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between"
      >
        <div>
          <a href="#">
            <h5
              class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              {{ doctor.full_name }}
            </h5>
          </a>
          <p class="font-bold text-gray-700">Cardiology</p>
          <p class="mb-3 font-normal text-white dark:text-gray-400">
            -------------------------------------
          </p>
          <!-- Appointment details if available -->
          <div v-if="doctor.appointment">
            <p class="text-gray-700 dark:text-white">
              Appointment Status: {{ doctor.appointment.appointment_status }}
            </p>
            <p class="text-gray-700 dark:text-white">
              Appointment Time: {{ new Date(doctor.appointment.appointment_time).toLocaleString() }}
            </p>
            <!-- Button for Call -->
            <div class="flex justify-end mt-4">
              <button
                v-if="new Date(doctor.appointment.appointment_time).toLocaleString() === new Date().toLocaleString()"
                @click="callNow(Phno)"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-tertiary dark:bg-primary dark:hover:bg-secondary dark:focus:ring-tertiary"
              >
                Call
              </button>
              <button
                v-else
                @click="confirmReject(doctor.appointment)"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        <a
          v-if="!doctor.appointment"
          href="#"
          @click="openBookingModal(doctor)"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-tertiary dark:bg-primary dark:hover:bg-secondary dark:focus:ring-tertiary self-end"
        >
          Book Appointment
        </a>
      </div>
    </div>
  </div>
  <div v-else class="flex justify-center items-center h-screen">
    <div class="bg-white rounded-lg shadow-lg p-8">
      <div class="flex items-center justify-center mb-4">
        <svg
          class="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
          ></path>
        </svg>
      </div>
      <h1 class="text-2xl font-bold text-gray-800 mb-4">No Doctor Available</h1>
      <p class="text-gray-600">
        We apologize for the inconvenience. Currently, there are no doctors
        available for appointments.
      </p>
    </div>
  </div>

  <div v-if="Book_appoinment" class="fixed z-10 inset-0 overflow-y-auto">
    <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span
      >&#8203;
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 mb-3 sm:mt-0 sm:ml-4 sm:text-left">
              <div class="mt-2">
                <p class="leading-5 font-bold text-black">Enter your name</p>
                <input
                  type="email"
                  v-model="name"
                  size="34"
                  class="mt-2 form-input"
                  placeholder="Enter your Gmail ID"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center ml-5">
          <!-- Date Picker -->
          <div class="mr-4">
            <label
              for="datePicker"
              class="block mb-2 leading-5 font-semibold text-black"
              >Select Date</label
            >
            <input
              type="date"
              id="datePicker"
              class="form-input rounded-xl bg-gray-50"
              v-model="selectedDate"
            />
          </div>

          <div class="max-w-[8rem]">
            <label
              for="time"
              class="block mb-2 text-sm font-medium text-gray-900 font-bold dark:text-white font-semibold"
              >Select time:</label
            >
            <div class="relative">
              <div
                class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none"
              >
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="time"
                id="time"
                class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                min="09:00"
                max="18:00"
                value="00:00"
                required
              />
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <p
            class="text-red-800 text-sm font-medium dark:text-red-500"
            v-if="error"
          >
            {{ error }}
          </p>
          <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <button
              type="button"
              class="inline-flex justify-center w-full rounded-xl border border-transparent px-4 py-2 bg-primary text-base leading-6 font-medium text-white shadow-sm hover:bg-primary2 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              @click="bookNow"
            >
              Book Now
            </button>
          </span>
          <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <button
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              @click="Book_appoinment = false"
            >
              Cancel
            </button>
          </span>
        </div>
        <div
          v-if="showSuccessMessage"
          class="fixed bg-white inset-0 flex items-center justify-center z-50"
        >
          <img
            src="/assets/illustration/confirmation.svg"
            alt="Success"
            class="w-64 h-64"
          />
        </div>
      </div>
    </div>
  </div>

  <div v-if="showRejectModal" class="fixed z-10 inset-0 overflow-y-auto">
    <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span
      >&#8203;
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 mb-3 sm:mt-0 sm:ml-4 sm:text-left">
              <div class="mt-2">
                <p class="leading-5 font-bold text-black">Enter your Gmail ID to confirm rejection</p>
                <input
                  type="email"
                  v-model="rejectGmail"
                  size="34"
                  class="mt-2 form-input"
                  placeholder="Enter your Gmail ID"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <button
              type="button"
              class="inline-flex justify-center w-full rounded-xl border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              @click="confirmRejectAppointment"
            >
              Confirm Reject
            </button>
          </span>
          <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <button
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              @click="showRejectModal = false"
            >
              Cancel
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { alluser, appoinment, UserAppoinments, appoinmentCancl } from '@/api/index';

export default {
  name: 'AppoinmentCard',
  props: {
    // Add user_name as a prop with default value
    user_name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      doctors: [],
      loading: false,
      Book_appoinment: false,
      showRejectModal: false,
      rejectGmail: '',
      selectedDoctor: null,
      name: localStorage.getItem('userName') || this.user_name || '', // Initialize with prop or localStorage
      selectedDate: '',
      error: '',
      showSuccessMessage: false,
      // ...existing code...
      loadingHistory: false,
      appointment: {
        user_name: '', // Initialize with empty string
        date: '',
        time: '',
        doctor_id: '',
        reason: '',
      },
      errors: {
        user_name: '',
        date: '',
        time: '',
        doctor_id: '',
        reason: '',
      },
      errorMessage: '',
      appointments: [],
      showHistory: false,
      availableTimes: [
        '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
        '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'
      ]
    };
  },
  computed: {
    today() {
      const today = new Date();
      return today.toISOString().split('T')[0];
    }
  },
  async mounted() {
    // Attempt to load user's name from localStorage
    const userName = localStorage.getItem('userName');
    if (userName) {
      this.appointment.user_name = userName;
    }
    
    // Load doctors
    try {
      const response = await alluser();
      if (response && response.data && response.data.all_users) {
        this.doctors = response.data.all_users.filter(user => user.doctor === true);
        
        // After loading doctors, load user's appointments
        await this.loadUserAppointments();
      }
    } catch (error) {
      console.error('Error loading doctors:', error);
    }

    // Check if name is already set and update if needed
    if (!this.name && this.user_name) {
      this.name = this.user_name;
    }
  },
  methods: {
    async submitAppointment() {
      // Reset errors
      this.errors = {
        user_name: '',
        date: '',
        time: '',
        doctor_id: '',
        reason: '',
      };
      this.errorMessage = '';
      
      // Validate form
      let isValid = true;
      
      if (!this.appointment.user_name) {
        this.errors.user_name = 'Name is required';
        isValid = false;
      }
      
      if (!this.appointment.date) {
        this.errors.date = 'Date is required';
        isValid = false;
      }
      
      if (!this.appointment.time) {
        this.errors.time = 'Time is required';
        isValid = false;
      }
      
      if (!this.appointment.doctor_id) {
        this.errors.doctor_id = 'Please select a doctor';
        isValid = false;
      }
      
      if (!this.appointment.reason) {
        this.errors.reason = 'Reason is required';
        isValid = false;
      }
      
      if (!isValid) {
        return;
      }
      
      this.loading = true;
      
      try {
        // Create appointment datetime string
        const appointmentDateTime = `${this.appointment.date}T${this.convertTo24Hour(this.appointment.time)}`;
        
        // Prepare appointment data for API
        const appointmentData = {
          user_name: this.appointment.user_name,
          doctor_id: this.appointment.doctor_id,
          appointment_time: appointmentDateTime,
          reason: this.appointment.reason
        };
        
        console.log('Sending appointment data:', appointmentData);
        
        // Use makeappointment instead of bookAppointment
        const response = await takeappointment(appointmentData);
        
        if (response && response.status === 201) {
          alert('Appointment booked successfully!');
          // Reset form
          this.appointment = {
            user_name: this.appointment.user_name, // Keep the name
            date: '',
            time: '',
            doctor_id: '',
            reason: '',
          };
          
          // Load updated appointments
          if (this.showHistory) {
            this.fetchAppointments();
          }
        } else {
          this.errorMessage = 'Failed to book appointment. Please try again.';
        }
      } catch (error) {
        console.error('Error booking appointment:', error);
        if (error.response?.data?.message) {
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = 'An error occurred while booking your appointment. Please try again.';
        }
      } finally {
        this.loading = false;
      }
    },
    
    async fetchAppointments() {
      this.loadingHistory = true;
      try {
        const response = await getAppointments();
        if (response && response.data) {
          this.appointments = response.data.appointments || [];
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        this.loadingHistory = false;
      }
    },
    
    convertTo24Hour(time12h) {
      const [time, modifier] = time12h.split(' ');
      let [hours, minutes] = time.split(':');
      
      if (hours === '12') {
        hours = '00';
      }
      
      if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
      }
      
      return `${hours}:${minutes}:00`;
    },
    
    formatDateTime(dateTime) {
      const date = new Date(dateTime);
      return date.toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      });
    },
    
    getStatusClass(status) {
      switch(status?.toLowerCase()) {
        case 'pending':
          return 'bg-yellow-100 text-yellow-800';
        case 'accepted':
          return 'bg-green-100 text-green-800';
        case 'rejected':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    },
    openBookingModal(doctor) {
      this.selectedDoctor = doctor;
      this.Book_appoinment = true;
      // Pre-fill name from localStorage if available
      this.name = localStorage.getItem('userName') || '';
    },
    
    async bookNow() {
      // Validate all fields are filled
      if (!this.name || !this.selectedDate) {
        this.error = 'Please fill all required fields';
        return;
      }
      
      // Get time from the time input element
      const timeInput = document.getElementById('time');
      const selectedTime = timeInput.value;
      
      if (!selectedTime) {
        this.error = 'Please select a time';
        return;
      }
      
      try {
        // Format date and time properly
        const appointmentDateTime = `${this.selectedDate}T${selectedTime}`;
        
        // Prepare data for API with user_name explicitly set
        const appointmentData = {
          user_name: this.name, // Explicitly set user_name which is required
          doctor_email: this.selectedDoctor.email,
          doctor_name: this.selectedDoctor.full_name,
          appointment_time: appointmentDateTime
        };
        
        console.log('Sending appointment data:', appointmentData);
        
        // Call the API to book appointment
        const response = await appoinment(appointmentData);
        
        if (response && (response.status === 200 || response.status === 201)) {
          // Store the user name for future use
          localStorage.setItem('userName', this.name);
          
          // Show success message
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
            this.Book_appoinment = false;
            // Refresh the page or reload appointments
            window.location.reload();
          }, 2000);
        } else {
          this.error = response.data?.message || 'Failed to book appointment';
        }
      } catch (error) {
        console.error('Error booking appointment:', error);
        if (error.response && error.response.data && error.response.data.message) {
          this.error = error.response.data.message;
        } else {
          this.error = 'An error occurred while booking your appointment';
        }
      }
    },
    
    // Method to load user appointments
    async loadUserAppointments() {
      try {
        const response = await UserAppoinments();
        
        if (response && response.data) {
          // Update doctor list with appointment information
          this.doctors.forEach(doctor => {
            const appointment = response.data.appoinments?.find(
              app => app.doctor_id === (doctor.id || doctor._id)
            );
            
            if (appointment) {
              doctor.appointment = appointment;
            }
          });
        }
      } catch (error) {
        console.error('Error loading user appointments:', error);
      }
    },
    // Use appoinmentCancl for cancellation
    async confirmRejectAppointment() {
      if (!this.rejectGmail) {
        this.error = 'Please enter your Gmail to confirm';
        return;
      }
      
      try {
        const response = await appoinmentCancl({ 
          appointment_id: this.selectedAppointment.id, 
          email: this.rejectGmail 
        });
        
        if (response && (response.status === 200 || response.status === 201)) {
          this.showRejectModal = false;
          window.location.reload();
        } else {
          this.error = response.data?.message || 'Failed to cancel appointment';
        }
      } catch (error) {
        console.error('Error cancelling appointment:', error);
        this.error = error.response?.data?.message || 'An error occurred while cancelling';
      }
    },
    
    confirmReject(appointment) {
      this.selectedAppointment = appointment;
      this.showRejectModal = true;
    },
  },
  watch: {
    showHistory(newVal) {
      if (newVal) {
        this.fetchAppointments();
      }
    }
  }
};
</script>

<style scoped>
.loader {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #e74694;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
