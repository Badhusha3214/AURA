<template>
    <div v-if="!isMobile" class="mobile-detection-overlay">
      <div class="mobile-detection-content">
        <h2>Please log in on your mobile device</h2>
        <p>This page is optimized for mobile experience. Please open it on your phone or tablet.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MobileDetection',
    data() {
      return {
        isMobile: false
      }
    },
    mounted() {
      this.checkMobile();
    },
    methods: {
      checkMobile() {
        // Detect if the user is accessing the page from a mobile device
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.isMobile = isMobileDevice;
      }
    }
  }
  </script>
  
  <style scoped>
  .mobile-detection-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ff69b4;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .mobile-detection-content {
    text-align: center;
    color: white;
    padding: 40px;
  }
  </style>