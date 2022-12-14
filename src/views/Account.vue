<template>
  <Nav />
  <div class="top-form">
    <form
      class="form-widget upload-avatar transparent"
      @submit.prevent="updateProfile"
    >
      <!-- Add to body -->
      <Avatar v-model:path="avatar_url" size="10" />

      <!-- Other form elements -->
    </form>
    <h1>
      Your actual data:
      <h2>
        Name:
        {{ useUserStore().profile ? useUserStore().profile.username : "user" }}
      </h2>
      <h2>
        Email:
        {{ useUserStore().profile ? useUserStore().profile.email : "user" }}
      </h2>
    </h1>
  </div>
  <div class="formEditData">
    <h3>You can change your data in this form:</h3>
    <form class="form-widget" @submit.prevent="updateProfile">
      <div class="emailForm">
        <label for="email">New Email</label>
        <input class="email-editar" id="email" type="text" v-model="email" />
      </div>
      <div class="usernameForm">
        <label for="username">New Username</label>
        <input
          class="email-editar"
          id="username"
          type="text"
          v-model="username"
        />
      </div>
      <div>
        <button type="submit" class="boton-actualizar-datos">SUBMIT</button>
      </div>
    </form>
    <section class="min-height min-height-account"></section>
  </div>
  <div>
    <FooterVue />
  </div>
</template>

<script setup>
import { supabase } from "../supabase";
import { onMounted, reactive, ref, toRefs } from "vue";
import { useUserStore } from "../stores/user";
import Nav from "../components/Nav.vue";
import FooterVue from "../components/Footer.vue";
import Avatar from "../components/Avatar.vue";

const userStore = useUserStore();

// Variable para guardar el perfil de supabase

const profile = ref("");
const username = ref(null);
const email = ref("");
const avatar_url = ref(null);

// PREFILE
async function getProfile() {
  // loading.value = true;
  // const { user } = session.value;

  await userStore.fetchUser();

  username.value = userStore.profile.username;
  email.value = userStore.profile.email;
  avatar_url.value = userStore.profile.avatar_url;
}

async function updateProfile() {
  try {
    // loading.value = true;
    // const { user } = session.value;
    console.log("updating profile");
    const updates = {
      user_id: userStore.user.id,
      email: email.value,
      username: username.value,
      avatar_url: avatar_url.value,
    };

    let { error } = await supabase
      .from("userProfile")
      .update(updates)
      .match({ user_id: userStore.user.id });

    await getProfile();

    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    // loading.value = false;
  }
}

onMounted(() => {
  getProfile();
});
</script>

<style></style>
