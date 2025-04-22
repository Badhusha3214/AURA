<template>
  <DashboardLayout />
  <div class="bg-gradient-to-b from-white via-pink-100 to-pink-100 p-4 mb-10">
    <div class="max-w-7xl mx-auto">
      <!-- Doctor View -->
      <DrAppoinment v-if="isDoctor" />
      
      <!-- Patient View -->
      <div v-else class="patient-view">
        <h1 class="text-2xl font-bold text-pink-600 mb-4">Book an Appointment</h1>
        
        <!-- Toggle between booking and appointment history -->
        <div class="flex mb-6 gap-4">
          <button 
            @click="currentTab = 'book'"
            :class="['px-4 py-2 rounded-lg', currentTab === 'book' ? 'bg-pink-500 text-white' : 'bg-white text-pink-500']">
            Book Appointment
          </button>
          <button 
            @click="currentTab = 'history'"
            :class="['px-4 py-2 rounded-lg', currentTab === 'history' ? 'bg-pink-500 text-white' : 'bg-white text-pink-500']">
            Appointment History
          </button>
        </div>
        
        <!-- Booking Form -->
        <div v-if="currentTab === 'book'" class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-4">Schedule a New Appointment</h2>
          
          <form @submit.prevent="bookAppointment" class="space-y-4">
            <!-- Name Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input type="text" v-model="newAppointment.user_name" 
                     class="w-full px-3 py-2 border rounded-lg focus:ring-pink-500 focus:border-pink-500"
                     placeholder="Enter your full name">
            </div>
            
            <!-- Doctor Selection -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Select Doctor</label>
              <div v-if="doctorsLoading" class="py-2 px-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-500">
                Loading doctors...
              </div>
              <select v-else v-model="newAppointment.doctorId" 
                      class="w-full px-3 py-2 border rounded-lg focus:ring-pink-500 focus:border-pink-500"
                      :disabled="doctors.length === 0"
                      @change="handleDoctorSelection">
                <option value="" disabled>{{ doctors.length === 0 ? 'No doctors available' : 'Select a doctor' }}</option>
                <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
                  Dr. {{ doctor.name }} - {{ doctor.specialty }}
                </option>
              </select>
              <p v-if="newAppointment.doctorId" class="mt-1 text-sm text-green-600">
                Selected doctor ID: {{ newAppointment.doctorId }}
              </p>
              <p v-if="doctors.length === 0 && !doctorsLoading" class="mt-1 text-sm text-red-500">
                No doctors available. Please try again later.
              </p>
            </div>
            
            <!-- Date Time Selection -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Select Date and Time</label>
              <input type="datetime-local" v-model="newAppointment.dateTime" 
                     class="w-full px-3 py-2 border rounded-lg focus:ring-pink-500 focus:border-pink-500">
            </div>
            
            <!-- Reason -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Reason for Visit</label>
              <textarea v-model="newAppointment.reason" rows="3" 
                        class="w-full px-3 py-2 border rounded-lg focus:ring-pink-500 focus:border-pink-500"></textarea>
            </div>
            
            <button type="submit" 
                    class="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 font-medium">
              Book Appointment
            </button>
          </form>
        </div>
        
        <!-- Appointment History -->
        <div v-else class="bg-white rounded-lg shadow-md p-4 mt-4">
          <div v-if="loading" class="flex justify-center py-10">
            <div class="loader"></div>
          </div>
          
          <div v-else-if="patientAppointments.length === 0" 
               class="text-center text-gray-500 py-8">
            <div class="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-pink-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="text-xl font-medium text-pink-600">No appointments found</p>
              <p class="mt-2">You haven't scheduled any appointments yet.</p>
              <button 
                v-if="currentTab === 'history'"
                @click="currentTab = 'book'" 
                class="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600">
                Book Your First Appointment
              </button>
            </div>
          </div>
          
          <div v-else class="space-y-4">
            <div v-for="(appointment, index) in patientAppointments" :key="index" 
                 class="border-b pb-4 last:border-b-0 pt-3">
              <div class="flex justify-between items-center">
                <div>
                  <h3 class="font-semibold text-lg">Dr. {{ appointment.doctorName }}</h3>
                  <p class="text-gray-500">{{ formatDateTime(appointment.dateTime) }}</p>
                  <p class="mt-1 text-gray-700">Reason: {{ appointment.reason }}</p>
                </div>
                
                <div>
                  <span :class="getStatusClass(appointment.status)" class="px-3 py-1 rounded-full text-sm">
                    {{ appointment.status }}
                  </span>
                </div>
              </div>
              
              <div v-if="appointment.status === 'completed' && appointment.notes" 
                   class="mt-2 p-3 bg-gray-50 rounded">
                <p class="text-sm font-medium">Doctor's Notes:</p>
                <p class="text-sm">{{ appointment.notes }}</p>
              </div>
              
              <div v-if="appointment.status === 'upcoming'" class="mt-2">
                <button @click="cancelAppointment(appointment.id)" 
                        class="text-red-500 text-sm hover:underline">
                  Cancel Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Notes Modal -->
    <div v-if="showNotesModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4">
        <div class="fixed inset-0 bg-black opacity-50" @click="showNotesModal = false"></div>
        
        <div class="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
          <h3 class="text-xl font-semibold mb-4">Add Notes for {{ selectedAppointment?.patientName }}</h3>
          
          <textarea v-model="appointmentNotes" rows="5" 
                    class="w-full px-3 py-2 border rounded-lg focus:ring-pink-500 focus:border-pink-500 mb-4"></textarea>
          
          <div class="flex justify-end space-x-3">
            <button @click="showNotesModal = false" 
                    class="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
              Cancel
            </button>
            <button @click="saveNotes" 
                    class="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
              Save Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import DrAppoinment from '@/components/DrAppoinment.vue';
