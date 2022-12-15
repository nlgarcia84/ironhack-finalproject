<template>
  <transition name="slide-fade">
    <div v-if="showP" class="container">
      <div class="header">
        <div class="header-description">
          <h3 class="header-title2">Register</h3>
          <p class="header-subtitle2">Start organizing your tasks!</p>
        </div>
      </div>

      <form @submit.prevent="signUp" class="form-sign-up">
        <div class="form">
          <div class="form-input-up">
            <label class="input-field-label">E-mail</label>
            <input
              type="email"
              class="email-input"
              placeholder="example@gmail.com"
              id="email"
              v-model="email"
              required
            />
          </div>
          <div class="form-input">
            <label class="input-field-label">Username</label>
            <input
              type="text"
              class="email-input"
              placeholder="Your Username"
              id="username"
              v-model="username"
              required
            />
          </div>
          <!-- <div class="form-input">
            <label class="input-field-label">avatar</label>
            <input
              type="text"
              class="input-field"
              placeholder="Your Avatar"
              id="avatar_url"
              v-model="avatar_url"
              required
            /> -->
          <!-- </div> -->
          <div class="form-input">
            <label class="input-field-label">Password</label>
            <input
              type="password"
              class="email-input"
              placeholder="**********"
              id="password"
              v-model="password"
              required
            />
          </div>
          <div class="form-input">
            <label class="input-field-label">Confirm password</label>
            <input
              type="password"
              class="email-input"
              placeholder="**********"
              id="confirmPassword"
              v-model="confirmPassword"
              required
            />
          </div>
          <button class="stripe-button2" type="submit" @click="click2()">
            Sign Up
            <svg class="HoverArrow" width="12" height="12" aria-hidden="true">
              <g fill-rule="evenodd">
                <path class="HoverArrow__linePath" d="M0 6h8" />
                <path class="HoverArrow__tipPath" d="m1 1 5 5-5 5" />
              </g>
            </svg>
          </button>
          <div class="haveAccount2">
            Have an account?
            <PersonalRouter
              :route="route"
              :buttonText="buttonText"
              class="sign-up-link"
            />
          </div>
        </div>
      </form>
      <div v-show="errorMsg">{{ errorMsg }}</div>

      <section class="min-height-account-login"></section>
    </div>
  </transition>
  <div>
    <FooterVue />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
import FooterVue from "../components/footer.vue";

// Route Variables
const route = "/auth/login";
const buttonText = "Sign In";

// Input Fields
const email = ref("");
const password = ref("");
const username = ref("");

const confirmPassword = ref("");

// Error Message
const errorMsg = ref("");

// Router to push user once SignedUp to Log In
const redirect = useRouter();

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      // calls the user store and send the users info to backend to logIn
      await useUserStore().signUp(email.value, password.value, username.value);
      // redirects user to the homeView
      redirect.push({ path: "/auth/login" });
    } catch (error) {
      // displays error message
      errorMsg.value = error.message;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
};

let click2 = () => new Audio("src/sound/click2.mp3").play();

const showP = ref(false);
const loadComponent = () => {
  setTimeout(() => {
    showP.value = true;
  }, 50);
  console.log("hola");
};
loadComponent();
</script>

<style></style>
