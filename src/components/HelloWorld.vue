<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';

let router = useRouter();

function goToFormulario() {
  router.push(`/formulario`);
}

function goToReseñas() {
  router.push(`/resena`);
}


</script>

<template>
  <div class="main">
    <div class="containerr">
      <a class="btn" @click="goToFormulario()">Responder formulario</a>
      <a class="btn" @click="goToReseñas()">Ver reseñas</a>
    </div>
  </div>
</template>

<style scoped>
.main {
  margin: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000;
}

.containerr {
  display: flex;
  justify-content: space-between;
  gap: 50px;
  width: 20%;

}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #404841ac;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
}

.btn:hover {
  background-color: #2d1a32;
  color: #fff;
}
</style>
