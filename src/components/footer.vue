<template>
  <div class="footer-class">
    <h3 class="footer-text">Task Creator</h3>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useProfilesStore } from "../stores/profiles";

const profileStore = useProfilesStore();

//Minor changes
console.log(profileStore.fetchProfile());
</script>

<style></style>
