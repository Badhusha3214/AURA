<template>
    <div class="relative">
      <button @click="togglePopup" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Toggle Popup
      </button>
      <transition name="slide-up">
        <div v-if="showPopup" class="absolute w-40 bg-white rounded shadow-md p-2 bottom-full left-1/2 transform -translate-x-1/2">
          <!-- Popup content with icons -->
          <div class="flex justify-around">
            <!-- Add your icons here -->
            <span class="text-xl">Icon 1</span>
            <span class="text-xl">Icon 2</span>
            <span class="text-xl">Icon 3</span>
          </div>
          <p class="text-center mt-2 text-gray-600">Popup Name</p>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PopupComponent',
    data() {
      return {
        showPopup: false
      };
    },
    methods: {
      togglePopup() {
        this.showPopup = !this.showPopup;
      }
    }
  };
  </script>
  
  <style>
  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: transform 0.5s ease;
  }
  .slide-up-enter-to,
  .slide-up-leave-from {
    transform: translateY(100%);
  }
  </style>
  