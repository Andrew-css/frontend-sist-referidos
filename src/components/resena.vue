<script setup>
import { ref, onMounted } from 'vue'
import { useStoreReferido } from '../stores/referido.js'
import { useStoreReferente } from '../stores/referente.js';
import { useRouter } from 'vue-router';

const useReferidos = useStoreReferido();
const useReferentes = useStoreReferente();
const cedula = ref("")

async function getInfo() {
  try {

    const response = await useReferidos.getAll()
    console.log("hola soy referidos", response);
  } catch (error) {
    console.log(error);
  }
};

getInfo();

async function filtrarPorCedula() {
  try {
    const response = await useReferentes.getPorCedula(cedula.value)
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}


</script>

<template>
  <div class="container mt-5">
    <div class="text-end mb-4">
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalBuscarCedula">
        Buscar por cédula
      </button>
    </div>

    <div class="row">


      <!-- Modal -->
      <div class="modal fade" id="modalBuscarCedula" tabindex="-1" aria-labelledby="modalBuscarCedulaLabel"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalBuscarCedulaLabel">Buscar cantidad referidos</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <!-- Input para buscar por cédula -->
              <input type="text" class="form-control" v-model="cedula" placeholder="Ingrese la cédula">
            </div>
            <!-- Mostrar referentes -->
            <div class="row">
              <div class="col-md-4" v-for="(referente, index) in useReferentes.referentesCedulas" :key="index">
                <div class="card mb-4">
                  <div class="card-body">
                    <div class="d-flex align-items-center gap-2">
                      <i class="fas fa-user-circle" style="font-size: 36px; color: #666;"></i>
                      <h5 class="card-title ml-2">{{ referente.nombre }}</h5>
                    </div>
                    <p class="card-text">Cédula: {{ referente.cedula }}</p>
                    <p class="card-text">Correo: {{ referente.correo }}</p>
                    <p class="card-text">Teléfono: {{ referente.telefono }}</p>
                    <p class="card-text">Opinión: {{ referente.opinion }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <!-- Botón para buscar -->
              <button class="btn btn-success" @click="filtrarPorCedula">Buscar</button>

            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4" v-for="(referido, index) in useReferidos.referidos" :key="index">
        <div class="card mb-4">
          <div class="card-body">
            <div class="d-flex align-items-center gap-2">
              <i class="fas fa-user-circle" style="font-size: 36px; color: #666;"></i>
              <h5 class="card-title ml-2">{{ referido.nombre }}</h5>
            </div>
            <p class="card-text">Cédula: {{ referido.cedula }}</p>
            <p class="card-text">Correo: {{ referido.correo }}</p>
            <p class="card-text">Teléfono: {{ referido.telefono }}</p>
            <p class="card-text">Opinión: {{ referido.opinion }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.card-body {
  padding: 20px;
}

.card-title {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
}

.card-text {
  font-size: 16px;
  margin-bottom: 10px;
}

.card-text:last-child {
  margin-bottom: 0;
}


</style>
