<template>
  <router-link :to="route">{{ buttonText }}</router-link>
</template>

<script setup>
defineProps({
  route: String,
  buttonText: String,
});

/* definiciones

Router -> Define las rutas

router-link -> Me dirige al componente.
router-link -> carga y renderiza el componente asociado para mostrarlo por una salida de router-view por defecto o por la salida con su mismo nombre.

Router-View -> Me enseña el componente, es el punto de salida. Mientras tenga el componente cargado, aqui está la vista del router cargada.
*/
</script>

<style></style>
