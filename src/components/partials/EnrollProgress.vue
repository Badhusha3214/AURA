
<template>

    <div class="my-10 py-10">
        <h1 class="text-2xl font-semibold p-3 text-center" v-html="question"></h1>
    </div>
    
</template>


<script>
    export default {
        name: 'EnrollProgress',
        props: {
            question: {
                type: String,
                required: true
            }
        }
    }
</script>