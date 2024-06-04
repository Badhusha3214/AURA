<template>
    <div class="flex flex-col items-center justify-center h-screen">
      <img src="/assets/logo.png" alt="logo" class="mb-8" />
      <div class="w-64">
        <div
          class="h-2 bg-gray-300 rounded-full overflow-hidden relative"
          :class="{ 'animate-progress': progress < 50 }"
        >
          <div
            class="h-full bg-primary absolute left-0 rounded-full"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
        <div class="text-center mt-2 font-bold">{{ progress }}%</div>
        <div class="text-center mt-1 text-gray-600">Just wait a second, data is being processed.</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoadScreen',
    data() {
      return {
        progress: 0,
        intervalId: null,
      };
    },
    mounted() {
      this.startProgressAnimation();
      setTimeout(() => {
        this.$router.push('/');
      }, 2000);
    },
    beforeUnmount() {
      clearInterval(this.intervalId);
    },
    methods: {
      startProgressAnimation() {
        this.intervalId = setInterval(() => {
          this.progress += 5;
          if (this.progress >= 100) {
            clearInterval(this.intervalId);
          }
        }, 50);
      },
    },
  };
  </script>
  
  <style>
  @keyframes progress {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  
  .animate-progress::before {
    content: '';
    display: block;
    height: 100%;
    background-color: var(--primary-color);
    animation: progress 5s linear infinite;
  }
  </style>