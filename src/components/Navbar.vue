<template>

   <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar"
      type="button"
      class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
      <span class="sr-only">Open sidebar</span>
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
         xmlns="http://www.w3.org/2000/svg">
         <path clip-rule="evenodd" fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
         </path>
      </svg>
   </button>

   <aside id="default-sidebar"
      class="fixed top-0 left-0 z-40 w-56 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar" :class="{ '-translate-x-full': showDeleteAccountConfirmation }">
      <div class="h-full px-3 py-4 overflow-y-auto backdrop-blur-md">
         <ul class="space-y-2 font-medium mb-1">
            <li>
               <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg">

                  <span class="flex-1 ms-3 whitespace-nowrap"></span>
               </a>
            </li>
            <li>
               <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg">

                  <span class="flex-1 ms-3 whitespace-nowrap"></span>
               </a>
            </li>
         </ul>
         <ul class="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            <li>
               <a href="#"
                  class="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                  <svg class="w-5 h-5 text-black transition duration-75 " aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                     <path
                        d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                     <path
                        d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span class="ms-3">About Us</span>
               </a>
            </li>
            <li>
               <a href="#"
                  class="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                  @click="logout">
                  <svg class="w-5 h-5 text-black transition duration-75 " aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                     <path
                        d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                     <path
                        d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span class="ms-3">Logout</span>
               </a>
            </li>
            <li>
               <a href="#"
                  class="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                  @click="showDeleteAccountConfirmation = true">
                  <svg
                     class="flex-shrink-0 w-5 h-5 text-black transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                     aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                  </svg>
                  <span class="flex-1 ms-3 whitespace-nowrap">Delete Account</span>
               </a>
            </li>


         </ul>
      </div>
   </aside>
   <div v-if="showDeleteAccountConfirmation" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
         <div class="fixed inset-0 transition-opacity">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
         </div>

         <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
         <div
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog" aria-modal="true" aria-labelledby="modal-headline">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
               <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                     <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                        Delete Account Confirmation
                     </h3>
                     <div class="mt-2">
                        <p class="text-sm leading-5 text-gray-500">
                           To confirm account deletion, please enter your Gmail ID.
                        </p>
                        <input type="email" v-model="confirmationEmail" class="mt-2 form-input"
                           placeholder="Enter your Gmail ID" />
                     </div>
                  </div>
               </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
               <p class="text-red-800 text-sm font-medium dark:text-red-500" v-if="error"> {{ error }}</p>
               <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                  <button type="button"
                     class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                     @click="deleteAccount">
                     Delete Account
                  </button>
               </span>
               <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                  <button type="button"
                     class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                     @click="showDeleteAccountConfirmation = false">
                     Cancel
                  </button>
               </span>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { deleteAccount } from '@/api/index.js'
export default {
   name: 'Navbar',
   data() {
      return {
         showDeleteAccountConfirmation: false,
         confirmationEmail: '',
         error: null,
      }
   },
   methods: {
      logout() {
         document.cookie = "aura-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
         window.location.href = "/enroll";
         localStorage.clear();
      },
      async deleteAccount() {
         await deleteAccount({
            email: this.confirmationEmail,
         }).then((response) => {
            console.log(response);
            if (response.status == 200) {
               this.$router.push('/enroll')
               document.cookie = "aura-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
               localStorage.clear();
            } else if (response.response.status === 400) {
               this.error = "enter a valid email address"
            }
         }).catch((error) => {
            console.log("error");
            this.error = error;
         })



         // // Perform account deletion logic here
         // // Check if the entered email matches the user's account
         // if (this.confirmationEmail === 'user@example.com') {
         //    // Account deletion successful
         //    // Redirect to the /enroll page
         //    window.location.href = "/enroll";
         // } else {
         //    // Invalid email, display an error message
         //    alert('Invalid Gmail ID. Please try again.');
         // }
      }
   }
}
</script>