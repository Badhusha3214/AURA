<template>
   <div>
     <!-- Sidebar toggle button -->
     <button class="ml-4 mt-2 sidebar-toggle-btn text-black px-3 py-2 rounded" aria-label="Toggle Sidebar" @click="toggleSidebar">
       <span class="sr-only">Toggle Sidebar</span>
       <svg class="w-6  h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
       </svg>
     </button>
 
     <!-- Sidebar -->
     <aside class="sidebar fixed top-0 left-0 z-50 h-screen pt-16 backdrop-blur-sm text-black text-xl font-semibold transition duration-300 ease-in-out" :class="{ 'translate-x-0': sidebarOpen, '-translate-x-full': !sidebarOpen }" @click.outside="closeSidebar">
       <div class="sidebar-content px-4">
         <!-- Close Sidebar Button -->
         <button class="close-sidebar-btn absolute top-4 right-4 text-black hover:text-gray-300" @click="closeSidebar">
           <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
           </svg>
         </button>
 
         <!-- Sidebar items -->
         <ul class="sidebar-items">
           <li><a href="#" class="sidebar-link block py-2 px-3 rounded hover:bg-gray-100 "></a></li>
           <li><a href="#" class="sidebar-link block py-2 px-3 rounded hover:bg-gray-100 ">about us</a></li>
         </ul>
 
         <!-- Action items -->
         <ul class="action-items mt-8">
           <li><a href="#" class="action-link block py-2 px-3 rounded hover:bg-gray-100" @click="logout">Logout</a></li>
           <li>
             <button class="action-link block py-2 px-3 hover:bg-gray-100  text-black" @click="showDeleteConfirmation">Delete Account</button>
           </li>
         </ul>
       </div>
     </aside>
 
     <!-- Delete Account Confirmation Modal -->
     <div v-if="showDeleteAccountConfirmation" class="modal fixed inset-0 z-50 overflow-y-auto mx-4">
          <div class="modal-overlay absolute inset-0 bg-gray-900 opacity-75"></div>
          <div class="modal-content relative mx-auto my-16 max-w-md bg-white rounded-lg shadow-lg">
            <div class="modal-header px-6 py-4 bg-pink-100 text-black rounded-t-lg">
              <h3 class="modal-title font-semibold">Delete Account Confirmation</h3>
            </div>
            <div class="modal-body px-6 py-4">
              <p class="modal-text mb-4">To confirm account deletion, please enter your email:</p>
              <input type="email" v-model="confirmationEmail" placeholder="Enter your email" class="modal-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600" />
            </div>
            <div class="modal-footer px-6 py-4 bg-gray-100 rounded-b-lg flex justify-end">
              <button class="modal-btn delete-btn bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mr-2" @click="deleteAccount">Delete Account</button>
              <button class="modal-btn cancel-btn bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded" @click="closeDeleteConfirmation">Cancel</button>
            </div>
            <p v-if="error" class="modal-error text-red-600 px-6 py-4">{{ error }}</p>
          </div>
        </div>
   </div>
 </template>
 
 <script>
 import { deleteAccount } from '@/api/index.js';
 
 export default {
   name: 'Navbar',
   data() {
     return {
       showDeleteAccountConfirmation: false,
       confirmationEmail: '',
       error: null,
       sidebarOpen: false,
     };
   },
   methods: {
     logout() {
       document.cookie = "aura-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
       window.location.href = "/enroll";
       localStorage.clear();
     },
     toggleSidebar() {
       this.sidebarOpen = !this.sidebarOpen;
     },
     closeSidebar() {
       this.sidebarOpen = false;
     },
     showDeleteConfirmation() {
       this.showDeleteAccountConfirmation = true;
     },
     closeDeleteConfirmation() {
       this.showDeleteAccountConfirmation = false;
       this.error = null; // Reset error message when closing confirmation
     },
     async deleteAccount() {
       try {
         const response = await deleteAccount({ email: this.confirmationEmail });
         if (response.status === 200) {
           this.$router.push('/enroll');
           document.cookie = "aura-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
           localStorage.clear();
         } else {
           // Handle other status codes
           this.error = "An error occurred while deleting the account.";
         }
       } catch (error) {
         // Handle network errors or other exceptions
         console.error("Error deleting account:", error);
         this.error = "An error occurred while deleting the account.";
       }
     },
   },
 };
 </script>
 
 <style scoped>
 /* Close Sidebar Button */
 .close-sidebar-btn {
   transition: color 0.3s ease;
 }
 
 /* Modal styles */
 .modal {
   display: flex;
   justify-content: center;
   align-items: center;
 }
 
 .modal-overlay {
   position: fixed;
   inset: 0;
 }
 
 .modal-content {
   max-width: 28rem;
   width: 100%;
 }
 
 .modal-header {
   border-top-left-radius: 0.5rem;
   border-top-right-radius: 0.5rem;
 }
 
 .modal-footer {
   border-bottom-left-radius: 0.5rem;
   border-bottom-right-radius: 0.5rem;
 }
 </style>