import { getpatient, appoinment, alluser, appoinmentCancl, checkIsDoctor } from '@/api/index';

export default {
  components: {
    DashboardLayout,
    DrAppoinment
  },
  data() {
    return {
      isDoctor: false,
      loading: true,
      currentTab: 'book', // Default to 'book' for patient
      upcomingAppointments: [],
      previousAppointments: [],
      patientAppointments: [],
      userName: localStorage.getItem('userName') || '',
      newAppointment: {
        user_name: localStorage.getItem('userName') || '',
        doctorId: '',
        dateTime: '',
        reason: ''
      },
      doctors: [],
      doctorsLoading: false,
      showNotesModal: false,
      selectedAppointment: null,
      appointmentNotes: '',
      statusInterval: null
    };
  },
  computed: {
    currentAppointments() {
      return this.currentTab === 'upcoming' ? this.upcomingAppointments : this.previousAppointments;
    }
  },
  methods: {
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
      switch(status.toLowerCase()) {
        case 'upcoming':
          return 'bg-blue-100 text-blue-800';
        case 'completed':
          return 'bg-green-100 text-green-800';
        case 'cancelled':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    },
    
    async fetchAppointments() {
      this.loading = true;
      
      try {
        const userEmail = localStorage.getItem('email');
        console.log('Fetching appointments for user:', userEmail);
        console.log('User is doctor:', this.isDoctor);
        
        if (this.isDoctor) {
          this.upcomingAppointments = [];
          this.previousAppointments = [];
        } else {
          this.patientAppointments = [];
        }
        
        // Simulate API call with timeout
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        this.loading = false;
      }
    },

    async fetchDoctors() {
      this.doctorsLoading = true;
      try {
        const response = await alluser();
        console.log('Doctors response:', response);
        
        if (response && response.data && response.data.users) {
          // Updated filter to use 'doctor' property instead of 'is_doctor'
          console.log('Raw doctor data:', JSON.stringify(response.data.users.filter(user => 
            user.details && user.details.doctor === true)));
          
          this.doctors = response.data.users
            .filter(user => user.details && user.details.doctor === true)
            .map((doctor, index) => {
              // Get name from user details or fallback options
              const doctorName = doctor.details?.full_name || 'Doctor';
              
              // Log each doctor's ID to ensure it exists
              console.log(`Doctor ${doctorName} - ID:`, doctor.email || `doctor-${index}`);
              
              return {
                // Use email as ID since it's unique
                id: doctor.email || `doctor-${Date.now()}-${index}`,
                name: doctorName,
                specialty: doctor.details?.specialty || 'General Practitioner',
                email: doctor.email
              };
            });
          
          console.log('Processed doctors for dropdown:', this.doctors);
        } else {
          console.error("Unexpected doctors data structure", response.data);
          this.doctors = [];
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
        this.doctors = [];
      } finally {
        this.doctorsLoading = false;
      }
    },

    openNotes(appointment) {
      this.selectedAppointment = appointment;
      this.appointmentNotes = appointment.notes || '';
      this.showNotesModal = true;
    },
    
    saveNotes() {
      if (this.selectedAppointment) {
        this.selectedAppointment.notes = this.appointmentNotes;
        this.showNotesModal = false;
        this.selectedAppointment = null;
        this.appointmentNotes = '';
        alert('Notes saved successfully');
      }
    },
    
    markComplete(appointment) {
      const index = this.upcomingAppointments.findIndex(a => a.id === appointment.id);
      if (index !== -1) {
        const completedAppointment = {...this.upcomingAppointments[index], status: 'completed'};
        this.upcomingAppointments.splice(index, 1);
        this.previousAppointments.unshift(completedAppointment);
        this.patientAppointments.unshift(completedAppointment);
        alert('Appointment marked as complete');
      }
    },
    
    async bookAppointment() {
      // Make sure user_name is set
      this.newAppointment.user_name = this.newAppointment.user_name || this.userName || localStorage.getItem('userName') || '';
      
      // Enhanced debugging to see the exact data types
      console.log('Appointment form data (with types):', {
        user_name: { value: this.newAppointment.user_name, type: typeof this.newAppointment.user_name },
        doctorId: { value: this.newAppointment.doctorId, type: typeof this.newAppointment.doctorId },
        dateTime: { value: this.newAppointment.dateTime, type: typeof this.newAppointment.dateTime },
        reason: { value: this.newAppointment.reason, type: typeof this.newAppointment.reason }
      });
      
      // Fix for doctor selection issue - use selectedDoctor from a computed property or find it directly
      const selectedDoctorId = this.newAppointment.doctorId;
      console.log('Selected doctor ID:', selectedDoctorId);
      console.log('Available doctors:', this.doctors);
      
      // Improved validation with more specific checks
      if (!this.newAppointment.user_name || this.newAppointment.user_name.trim() === '') {
        alert('Please enter your name');
        return;
      }
      
      if (!selectedDoctorId) {
        alert('Please select a doctor');
        return;
      }
      
      if (!this.newAppointment.dateTime) {
        alert('Please select a date and time');
        return;
      }
      
      if (!this.newAppointment.reason || this.newAppointment.reason.trim() === '') {
        alert('Please enter a reason for your visit');
        return;
      }
      
      console.log('All validations passed, booking appointment with user_name:', this.newAppointment.user_name);
      
      try {
        // Find the doctor using the ID
        const doctor = this.doctors.find(d => String(d.id) === String(selectedDoctorId));
        
        // Enhanced debugging for doctor selection
        console.log('Selected doctor:', doctor);
        console.log('Doctor ID comparison:', this.doctors.map(d => ({
          id: d.id,
          selected: String(d.id) === String(selectedDoctorId),
          idType: typeof d.id,
          selectedType: typeof selectedDoctorId
        })));
        
        if (!doctor) {
          alert('Selected doctor not found. Please try again.');
          return;
        }
        
        // Prepare data for API
        const appointmentData = {
          user_name: this.newAppointment.user_name.trim(),
          doctor_email: doctor.email,
          doctor_name: doctor.name,
          appointment_time: this.newAppointment.dateTime,
          reason: this.newAppointment.reason.trim()
        };
        
        console.log('Sending appointment data:', appointmentData);
        
        // Call the API
        const response = await appoinment(appointmentData);
        
        if (response && (response.status === 200 || response.status === 201)) {
          // Store user name for future use
          localStorage.setItem('userName', this.newAppointment.user_name);
          
          // Add to local display
          this.patientAppointments.unshift({
            id: Date.now(),
            doctorName: doctor.name,
            dateTime: this.newAppointment.dateTime,
            reason: this.newAppointment.reason,
            status: 'upcoming'
          });
          
          // Reset form but keep user_name
          this.newAppointment = {
            user_name: this.newAppointment.user_name,
            doctorId: '',
            dateTime: '',
            reason: ''
          };
          
          // Switch to history tab
          this.currentTab = 'history';
          
          alert('Appointment booked successfully');
        } else {
          alert('Failed to book appointment. Please try again.');
        }
      } catch (error) {
        console.error('Error booking appointment:', error);
        alert('Error booking appointment. Please try again.');
      }
    },
    
    handleDoctorSelection(event) {
      // Log the selected value directly from the event
      console.log('Doctor selected via dropdown:', event.target.value);
      // Ensure doctorId is properly set
      this.newAppointment.doctorId = event.target.value;
    },
    
    async cancelAppointment(appointmentId) {
      if (confirm('Are you sure you want to cancel this appointment?')) {
        try {
          // Find the appointment in the local array
          const index = this.patientAppointments.findIndex(a => a.id === appointmentId);
          
          if (index !== -1) {
            // Show loading state
            this.patientAppointments[index].status = 'processing...';
            
            // Call the API to cancel the appointment
            const response = await appoinmentCancl({
              appointment_id: appointmentId
            });
            
            console.log('Cancel appointment response:', response);
            
            if (response && (response.status === 200 || response.status === 201)) {
              // Update the local state on success
              this.patientAppointments[index].status = 'cancelled';
              alert('Appointment cancelled successfully');
            } else {
              // Revert the status on error
              this.patientAppointments[index].status = 'upcoming';
              alert('Failed to cancel appointment. Please try again.');
            }
          }
        } catch (error) {
          console.error('Error cancelling appointment:', error);
          alert('Error cancelling appointment. Please try again.');
          
          // Find the appointment again and revert the status
          const index = this.patientAppointments.findIndex(a => a.id === appointmentId);
          if (index !== -1) {
            this.patientAppointments[index].status = 'upcoming';
          }
        }
      }
    },
    
    async checkDoctorStatus() {
      // Always check from backend for latest status
      try {
        const isDoctor = await checkIsDoctor();
        this.isDoctor = isDoctor;
        localStorage.setItem('isdoctor', isDoctor ? 'true' : 'false');
        // Optionally update UI state
        if (this.isDoctor) {
          this.currentTab = 'upcoming';
          document.title = 'My Patient Appointments - Aura';
          this.patientAppointments = [];
        } else {
          this.currentTab = 'book';
          document.title = 'Book Appointment - Aura';
          this.upcomingAppointments = [];
          this.previousAppointments = [];
        }
        return isDoctor;
      } catch (error) {
        console.error('Error checking doctor status:', error);
        this.isDoctor = false;
        localStorage.setItem('isdoctor', 'false');
        return false;
      }
    },
    
    handleStorageChange(event) {
      if (event.key === 'isdoctor') {
        console.log('Doctor status changed in another tab/window');
        const newDoctorStatus = event.newValue === 'true';
        if (newDoctorStatus !== this.isDoctor) {
          console.log(`Updating doctor status: ${this.isDoctor} -> ${newDoctorStatus}`);
          this.isDoctor = newDoctorStatus;
          this.currentTab = this.isDoctor ? 'upcoming' : 'book';
          this.fetchAppointments();
        }
      }
    },
    
    setupStorageListener() {
      this.boundHandleStorageChange = this.handleStorageChange.bind(this);
      window.addEventListener('storage', this.boundHandleStorageChange);
    },
    
    setupPeriodicVerification() {
      this.statusInterval = setInterval(() => {
        try {
          const currentStatus = localStorage.getItem('isdoctor') === 'true';
          if (currentStatus !== this.isDoctor) {
            console.log('Doctor status changed, refreshing view');
            this.isDoctor = currentStatus;
            this.currentTab = this.isDoctor ? 'upcoming' : 'book';
            this.fetchAppointments();
          }
        } catch (error) {
          console.error('Error in periodic doctor status check:', error);
        }
      }, 30000);
    }
  },
  
  async mounted() {
    await this.checkDoctorStatus();
    if (!this.isDoctor) {
      this.fetchDoctors();
      this.fetchAppointments();
    }
    this.setupStorageListener();
    this.setupPeriodicVerification();
    
    // Try to get userName from user data if available
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      this.userName = storedUserName;
      this.newAppointment.user_name = storedUserName;
    }
  },
  
  beforeUnmount() {
    if (this.statusInterval) {
      clearInterval(this.statusInterval);
    }
    
    if (this.boundHandleStorageChange) {
      window.removeEventListener('storage', this.boundHandleStorageChange);
    }
  }
};
</script>
<style scoped>
.loader {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #e74694;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
