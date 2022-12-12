<template>
  <Nav />
  <img
    :src="
      avatar_url
        ? avatar_url
        : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
    "
    alt="Profile picture"
  />
  <h1>Name: {{ username }}</h1>

  <button @click="" class="button-edit-profile">Edit your Profile</button>
</template>

<script setup>
import { supabase } from "../supabase";
import { onMounted, reactive, ref, toRefs } from "vue";
import { useUserStore } from "../stores/user";
import Nav from "../components/Nav.vue";

const userStore = useUserStore();

// Variable para guardar el perfil de supabase
const profile = ref("pepito");
const username = ref(null);
const avatar_url = ref(null);

// PREFILE
const getProfile = async () => {
  await userStore.fetchUser();
  profile.value = userStore.profile;
  username.value = profile.value.username;
};
getProfile();

onMounted(() => {
  //getProfile();
});
</script>

<style>
img {
  width: 200px;
  border-radius: 50%;
}
</style>
