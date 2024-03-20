<script setup>
import Datepicker from 'vue3-datepicker'
import { ref } from 'vue'
const picked = ref(new Date())
console.log(picked)

</script>

<template>
  <Datepicker class="xyz w-72  text-center border-pink-500 rounded-3xl border-2 p-4 bg-white" v-model="picked" />
</template>

<style>
.xyz{
    --vdp-bg-color	: #f06;
    --vdp-bg-color	:#fff;	                           /* color */
    --vdp-text-color:#000;	                           /*color */
    --vdp-box-shadow: 0 4px 10px 0 rgba(128, 144, 160, 0.1), 0 0 1px 0 rgba(128, 144, 160, 0.81);	/* shadow */
    --vdp-border-radius:3px;	                        /* size*/
    --vdp-heading-size:2.5em;	                        /* size*/
    --vdp-heading-weight:bold;	                        /* weight*/
    --vdp-heading-hover-color:#eeeeee;	               /* color*/
    --vdp-arrow-color:black;	                       /* color*/
    --vdp-elem-color:black;	                       /* color*/
    --vdp-disabled-color:#d5d9e0;	                   /* color*/
    --vdp-hover-color:#fff;	                       /* color*/
    --vdp-hover-bg-color:#0baf74;	                   /* color*/
    --vdp-selected-color:#fff;	                       /* color*/
    --vdp-selected-bg-color:#0baf74;	               /* color*/
    --vdp-current-date-outline-color:#888888;         /* color*/
    --vdp-current-date-font-weight:bold;	            /* weight*/
    --vdp-elem-font-size:0.8em;	                        /* size*/
    --vdp-elem-border-radius:3px;       	            /* size*/
    --vdp-divider-color:#d5d9e0;	                   /* color */
}
</style>