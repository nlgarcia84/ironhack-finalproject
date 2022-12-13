<script setup>
// import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../supabase";
import { onMounted, reactive, ref, toRefs } from "vue";

//constant to save a variable that will hold the use router method
const route = "/";
const buttonText = "Todo app";
// constant to save a variable that will get the user from store with a computed function imported from vue
// const getUser = computed(() => useUserStore().user);
const getUser = useUserStore().user;
// constant that calls user email from the useUSerStore
const userEmail = getUser.email;
// constant that calls user name from useUserStore

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();
async function signOut() {
  await useUserStore().signOut();
  clickSound();
  redirect.push({ path: "/auth/login" });
}
let clickSound = () => new Audio("src/sound/clicksoundeffect.mp3").play();
</script>

<template>
  <nav>
    <!-- <PersonalRouter :route="route" :buttonText="buttonText" class="logo-link"/> -->
    <ul class="barra-nav-izq">
      <li class="efecto-hover">
        <router-link to="/">Home</router-link>
      </li>
      <li class="efecto-hover">
        <router-link to="/">Task Manager</router-link>
      </li>

      <li class="efecto-hover">
        <router-link to="/account">Your Account</router-link>
      </li>
    </ul>

    <!-- INICIO VERSION DE NAV PARA MOVIL -->
    <div class="nav-izquierdo-movil">
      <nav>
        <label for="touch"><span @click="clickSound()">☰</span></label>
        <input type="checkbox" id="touch" />

        <ul class="slide">
          <li><a href="/">Home</a></li>
          <li><a href="/">Task Manager</a></li>
          <li><a href="/account">Your Account</a></li>
        </ul>
      </nav>
      <!-- FIN VERSION DE NAV PARA MOVIL -->
    </div>

    <div>
      <ul class="barra-nav-der">
        <li class="log-out-welcome">
          <p>
            Welcome back
            <span class="user-bold">{{
              useUserStore().profile ? useUserStore().profile.username : "user"
            }}</span
            >!
          </p>
        </li>
        <li>
          <button @click="signOut" class="button-logout">Log out</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style></style>
