<template>

<span class="dot"></span>
<div class="circle"></div> 
<p class="text1"></p>
<br>

<p>quick view</p>
<button type="button" class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
<svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
<path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z"/>
</svg>
<span class="sr-only">Icon description</span>
</button>

<button type="button" class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
<svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
<path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z"/>
</svg>
<span class="sr-only">Icon description</span>
</button>


</template>

<script>
export default {
    name: 'HoMe'
}
</script>

<style>

.dot {
  height: 300px;
  width: 300px;
  background-color: #bbb;
  border-radius: 50%;
  align-items: center;
  position: absolute;
  display: inline-block;
  top: 75px;
  left: 300px;
  box-shadow: 0px 0px 0px 5px #f00;

  background-image: radial-gradient(#e4b1b1, #f3427a, #FF8AB0);
}
.circle 
{ 
    width: 500px; 
    height: 500px; 
    border: 1px solid black; 
    border-radius: 100%; 
    margin: auto; 
    align-items: center;
    position: relative;
} 

</style>