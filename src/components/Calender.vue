
<template>
  <div>
    <h1>Calender</h1>

    <p>{{ clickCount }}</p>

  </div>
</template>

<script>
  export default {
    name: "Calender",
    props: {
      clickCount: Number
    }
  };
</script>