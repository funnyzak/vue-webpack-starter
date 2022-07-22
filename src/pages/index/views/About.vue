<template>
  <div class="about">
    <h1>This is an about page. {{ aboutText }}</h1>
  </div>
</template>

<script lang="ts">
export default {
  data: () => ({
    aboutText: "i'm eric"
  })
};
</script>
