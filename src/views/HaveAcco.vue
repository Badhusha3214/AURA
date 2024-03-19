<template>
    <div class=" w-full flex justify-center mb-12">
                <div class="relative flex flex-col items-center gap-2 justify-center my-3">
                    <div class="w-full lg:w-1/3 py-4 lg:py-20 ">
            <img class="w-full h-full" src="../../public/assets/illustration/hello-animate.svg" alt="Socials" />
        </div>
                </div>
            </div>
    
    
        
    <div class="absolute w-full flex justify-center mb-12">
                <div class="relative flex flex-col items-center gap-2 justify-center my-3">
                    <div class="font-bold text-2xl w-72 p-3 rounded-full text-center">Welcome Back</div>
                </div>
            </div>

   
 <div class="absolute bottom-0 w-full flex justify-center mb-12">
                <div class="relative flex flex-col items-center gap-2 justify-center my-3">
                    <button class="text-white font-bold text-2xl w-72 p-3 rounded-full bg-primary" @click="nextaction()" >🌐 sign in with Gmail</button>
                    <!-- <button class="text-sm font-medium text-gray-500">I'm not sure</button> -->
                </div>
            </div>
</template>

<script>
export default{
    name : "HaveAcco",
    methods:{
        nextaction(){
            this.$router.push( "/home" );
        }

    }
    

}
</script>