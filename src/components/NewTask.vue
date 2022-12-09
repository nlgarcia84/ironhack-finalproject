<template>
  <h1 class="titulo-nueva-task">Please introduce a new task</h1>
  <div v-if="showErrorMessage">
    <p class="error-text">{{ errorMessage }}</p>
  </div>
  <div class="nueva-task">
    <div class="input-field">
      <input
        type="text"
        placeholder="Add a your task here"
        v-model="name"
        @click="click2()"
      />
    </div>
    <div class="input-field">
      <input
        type="text"
        placeholder="Add a description here"
        v-model="description"
        @click="click2()"
      />
      <button @click="addTask" class="buttonAddTask">
        Click to add a new task
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";

const taskStore = useTaskStore();

// variables para los valors de los inputs
const name = ref("");
const description = ref("");

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const showErrorMessage = ref(false);

// const constant to save a variable that holds the value of the error message
const errorMessage = ref(null);
const emit = defineEmits(["getTasks"]);
let addTaskSound = () => new Audio("src/sound/interface.mp3").play();

// Arrow function para crear tareas.
const addTask = async () => {
  addTaskSound();
  if (name.value.length === 0 || description.value.length === 0) {
    // Primero comprobamos que ningún campo del input esté vacío y lanzamos el error con un timeout para informar al user.

    showErrorMessage.value = true;
    errorMessage.value = "The task title or description is empty";

    setTimeout(() => {
      showErrorMessage.value = false;
    }, 5000);
  } else {
    // Aquí mandamos los valores a la store para crear la nueva Task. Esta parte de la función tenéis que refactorizarla para que funcione con emit y el addTask del store se llame desde Home.vue.
    // llamamos a adtask y le pasamos los parametros de name y description
    await taskStore.addTask(name.value, description.value);
    name.value = "";
    description.value = "";
    emit("getTasks");
  }
};

let click2 = () => new Audio("src/sound/click2.mp3").play();
</script>

<style></style>
