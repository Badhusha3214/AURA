<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="!appointments || appointments.length === 0">
    <p>No appointments available.</p>
  </div>
  <div v-else>
    <div v-for="appointment in appointments" :key="appointment.appointment_id">
      <div
        class="w-full mx-5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between"
      >
        <div>
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {{ appointment.user_name }}
          </h5>
          <p class="font-bold text-gray-700">{{ appointment.doctor_name }}</p>
          <p
            class="mb-1 font-normal text-gray-700 dark:text-gray-400"
            @click="callNumber(appointment.doctor_phone)"
          >
            {{ formatAppointmentTime(appointment.appointment_time) }}
          </p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {{ appointment.appointment_status }}
          </p>
          <p class="text-white" >---------------------------</p>
        </div>

        <div v-if="appointment.appointment_status === 'accepted'">
          <a
            href="#"
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-tertiary dark:bg-primary dark:hover:bg-secondary dark:focus:ring-tertiary"
            >Waiting</a
          >
        </div>
        <div v-else-if="appointment.appointment_status === 'rejected'">
          <a
            href="#"
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-tertiary dark:bg-primary dark:hover:bg-secondary dark:focus:ring-tertiary"
            >rejected</a
          >
        </div>

        <div v-else class="flex justify-between">
          <a
            href="#"
            @click.prevent="acceptAppointment(appointment.appointment_id)"
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-tertiary dark:bg-primary dark:hover:bg-secondary dark:focus:ring-tertiary"
            >Accept</a
          >
          <a
            href="#"
            @click.prevent="showReject(appointment.appointment_id)"
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-tertiary dark:bg-primary dark:hover:bg-secondary dark:focus:ring-tertiary"
            >Reject</a
          >
        </div>
      </div>
    </div>
  </div>

  <!-- Reject Modal -->
  <div v-if="showRejectModal" class="fixed z-10 inset-0 overflow-y-auto">
    <div
      class="flex items-end justify-center min-h-screen -mt-44 pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                class="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                Reject Appointment
              </h3>
              <div class="mt-2">
                <p class="text-sm leading-5 text-gray-500">
                  Please provide a reason for rejecting the appointment.
                </p>
                
                <textarea
                  v-model="rejectReason"
                  class="mt-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <button
              @click.prevent="rejectAppointment"
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              Reject
            </button>
          </span>
          <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <button
              @click.prevent="closeRejectModal"
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
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
      try {
        const response = await getpatient();
        console.log(response);
        if (response.data && response.data.appoinment) {
          this.appointments = response.data.appoinment;
        } else {
          console.error("Unexpected response data structure");
          this.appointments = [];
        }
        this.loading = false;
      } catch (error) {
        console.error("Error fetching appointments:", error);
        this.loading = false;
      }
    },
    async acceptAppointment(appointmentId) {
      try {
        console.log(appointmentId);
        const response = await appoinmentAccept({
          appointment_id: appointmentId,
        });
        // Handle the response as needed
        console.log(response);
      } catch (error) {
        console.error("Error accepting appointment:", error);
      }
    },
    showReject(appointmentId) {
      this.selectedAppointmentId = appointmentId;
      this.showRejectModal = true;
    },
    async rejectAppointment() {
      try {
        // Call the API to reject the appointment
        const response = await rejectAppointment({
          appointment_id: this.selectedAppointmentId,
          reject_reason: this.rejectReason,
        });
        console.log(response);
        // Update the appointments array with the rejected appointment
        this.appointments = this.appointments.map((appointment) => {
          if (appointment.appointment_id === this.selectedAppointmentId) {
            return {
              ...appointment,
              appointment_status: "rejected",
            };
          }
          return appointment;
        });

        // Reset the state
        this.showRejectModal = false;
        this.rejectReason = "";
        this.selectedAppointmentId = null;
      } catch (error) {
        console.error("Error rejecting appointment:", error);
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
        return "Call Now";
      }

      return appointmentDateTime.format("MMMM D, YYYY - h:mm A");
    },
    callNumber(phoneNumber) {
      console.log("Calling number:", phoneNumber);
    },
  },
};
</script>
