<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStoreReferido } from '../stores/referido.js'
import { useStoreReferente } from '../stores/referente.js';
import { useRouter } from 'vue-router';

const useReferidos = useStoreReferido();
const useReferentes = useStoreReferente();
const cedula = ref("");
const cedulaReferido = ref("");
const router = useRouter();
const searchQuery = ref("");
const validacion = ref("");
const referentes = ref("");
const nombreReferente = ref("");
const cedulaReferente = ref("");
const correoReferente = ref("");
const telefonoReferente = ref("");
const nombreReferido = ref("");
const correoReferido = ref("");
const telefonoReferido = ref("");
const msgNoReferido = ref("");
const mostrarReferidos = ref(false);
const mostrar = ref(false);
const mostrarReferentes = ref(false);




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


const filteredReferidos = computed(() => {
  return useReferidos.referidos.reverse().filter(referido => {
    return (referido.nombre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      referido.cedula.includes(searchQuery.value) ||
      referido.correo.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      referido.telefono.includes(searchQuery.value) ||
      referido.metodo.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      referido.opinion.toLowerCase().includes(searchQuery.value.toLowerCase()))
  })
})



async function filtrarPorCedulaReferente() {
  try {
    const response = await useReferentes.getPorCedula(cedula.value)
    console.log(response);
    if (useReferentes.estatus === 200 && response.length > 0) {
      nombreReferente.value = response[0].nombre;
      cedulaReferente.value = response[0].cedula;
      correoReferente.value = response[0].correo;
      telefonoReferente.value = response[0].telefono;
      mostrarReferidos.value = true;
      msgNoReferido.value = "";
    } else {
      msgNoReferido.value = "La cédula digitada no tiene referidos"
      nombreReferente.value = "";
      cedulaReferente.value = "";
      correoReferente.value = "";
      telefonoReferente.value = "";
      mostrarReferidos.value = false;
    }

  } catch (error) {
    console.log(error);
  }
}

