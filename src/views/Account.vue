<template>
  <!-- Add icon library -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />
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
    <div class="data-del-form" v-if="showData">
      <img :src="userStore.profile.avatar_url" alt="" />
      <h1>
        Your actual data:
        <h2>
          Name:
          {{
            useUserStore().profile ? useUserStore().profile.username : "user"
          }}
        </h2>
        <h2>
          Email:
          {{ useUserStore().profile ? useUserStore().profile.email : "user" }}
        </h2>
      </h1>
    </div>
  </div>

  <div class="formEditData">
    <div>
      <img
        class="loading-gif"
        v-if="loading"
        src="https://media.giphy.com/media/8fcK2DQ7Y05SfBk4zn/giphy.gif"
        alt=""
      />
    </div>
    <button class="buttonload" v-if="showHideLoader">
      <i class="fa fa-spinner fa-spin"></i>Loading
    </button>
    <button class="buttonload" v-else @click="toggleEditForm">
      Edit Profile
    </button>
    <form
      v-if="showEditForm"
      name="elformulario"
      class="form-widget"
      id="form-prevent"
      @submit.prevent="updateProfile"
    >
      <!-- <div class="emailForm">
        <label for="email">New Email</label>
        <input class="email-editar" id="email" type="text" v-model="email" />
      </div> -->
      <div>
        <div class="usernameForm">
          <label for="username">New Username</label>
          <input
            class="email-editar"
            id="username"
            type="text"
            v-model="username"
          />
        </div>
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
import FooterVue from "../components/footer.vue";
import Avatar from "../components/Avatar.vue";

const userStore = useUserStore();

const uploading = ref("");
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
  uploadAvatar();
  preguntaConfirma();
  loading.value = true;
  showData.value = false;
  showEditForm.value = !showEditForm.value;
  // showBotonCarga.value = !showBotonCarga.value;
  console.log(loading.value);
}

onMounted(() => {
  getProfile();
});

const showData = ref(true);
const showEditForm = ref(false);

const showHideLoader = ref(false);
const toggleEditForm = () => {
  setTimeout(() => {
    showHideLoader.value = !showHideLoader.value;
  }, 10);
  setTimeout(() => {
    showEditForm.value = true;
  }, 1000);
  setTimeout(() => {
    showHideLoader.value = !showHideLoader.value;
  }, 1000);
};

const loading = ref(false);
const preguntaConfirma = () => {
  if (confirm("Are you sure you want to modify the data?")) {
    setTimeout(() => {
      loading.value = false;
    }, 6000);
    setTimeout(() => {
      showData.value = true;
    }, 7000);
    setTimeout(() => {
      alert("Your data has been changed successfully!");
    }, 8000);
  }
};

const showBotonCarga = ref(false);

const files = ref();
const uploadAvatar = async (evt) => {
  console.log(uploadAvatar);
  files.value = evt.target.files;
  try {
    uploading.value = true;
    if (!files.value || files.value.length === 0) {
      throw new Error("You must select an image to upload.");
    }

    const file = files.value[0];
    const fileExt = file.name.split(".").pop();
    const filePath = `${Math.random()}.${fileExt}`;

    let { error: uploadError } = await supabase.storage
      .from("profiles")
      .upload(filePath, file);

    let { data } = await supabase
      .from("userProfile")
      .update({
        avatar_url: filePath,
      })
      .match({ id: userStore.user.id });

    console.log(filePath);
    if (uploadError) throw uploadError;
  } catch (error) {
    alert(error.message);
  } finally {
    uploading.value = false;
  }
};

// CODIGO JS DEL AVATAR
</script>

<style></style>
