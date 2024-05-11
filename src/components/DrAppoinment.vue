<template>
  <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between">
    <div>
      <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ patient.Name }}</h5>
      </a>
      <p class="font-bold text-gray-700">{{ patient.Department }}</p>
      <p class="mb-1 font-normal text-gray-700 dark:text-gray-400">{{patient.mode}}</p>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ patient.time }}</p>
      <p class="mb-3 font-normal text-white ">________________________________</p>
    </div>
    <div class="flex justify-between">
      <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-tertiary dark:bg-primary dark:hover:bg-secondary dark:focus:ring-tertiary"> Accept </a>
      <a href="#" @click="Reject = true" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-tertiary dark:bg-primary dark:hover:bg-secondary dark:focus:ring-tertiary"> Reject </a>
    </div>

    <div v-if="Reject" class="fixed z-10 inset-0 overflow-y-auto ">
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
            <div class="mt-3 mb-3 sm:mt-0 sm:ml-4 sm:text-left">
              <div class="mt-2">
                <p class=" leading-5 font-bold text-black text-center">
                Rejected Reasson 
                </p>
                <p class="pt-3">
                  Enter your Reasson
                </p>
                <textarea 
          class=" border-white w-full rounded-md px-4 py-2  placeholder-gray-400  text-base h-48"
          placeholder="Content"></textarea>
              </div>
            </div>
          </div>

          <!-- Date Picker -->

        </div>
        
        

        <!-- <p class="ml-5 mb-2 leading-5 font-bold text-black ">
          Select option
        </p>

        <div class="flex my-4">
          <div class="flex items-center  mx-12">
            <input id="inline-radio" type="radio" value="" name="inline-radio-group"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="inline-radio"
              class="ms-2 text-sm font-medium text-gray-900 font-semibold dark:text-gray-300">Vedio Call</label>
          </div>
          <div class="flex items-center mx-10">
            <input id="inline-2-radio" type="radio" value="" name="inline-radio-group"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="inline-2-radio"
              class="ms-2 text-sm font-medium text-gray-900 font-semibold dark:text-gray-300">Audio Call</label>
          </div>
        </div> -->

        <!-- <div class="flex items-center ml-5">
          Date Picker
          <div class="mr-4">
            <label for="datePicker" class="block mb-2 leading-5 font-semibold text-black">Select Date</label>
            <input type="date" id="datePicker" class="form-input rounded-xl bg-gray-50" v-model="selectedDate">
          </div>

          <div class="max-w-[8rem]">
            <label for="time"
              class="block mb-2 text-sm font-medium text-gray-900 font-bold dark:text-white font-semibold">Select
              time:</label>
            <div class="relative">
              <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <input type="time" id="time"
                class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                min="09:00" max="18:00" value="00:00" required />
            </div>
          </div>
        </div> -->
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <p class="text-red-800 text-sm font-medium dark:text-red-500" v-if="error"> {{ error }}</p>
          <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <button type="button"
              class="inline-flex justify-center w-full rounded-xl border border-transparent px-4 py-2 bg-primary text-base leading-6 font-medium text-white shadow-sm hover:bg-primary2 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              @click="rejected">
              Done
            </button>
          </span>
        </div>
        <div v-if="showSuccessMessage" class="fixed bg-white inset-0 flex items-center justify-center z-50">
        <img src="/assets/illustration/confirmation.svg" alt="Success" class="w-64 h-64">
      </div>
    </div>
  </div>
  </div>
  </div>
</template> 

<script>
export default {
  name: 'DrAppoinment',
  props: {
    patient: {
      type: Object,
      required: true,
      default: () => ({
        Name: '',
        Department: '',
        mode: '',
        time: ''
      })
    }
  },
  data() {
      return {
        Reject: false,
        name: '',
        error: '',
        selectedDate: null,
        done: false,
        showSuccessMessage: false
      }
    },methods: {
  rejected() {

    this.showSuccessMessage = true;


    setTimeout(() => {
      this.showSuccessMessage = false;
      this.Reject = false;
    }, 1000);
  }
}

}
</script>