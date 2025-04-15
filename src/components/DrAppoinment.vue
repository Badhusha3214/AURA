<template>
  <div class="doctor-appointments">
    <div v-if="loading" class="loading-container py-10 text-center">
      <div class="loader mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading your appointments...</p>
    </div>
    
    <div v-else-if="!appointments || appointments.length === 0" class="empty-state p-8 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-16 w-16 text-pink-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <h3 class="text-xl font-medium text-pink-600 mb-2">No appointments found</h3>
      <p class="text-gray-600">You don't have any appointment requests yet.</p>
    </div>
    
    <div v-else class="appointments-list space-y-4">
      <div v-for="appointment in appointments" :key="appointment.appointment_id" 
           class="appointment-card bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-5 border-b border-gray-100">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-lg font-semibold text-gray-800">{{ appointment.user_name }}</h3>
              <p class="text-gray-600 text-sm">{{ formatAppointmentTime(appointment.appointment_time) }}</p>
            </div>
            
            <div :class="getStatusBadgeClass(appointment.appointment_status)" 
                 class="px-3 py-1 rounded-full text-xs font-medium">
              {{ formatStatus(appointment.appointment_status) }}
            </div>
          </div>
          
          <div class="mt-3">
            <p class="text-sm text-gray-700 font-medium">Doctor: {{ appointment.doctor_name }}</p>
            <p v-if="appointment.appointment_reason" class="mt-2 text-sm text-gray-600">
              <span class="font-medium">Reason:</span> {{ appointment.appointment_reason }}
            </p>
          </div>
          
          <div v-if="appointment.reject_reason" class="mt-3 p-3 bg-red-50 rounded-md text-sm text-red-700">
            <span class="font-medium">Rejection reason:</span> {{ appointment.reject_reason }}
          </div>
        </div>
        
        <div class="p-4 bg-gray-50">
          <div v-if="appointment.appointment_status === 'accepted'">
            <button @click="callNumber(appointment.doctor_phone)" 
                    class="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              <span class="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Patient
              </span>
            </button>
          </div>
          
          <div v-else-if="appointment.appointment_status === 'rejected'" class="text-center text-sm text-gray-500">
            This appointment has been rejected
          </div>
          
          <div v-else class="flex gap-3">
            <button @click="acceptAppointment(appointment.appointment_id)" 
                    class="flex-1 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
              Accept
            </button>
            <button @click="showReject(appointment.appointment_id)" 
                    class="flex-1 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Reject Modal -->
    <div v-if="showRejectModal" class="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto">
        <div class="p-5 border-b">
          <h3 class="text-lg font-semibold text-gray-800">Reject Appointment</h3>
        </div>
        
        <div class="p-5">
          <p class="text-gray-600 mb-4">Please provide a reason for rejecting the appointment.</p>
          <textarea v-model="rejectReason" 
                   class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                   rows="3"
                   placeholder="Enter reason for rejection"></textarea>
        </div>
        
        <div class="p-4 bg-gray-50 flex justify-end gap-3 rounded-b-lg">
          <button @click="closeRejectModal"
                 class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
            Cancel
          </button>
          <button @click="rejectAppointment"
                 class="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
                 :disabled="!rejectReason.trim()">
            Reject Appointment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getpatient, rejectAppointment, appoinmentAccept } from "@/api/index";
import moment from "moment";

export default {
  name: "DrAppoinment",
  data() {
    return {
      appointments: [],
      loading: true,
      showRejectModal: false,
      rejectReason: "",
      selectedAppointmentId: null,
    };
  },
  mounted() {
    this.fetchAppointments();
  },
  methods: {
    async fetchAppointments() {
      this.loading = true;
      try {
        const response = await getpatient();
        console.log('Appointment response:', response);
        if (response.data && response.data.appoinment) {
          this.appointments = response.data.appoinment;
        } else {
          console.error("Unexpected response data structure");
          this.appointments = [];
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
        this.appointments = [];
      } finally {
        this.loading = false;
      }
    },
    
    async acceptAppointment(appointmentId) {
      try {
        // Show loading state if needed
        const appointmentIndex = this.appointments.findIndex(
          app => app.appointment_id === appointmentId
        );
        
        if (appointmentIndex !== -1) {
          // Optimistic update
          this.appointments[appointmentIndex].appointment_status = 'loading';
          
          const response = await appoinmentAccept({
            appointment_id: appointmentId,
          });
          
          console.log('Accept response:', response);
          
          // Update appointment status
          this.appointments[appointmentIndex].appointment_status = 'accepted';
        }
      } catch (error) {
        console.error("Error accepting appointment:", error);
        // Revert the optimistic update if there was an error
        const appointmentIndex = this.appointments.findIndex(
          app => app.appointment_id === appointmentId
        );
        if (appointmentIndex !== -1) {
          this.appointments[appointmentIndex].appointment_status = 'pending';
        }
      }
    },
    
    showReject(appointmentId) {
      this.selectedAppointmentId = appointmentId;
      this.rejectReason = "";
      this.showRejectModal = true;
    },
    
    async rejectAppointment() {
      if (!this.rejectReason.trim()) {
        return; // Don't allow empty reason
      }
      
      try {
        const appointmentIndex = this.appointments.findIndex(
          app => app.appointment_id === this.selectedAppointmentId
        );
        
        if (appointmentIndex !== -1) {
          // Optimistic update
          this.appointments[appointmentIndex].appointment_status = 'loading';
          
          const response = await rejectAppointment({
            appointment_id: this.selectedAppointmentId,
            reject_reason: this.rejectReason,
          });
          
          console.log('Reject response:', response);
          
          // Update appointment status and reason
          this.appointments[appointmentIndex].appointment_status = 'rejected';
          this.appointments[appointmentIndex].reject_reason = this.rejectReason;
          
          // Close modal
          this.closeRejectModal();
        }
      } catch (error) {
        console.error("Error rejecting appointment:", error);
        // Revert the optimistic update if there was an error
        const appointmentIndex = this.appointments.findIndex(
          app => app.appointment_id === this.selectedAppointmentId
        );
        if (appointmentIndex !== -1) {
          this.appointments[appointmentIndex].appointment_status = 'pending';
        }
      }
    },
    
    closeRejectModal() {
      this.showRejectModal = false;
      this.rejectReason = "";
      this.selectedAppointmentId = null;
    },
    
    formatAppointmentTime(appointmentTime) {
      const currentTime = moment();
      const appointmentDateTime = moment(appointmentTime);

      if (currentTime.isSame(appointmentDateTime, "minute")) {
        return "Now";
      }

      return appointmentDateTime.format("MMMM D, YYYY - h:mm A");
    },
    
    callNumber(phoneNumber) {
      if (!phoneNumber) return;
      
      // Create a clickable phone link
      window.location.href = `tel:${phoneNumber}`;
      console.log("Calling number:", phoneNumber);
    },
    
    getStatusBadgeClass(status) {
      switch (status) {
        case 'pending':
          return 'bg-yellow-100 text-yellow-800';
        case 'accepted':
          return 'bg-green-100 text-green-800';
        case 'rejected':
          return 'bg-red-100 text-red-800';
        case 'loading':
          return 'bg-blue-100 text-blue-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    },
    
    formatStatus(status) {
      switch (status) {
        case 'pending':
          return 'Pending';
        case 'accepted':
          return 'Accepted';
        case 'rejected':
          return 'Rejected';
        case 'loading':
          return 'Processing...';
        default:
          return status;
      }
    }
  },
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