async function filtrarPorCedulaReferido() {
  try {
    const response = await useReferentes.getPorCedulaReferido(cedulaReferido.value);
    console.log("h",response);

    if (useReferentes.estatus === 200) {
      nombreReferido.value = response.idReferido.nombre;
      cedulaReferido.value = response.idReferido.cedula;
      correoReferido.value = response.idReferido.correo;
      telefonoReferido.value = response.idReferido.telefono;
      mostrarReferentes.value = true;
      referentes.value = response;
      mostrar.value = true;
      msgNoReferido.value = "";
    } else if (useReferentes.estatus === 404) {
      validacion.value = useReferentes.validacion
      nombreReferido.value = "";
      correoReferido.value = "";
      telefonoReferido.value = "";
      mostrarReferentes.value = false;
      mostrar.value = false;
      setTimeout(() => {
        validacion.value = "";
        return;
      }, 5000);
    } else {
      return;
    }
  } catch (error) {
    console.log("error", error);
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
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalBuscarReferidos">
        Buscar referidos
      </button>
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalBuscarReferentes">
        Buscar referentes
      </button>
      <button class="btn btn-danger fw-bold" @click="home()">
        Regresar
      </button>
    </div>

    <div class="row">
      <h1 class="text-center mb-3">Opiniones de nuestros clientes</h1>
      <div class="row justify-content-end mb-4">
        <input type="text" class="form-control w-25" v-model="searchQuery" placeholder="Buscar cualquier campo">
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
            <p class="card-text">Método: {{ referido.metodo }}</p>
            <VMenu class="vmenu">
              <p class="opinion">Opinión: {{ referido.opinion }}</p>

              <template #popper>
                <div class="descripVmenu">{{ referido.opinion }}</div>
              </template>
            </VMenu>
          </div>
        </div>
      </div>

      <!-- Modal buscar Referente-->
      <div class="modal fade" id="modalBuscarReferidos" tabindex="-1" aria-labelledby="modalBuscarReferidosLabel"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalBuscarReferidosLabel">Buscar referidos por referente</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style="width: 100%;">
              <!-- Input para buscar por cédula -->
              <input type="text" class="form-control" v-model="cedula" placeholder="Ingrese la cédula del referente">
              <div class="container text-center">
                <div class="row justify-content-center">
                  <div class="col-6 p-4">
                    <button class="btn btn-success btn-sm w-50" @click="filtrarPorCedulaReferente">Buscar</button>
                  </div>
                  <!-- Boton mostrar todos
                                                      <div class="col-6 p-4">
                                                          <button class="btn btn-success btn-sm w-50" @click="mostrarTodos">Ver todos</button>
                                                      </div>
                                                      -->
                  <h4 class="text-danger text-center fw-bold">{{ msgNoReferido }}</h4>
                  <div class="container" v-if="mostrarReferidos" style="width: 75%;">
                    <div class=" p-3" style="border: 4px solid black; border-radius: 10px;">
                      <p class="card-text"><span class="fw-bold fs-5" style="font-weight: bold;">Referente:</span>
                        {{
                          nombreReferente }}</p>
                      <p class="card-text"><span class="fw-bold fs-5" style="font-weight: bold;">Cedula:</span>
                        {{
                          cedulaReferente }}</p>
                      <p class="card-text"><span class="fw-bold fs-5" style="font-weight: bold;">Correo:</span>
                        {{
                          correoReferente }}</p>
                      <p class="card-text"><span class="fw-bold fs-5" style="font-weight: bold;">Teléfono:</span>
                        {{
                          telefonoReferente }}</p>

                    </div>
                    <h1 class="mt-3">Referidos</h1>
                  </div>

                </div>
              </div>

            </div>
            <!-- Mostrar referidos de la cédula digitada -->
            <div class="row justify-content-center">
              <div class="col-md-5" v-for="(referente, index) in useReferentes.referentesCedulas" :key="index">
                <div class="card mb-5">
                  <div class="card-body container" style="height: 250px; width: 200px">
                    <div class="d-flex align-items-center gap-2">
                      <i class="fas fa-user-circle" style="font-size: 36px; color: #666;"></i>
                      <h5 class="card-text"><span class="fw-bold" style="font-weight: bold;">Referido:</span>
                        {{
                          referente.idReferido.nombre }}</h5>
                    </div>
                    <p class="card-text"><span class="fw-bold" style="font-weight: bold;">Cédula:</span>
                      {{
                        referente.idReferido.cedula }}</p>
                    <p class="card-text"><span class="fw-bold" style="font-weight: bold;">Correo:</span>
                      {{
                        referente.idReferido.correo }}</p>
                    <p class="card-text"><span class="fw-bold" style="font-weight: bold;">Teléfono:</span> {{
                      referente.idReferido.telefono }}</p>
                  </div>
                </div>
              </div>
              <!--
                                                                                <div class="col-md-5" v-for="(referente, index) in filteredReferentes" :key="index"
                                                                                    v-if="mostrarTodosReferentes">
                                                                                    <div class="card mb-5">
                                                                                        <div class="card-body">
                                                                                            <div class="d-flex align-items-center gap-2">
                                                                                                <i class="fas fa-user-circle" style="font-size: 36px; color: #666;"></i>
                                                                                                <h5 class="card-title ml-2">Nombre referente: {{ referente.nombre }}</h5>
                                                                                            </div>
                                                                                            <p class="card-text"><span class="fw-bold" style="font-weight: bold;">Cédula:</span>
                                                                                                {{
                                                                                                    referente.cedula }}</p>
                                                                                            <p class="card-text"><span class="fw-bold" style="font-weight: bold;">Correo:</span>
                                                                                                {{
                                                                                                    referente.correo }}</p>
                                                                                            <p class="card-text"><span class="fw-bold"
                                                                                                    style="font-weight: bold;">Teléfono:</span> {{
                                                                                                        referente.telefono }}</p>
                                                                                            <p class="card-text"><span class="fw-bold" style="font-weight: bold;">Nombre
                                                                                                    referido:</span> {{
                                                                                                        referente.idReferido.nombre }}</p>
                                                                                            <p class="card-text"><span class="fw-bold" style="font-weight: bold;">Cedula
                                                                                                    referido:</span> {{
                                                                                                        referente.idReferido.cedula }}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>-->
            </div>
          </div>
        </div>
      </div>

      <!-- Mostrar referente de la cédula digitada -->
      <div class="modal fade" id="modalBuscarReferentes" tabindex="-1" aria-labelledby="modalBuscarReferentesLabel"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalBuscarReferentesLabel">Buscar referente</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style="width: 100%;">
              <!-- Input para buscar por cédula -->
              <input type="number" class="form-control" v-model="cedulaReferido"
                placeholder="Ingrese la cédula del referido">
              <div class="container text-center">
                <h4 class="text-danger text-center fw-bold mt-3">{{ validacion }}</h4>
                <div class="row justify-content-center">
                  <div class="col-6 p-4">
                    <button class="btn btn-success btn-sm w-50" @click="filtrarPorCedulaReferido">Buscar</button>
                  </div>
                </div>
              </div>

            </div>
            <!-- Mostrar referente de la cédula digitada -->
            <div class="container text-center" v-if="mostrarReferentes" style="display: flex; flex-direction: column; justify-content: center; width: 75%;">
              <div class="p-3" style="border: 4px solid black; border-radius: 10px;">
                <p class="card-text"><span class="fw-bold fs-5" style="font-weight: bold;">Referido:</span>
                  {{
                    nombreReferido }}</p>
                <p class="card-text"><span class="fw-bold fs-5" style="font-weight: bold;">Cedula:</span>
                  {{
                    cedulaReferido }}</p>
                <p class="card-text"><span class="fw-bold fs-5" style="font-weight: bold;">Correo:</span>
                  {{
                    correoReferido }}</p>
                <p class="card-text"><span class="fw-bold fs-5" style="font-weight: bold;">Teléfono:</span>
                  {{
                    telefonoReferido }}</p>
              </div>
              <h1 class="mt-3"></h1>
            </div>

            <div class="container" v-if="mostrar">
              <div class="card mb-5">
                <div class="card-body">
                  <div class="d-flex align-items-center gap-3">
                    <i class="fas fa-user-circle" style="font-size: 36px; color: #666;"></i>
                    <h5 class="card-text fs-5"><span class="fw-bold fs-5" style="font-weight: bold;">Referente:</span>
                      {{
                        referentes.nombre }}</h5>
                  </div>
                  <p class="card-text"><span class="fw-bold" style="font-weight: bold;">Cédula:</span>
                    {{
                      referentes.cedula }}</p>
                  <p class="card-text"><span class="fw-bold" style="font-weight: bold;">Correo:</span>
                    {{
                      referentes.correo }}</p>
                  <p class="card-text"><span class="fw-bold" style="font-weight: bold;">Teléfono:</span>
                    {{
                      referentes.telefono }}</p>
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

.opinion {
  max-width: 400px;
  max-height: 23px;
  word-wrap: break-word;
  overflow: hidden;
}

.vmenu {
  max-height: 50px;
}

.descripVmenu {
  padding: 1rem;
  word-wrap: break-word;
  height: fit-content;
  max-height: 300px;
  max-width: 300px;
}
</style>
