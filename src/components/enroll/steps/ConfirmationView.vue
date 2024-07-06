<template>
  <div class="mt-10 w-full flex justify-center mb-12"> 
      <div class="relative flex flex-col items-center gap-2 justify-center my-3">
          <div class="w-full lg:w-1/3 py-4 lg:py-20 ">
              <transition name="fade" @after-enter="changeImage">
                  <img class="h-80" :key="currentImage" :src="currentImage" alt="Image" />
              </transition>
          </div>
      </div>
  </div>
  <div class="mb-0 mr-5 ml-5 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 "> 
      <div class="bg-pink-500 h-2.5 rounded-full" style="width: 70%"></div>
      <p class="text-base text-center text-black-500 mr-5 ml-5 mt-5">70%</p>
  </div>
  <div class="absolute bottom-0 w-full flex justify-center mb-12">
      <div class="relative flex flex-col items-center gap-2 justify-center my-3">
          <p class="text-base text-center text-black-500 mr-5 ml-5">Just wait a second, data is being processed.</p>
      </div>
  </div>
</template>

<script>
export default{
  name: "ConfirmationView",
  data() {
  return {
    images: [
      'confirmation.svg',
      'splash_screen_logo.png',
      // Add more image paths as needed
    ],
    currentIndex: 0,
    currentImage: null
  };
},
mounted() {
  this.currentImage = "/assets/illustration/" + this.images[0]
  setTimeout(() => {
      this.currentImage = "/assets/illustration/" + this.images[1]
  },5000)
  // console.log("hai")
},
}
</script>
<style>
.fade-enter-active, .fade-leave-active {
transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
opacity: 0;
}
</style>