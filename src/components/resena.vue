<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStoreReferido } from '../stores/referido.js'
import { useStoreReferente } from '../stores/referente.js';
import { useRouter } from 'vue-router';

const useReferidos = useStoreReferido();
const useReferentes = useStoreReferente();
const cedula = ref("");
const router = useRouter();
const searchQuery = ref("");
const mostrarTodosReferentes = ref(false);


async function getInfo() {
  try {
    const response = await useReferidos.getAll()
    console.log("hola soy referidos", response);
  } catch (error) {
    console.log(error);
  }
};

async function getInfoReferentes() {
  try {

    const response = await useReferentes.getAll();
    console.log("hola soy referentes", response);
  } catch (error) {
    console.log(error);
  }
};


function mostrarTodos() {
  mostrarTodosReferentes.value = true;
}


const filteredReferidos = computed(() => {
  return useReferidos.referidos.filter(referido => {
    if (referido.cedula === '1111111' || referido.cedula === '1234567890') {
      return false
    }
    return (referido.nombre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      referido.cedula.includes(searchQuery.value))


  })
})

const filteredReferentes = computed(() => {
  return useReferentes.referentes.filter(referente => {
    if ( referente.idReferido.cedula === '1234567890') {
      return false
    }
    return true
  })
})


async function filtrarPorCedula() {
  try {
    const response = await useReferentes.getPorCedula(cedula.value)
    mostrarTodosReferentes.value = false;
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

function home() {
  router.push("/")
}

onMounted(() => {
  getInfo();
  getInfoReferentes();

});

</script>

<template>
  <div class="container mt-5 ">
    <div class="mb-4" style="display: flex; flex-direction: row; justify-content: end; gap: 20px;">

      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalBuscarCedula">
        Buscar referidos
      </button>
      <button class="btn btn-danger fw-bold" @click="home()">
        Regresar
      </button>
    </div>

    <div class="row">
      <h1 class="text-center mb-3">Opiniones de nuestros clientes</h1>
      <div class="row justify-content-end mb-4">
        <input type="text" class="form-control w-25" v-model="searchQuery"
          placeholder="Buscar referido por nombre o cédula">
      </div>



      <div class="col-md-4" v-for="(referido, index) in filteredReferidos" :key="index">
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

      <!-- Modal buscar Referente-->
      <div class="modal fade" id="modalBuscarCedula" tabindex="-1" aria-labelledby="modalBuscarCedulaLabel"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalBuscarCedulaLabel">Buscar cantidad referidos</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style="width: 100%;">
              <!-- Input para buscar por cédula -->
              <input type="text" class="form-control" v-model="cedula" placeholder="Ingrese la cédula del referente">
              <div class="container text-center">
                <div class="row justify-content-center">
                  <div class="col-6 p-4">
                    <button class="btn btn-success btn-sm w-50" @click="filtrarPorCedula">Buscar</button>
                  </div>
                  <div class="col-6 p-4">
                    <button class="btn btn-success btn-sm w-50" @click="mostrarTodos">Ver todos</button>
                  </div>
                </div>
              </div>

            </div>
            <!-- Mostrar referidos de la cédula digitada -->
            <div class="row justify-content-center">
              <div class="col-md-5" v-for="(referente, index) in useReferentes.referentesCedulas" :key="index">
                <div class="card mb-5">
                  <div class="card-body">
                    <div class="d-flex align-items-center gap-2">
                      <i class="fas fa-user-circle" style="font-size: 36px; color: #666;"></i>
                      <h5 class="card-title ml-2">Nombre referente: {{ referente.nombre }}</h5>
                    </div>
                    <p class="card-text"><span class="fw-bold" style="font-weight: bold;">Cédula:</span> {{
                      referente.cedula }}</p>
                    <p class="card-text"><span class="fw-bold" style="font-weight: bold;">Correo:</span> {{
                      referente.correo }}</p>
                    <p class="card-text"><span class="fw-bold" style="font-weight: bold;">Teléfono:</span> {{
                      referente.telefono }}</p>
                    <p class="card-text"><span class="fw-bold" style="font-weight: bold;">Nombre referido:</span> {{
                      referente.idReferido.nombre }}</p>
                    <p class="card-text"><span class="fw-bold" style="font-weight: bold;">Cedula referido:</span> {{
                      referente.idReferido.cedula }}</p>
                  </div>
                </div>
              </div>

              <div class="col-md-5" v-for="(referente, index) in filteredReferentes" :key="index"
                v-if="mostrarTodosReferentes">
                <div class="card mb-5">
                  <div class="card-body">
                    <div class="d-flex align-items-center gap-2">
                      <i class="fas fa-user-circle" style="font-size: 36px; color: #666;"></i>
                      <h5 class="card-title ml-2">Nombre referente: {{ referente.nombre }}</h5>
                    </div>
                    <p class="card-text"><span class="fw-bold" style="font-weight: bold;">Cédula:</span> {{
                      referente.cedula }}</p>
                    <p class="card-text"><span class="fw-bold" style="font-weight: bold;">Correo:</span> {{
                      referente.correo }}</p>
                    <p class="card-text"><span class="fw-bold" style="font-weight: bold;">Teléfono:</span> {{
                      referente.telefono }}</p>
                    <p class="card-text"><span class="fw-bold" style="font-weight: bold;">Nombre referido:</span> {{
                      referente.idReferido.nombre }}</p>
                    <p class="card-text"><span class="fw-bold" style="font-weight: bold;">Cedula referido:</span> {{
                      referente.idReferido.cedula }}</p>
                  </div>
                </div>
              </div>
            </div>
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

.form-control {
  border: 1px solid #282727;
}
</style>
