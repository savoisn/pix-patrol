<script setup>
import { ref } from 'vue';

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <img src="@/assets/pix-logo.svg" class="logo pix" alt="pix fr" />
  <h2>Pix Companion</h2>

</template>

<style scoped>
h2 {
    margin:0px;
}
    .logo {
      height: 6em;
      padding: 1.5em;
      margin:0px;
      will-change: filter;
      transition: filter 300ms;
    }
    .logo:hover {
      filter: drop-shadow(0 0 2em #54bc4ae0);
    }
    .logo.pix:hover {
      filter: drop-shadow(0 0 2em #0f69fee0);
    }
</style>
