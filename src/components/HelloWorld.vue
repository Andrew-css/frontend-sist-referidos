<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';

let router = useRouter();

function goToFormulario() {
  router.push(`/formulario`);
}

function goToLogin() {
  router.push(`/login`);
}


</script>

<template>
  <div class="main">
    <div class="containerr">
      <a class="btn shadow__btn" id="btn" @click="goToFormulario()">Responder formulario</a>
      <a class="btn shadow__btn" id="btn" @click="goToLogin()">Ver reseñas</a>

    </div>
  </div>
</template>

<style scoped>
.main {
  margin: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000;
}

.containerr {
  display: flex;
  justify-content: space-between;
  width: 20%;
  gap: 50px;
}

.shadow__btn {
  padding: 10px 20px;
  border: none;
  font-size: 17px;
  color: #ffffff;
  border-radius: 7px;
  letter-spacing: 4px;
  font-weight: 700;
  text-transform: uppercase;
  transition: 0.5s;
  transition-property: box-shadow;
}

.shadow__btn {
  background: rgb(0, 0, 0);
  box-shadow: 0 0 25px rgb(255, 255, 255);
}



</style>
