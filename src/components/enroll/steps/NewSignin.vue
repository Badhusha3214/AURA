<template>
<<<<<<< HEAD
    <div class=" w-full flex justify-center mb-12">
        <div class="relative flex flex-col items-center gap-2 justify-center my-3">
            <div class="w-full lg:w-1/3 py-4 lg:py-20 ">
=======
    <div class="w-full flex justify-center mb-12">
        <div class="relative flex flex-col items-center gap-2 justify-center my-3">
            <div class="w-full lg:w-1/3 py-4 lg:py-20">
>>>>>>> 4b4224db632d96670ad4670bdfaa546f1fa69833
                <img class="w-full h-full" src="/assets/illustration/Hello-cuate 1.svg" alt="Socials" />
            </div>
        </div>
    </div>

    <div class="absolute w-full flex justify-center mb-12">
        <div class="relative flex flex-col items-center gap-2 justify-center my-3">
<<<<<<< HEAD
            <div class="font-bold text-2xl w-72 rounded-full text-center">Welcome Back</div>
        </div>
    </div>



=======
            <div class="font-bold text-2xl w-72 rounded-full text-center">
                Welcome Back
            </div>
        </div>
    </div>

>>>>>>> 4b4224db632d96670ad4670bdfaa546f1fa69833
    <div class="absolute bottom-0 w-full flex justify-center mb-12">
        <div class="relative flex flex-col items-center gap-2 justify-center my-3">
            <!-- Modal toggle -->
            <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"
                class="text-white font-bold text-2xl w-72 p-3 rounded-full bg-primary" type="button">
                🌐 sign in with Gmail
            </button>
        </div>
    </div>
    <!-- Main modal -->
    <div id="authentication-modal" tabindex="-1" aria-hidden="true"
        class="hidden bg-zinc-800/75 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Enter Your Gmail
                    </h3>
                    <button type="button"
                        class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="authentication-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-4 md:p-5">
                    <form class="space-y-4" action="#">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                email</label>
                            <input type="email" name="email" id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="name@company.com" required />
                        </div>
                        <!-- <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div> -->
                        <!-- <div class="flex justify-between">
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                            </div>
                            <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                        </div>
                        <a href="#" class="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                    </div> -->
                        <div class="flex items-center mb-4">
                            <input id="default-checkbox" type="checkbox" value=""
<<<<<<< HEAD
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox"
                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sync your data, So
                                your data won’t be lost when your device changed.</label>
                        </div>
                        <button type="submit" @click="nextaction"
                            class="w-full text-white bg-pink-500 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Done</button>
=======
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="default-checkbox"
                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sync your data, So
                                your data won’t be lost when your device
                                changed.</label>
                        </div>
                        <button type="submit" @click="nextaction"
                            class="w-full text-white bg-pink-500 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Done
                        </button>
>>>>>>> 4b4224db632d96670ad4670bdfaa546f1fa69833
                        <!-- <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered? <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                    </div> -->
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
<<<<<<< HEAD

export default{
    name : "NewSignin",
    methods:{
        nextaction(){
            this.$router.push( '/OtpVerification' );
        }
    }
}
</script>
=======
export default {
    name: "NewSignin",
    methods: {
        nextaction() {
            this.$router.push("/OtpVerification");
        },
    },
};
</script>
>>>>>>> 4b4224db632d96670ad4670bdfaa546f1fa69833
