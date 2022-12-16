<script setup>
import { ref, toRefs, watch } from "vue";
import { supabase } from "../supabase";
import { useUserStore } from "../stores/user";

const prop = defineProps(["path", "size"]);
const { path, size } = toRefs(prop);

const emit = defineEmits(["upload", "update:path"]);
const uploading = ref(false);
const src = ref("");
const files = ref();

const downloadImage = async () => {
  try {
    const { data, error } = await supabase.storage
      .from("profiles")
      .download(path.value);
    if (error) throw error;
    src.value = URL.createObjectURL(data);
  } catch (error) {
    console.error("Error downloading image: ", error.message);
  }
};

// Bring user store to access profile table
const userStore = useUserStore();

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
    emit("update:path", filePath);
    emit("upload");
  } catch (error) {
    alert(error.message);
  } finally {
    uploading.value = false;
  }
};

watch(path, () => {
  if (path.value) downloadImage();
});
</script>

<template>
  <div class="caja-avatar">
    <img
      v-if="src"
      :src="src"
      alt="Avatar"
      class="avatar-image"
      :style="{ height: size + 'em', width: size + 'em' }"
    />

    <div
      v-else
      class="avatar-no-image"
      :style="{ height: size + 'em', width: size + 'em' }"
    />
    <br />
    <label class="button primary block" for="single">
      {{ uploading ? "Uploading ..." : "" }}
    </label>
    <div>
      <input
        type="file"
        class="single"
        accept="image/*"
        @change="uploadAvatar"
        :disabled="uploading"
      />
    </div>
  </div>
</template>
