<template>
  <div class="contenedor-todo">
    <div class="container">
      <div class="header">
        <div class="header-description">
          <h3 class="header-title">Log In to ToDo App</h3>
          <p class="header-subtitle">Start organizing your tasks!</p>
        </div>
      </div>

      <form @submit.prevent="signIn" class="form-sign-in">
        <div class="form">
          <div class="form-input">
            <label class="input-field-label">E-mail</label>
            <input
              type="email"
              class="input-field"
              placeholder="example@gmail.com"
              id="email"
              v-model="email"
              required
            />
          </div>

          <div class="form-input">
            <label class="input-field-label">Password</label>
            <input
              type="password"
              class="input-field"
              placeholder="**********"
              id="password"
              v-model="password"
              required
            />
          </div>

          <div id="container">
            <button class="btn-34" @click="click2()">
              <span class="circle" aria-hidden="true">
                <span class="icon arrow"></span>
              </span>
              <span class="button-text">Sign In</span>
            </button>
          </div>

          <div class="haveAccount">
            Don't have an account?
            <PersonalRouter
              :route="route"
              :buttonText="buttonText"
              class="sign-up-link"
            />
          </div>
        </div>
      </form>
      <div v-show="errorMsg">{{ errorMsg }}</div>
    </div>
    <!-- <div class="imagen-lado-form"></div> -->
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";
// Arrow function to Signin user to supaBase
const email = ref("");
const password = ref("");
const errorMsg = ref("");
const redirect = useRouter();
async function signIn() {
  await useUserStore().signIn(email.value, password.value);
  redirect.push({ path: "/" });
}
let click2 = () => new Audio("src/sound/click2.mp3").play();
/*
const signIn = async () => {
  try {
    const { error } = await supabase.auth.signIn({
      email: email.value,
      password: password.value,
    });
    useRouter().push({ path: "/" });
    if (error) throw error;
  } catch (error) {
    alert(error.error_description || error.message);
  }
};
*/
</script>

<style></style>
