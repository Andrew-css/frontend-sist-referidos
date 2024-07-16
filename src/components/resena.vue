<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStoreReferido } from '../stores/referido.js'
import { useStoreReferente } from '../stores/referente.js';
import { useStoreUsuarios } from '../stores/usuario.js';
import { useRouter } from 'vue-router';
import { utils, write } from 'xlsx';
import logoHere from "../assets/logo.png";

const useReferidos = useStoreReferido();
const useReferentes = useStoreReferente();
const useUsuario = useStoreUsuarios();
const cedula = ref("");
const cedulaReferido = ref("");
const router = useRouter();
const searchQuery = ref("");
const validacion = ref("");
const referentes = ref("");
const nombreReferente = ref("");
const apellidoReferente = ref("");
const cedulaReferente = ref("");
const correoReferente = ref("");
const telefonoReferente = ref("");
const nombreReferido = ref("");
const apellidoReferido = ref("");
const cedulaRefido = ref("");
const correoReferido = ref("");
const telefonoReferido = ref("");
const msgNoReferido = ref("");
const mostrarReferidos = ref(false);
const mostrar = ref(false);
const mostrarReferentes = ref(false);
const mostrarDescargas = ref(false);
const loadIngresar = ref(false);
const msgButton = ref("Buscar");


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
      referido.apellido.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      referido.cedula.includes(searchQuery.value) ||
      referido.correo.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      referido.telefono.includes(searchQuery.value) ||
      referido.metodo.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      referido.opinion.toLowerCase().includes(searchQuery.value.toLowerCase()))
  })
})



async function filtrarPorCedulaReferente() {
  loadIngresar.value = true;
  msgButton.value = "";
  try {
    const response = await useReferentes.getPorCedula(cedula.value)
    console.log(response);
    if (useReferentes.estatus === 200 && response.length > 0) {
      nombreReferente.value = response[0].nombre;
      apellidoReferente.value = response[0].apellido;
      cedulaReferente.value = response[0].cedula;
      correoReferente.value = response[0].correo;
      telefonoReferente.value = response[0].telefono;
      mostrarReferidos.value = true;
      msgNoReferido.value = "";
      loadIngresar.value = false;
      msgButton.value = "Buscar";
    } else {
      msgNoReferido.value = "La cédula digitada no tiene referidos"
      nombreReferente.value = "";
      apellidoReferente.value = "";
      cedulaReferente.value = "";
      correoReferente.value = "";
      telefonoReferente.value = "";
      mostrarReferidos.value = false;
      loadIngresar.value = false;
      msgButton.value = "Buscar";
    }

  } catch (error) {
    console.log(error);
    mostrarReferidos.value = false;
    msgButton.value = "Buscar";
  }
}

async function filtrarPorCedulaReferido() {
  loadIngresar.value = true;
  msgButton.value = "";
  try {
    const response = await useReferentes.getPorCedulaReferido(cedulaReferido.value);
    console.log("h", response);

    if (useReferentes.estatus === 200) {
      nombreReferido.value = response.idReferido.nombre;
      apellidoReferido.value = response.idReferido.apellido;
      cedulaRefido.value = response.idReferido.cedula;
      correoReferido.value = response.idReferido.correo;
      telefonoReferido.value = response.idReferido.telefono;
      mostrarReferentes.value = true;
      referentes.value = response;
      mostrar.value = true;
      msgNoReferido.value = "";
      mostrarReferidos.value = false;
      loadIngresar.value = false;
      msgButton.value = "Buscar";
    } else if (useReferentes.estatus === 404) {
      validacion.value = useReferentes.validacion
      nombreReferido.value = "";
      apellidoReferido.value = "";
      correoReferido.value = "";
      telefonoReferido.value = "";
      mostrarReferentes.value = false;
      mostrarReferidos.value = false;
      loadIngresar.value = false;
      msgButton.value = "Buscar";
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
    mostrarReferidos.value = false;
    msgButton.value = "Buscar";
  }
}

async function descargarReferentes() {

  useReferentes.referentes.sort((a, b) => {
    if (a.nombre < b.nombre) return -1;
    if (a.nombre > b.nombre) return 1;
    return 0;
  });

  const referentes = useReferentes.referentes.map(referente => {
    return {
      Nombre: referente.nombre,
      Apellidos: referente.apellido,
      Cedula: referente.cedula,
      Correo_electronico: referente.correo,
      Telefono: referente.telefono,
      Nombre_Referido: referente.idReferido.nombre,
      Cedula_Referido: referente.idReferido.cedula,
      Correo_Referido: referente.idReferido.correo,
      Telefono_Referido: referente.idReferido.telefono
    };
  });


  const worksheet = utils.json_to_sheet(referentes);


  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Referentes');

  const blob = new Blob([write(workbook, { bookType: 'xlsx', type: 'buffer' })], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });


  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'referentes.xlsx';
  a.click();
  URL.revokeObjectURL(url);
}

async function descargarReferidos() {


  useReferidos.referidos.sort((a, b) => {
    if (a.nombre < b.nombre) return -1;
    if (a.nombre > b.nombre) return 1;
    return 0;
  });

  const referidos = useReferidos.referidos.map(referido => {
    return {
      Nombre: referido.nombre,
      Apellidos: referido.apellido,
      Cedula: referido.cedula,
      Correo_electronico: referido.correo,
      Telefono: referido.telefono
    };
  });


  const worksheet = utils.json_to_sheet(referidos);


  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Referidos');

  const blob = new Blob([write(workbook, { bookType: 'xlsx', type: 'buffer' })], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });


  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'referidos.xlsx';
  a.click();
  URL.revokeObjectURL(url);
}


function seleccionarDescarga() {
  mostrarDescargas.value = true;
}

function home() {
  useUsuario.token = '';
  useUsuario.usuario = '';
  useUsuario.id = '';
  router.push("/login")

}

onMounted(() => {
  getInfo();
  getInfoReferentes();

});

</script>

<template>
  <div style="width: 100%; height: 100%;">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid" style="width: 100%;">
        <div style="width: 50%;">
          <img :src="logoHere" alt="" style="max-width: 100px; max-height: 100px;">
          <span class="fw-bold fs-4">Nombre Empresa</span>
        </div>
        <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent" style="width: 50%;">
          <div id="botones">
            <button class="btn btn-dark fw-bold" data-bs-toggle="modal" data-bs-target="#modalBuscarReferidos">
              Buscar referidos
            </button>
            <button class="btn btn-dark fw-bold" data-bs-toggle="modal" data-bs-target="#modalBuscarReferentes">
              Buscar referente
            </button>
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalDescarga">
              <i class="fas fa-download"></i>
            </button>
            <button class="btn btn-danger fw-bold" @click="home()" id="logOut">
              <i class="fas fa-right-from-bracket"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>




    <div class="row" style="width: 100%;">

      <div class="row justify-content-end mb-4">
        <h1 class="text-center mt-3">Opiniones de nuestros clientes</h1>
        <input type="text" class="form-control w-25" v-model="searchQuery" placeholder="Buscar cualquier campo...">
      </div>

      <div class="col-md-4 px-5" v-for="(referido, index) in filteredReferidos" :key="index">
        <div class="card mb-4">
          <div class="card-body">
            <div class="d-flex align-items-center gap-2">
              <i class="fas fa-user-circle" style="font-size: 36px; color: #666;"></i>
              <h5 class="card-title ml-2">{{ referido.nombre }} {{ referido.apellido }}</h5>
            </div>
            <p class="card-text mt-2">Cédula: {{ referido.cedula }} </p>
            <p class="card-text">Correo: {{ referido.correo }}</p>
            <p class="card-text">Teléfono: {{ referido.telefono }}</p>
            <p class="card-text">Método: {{ referido.metodo }}</p>
            <VMenu class="vmenu">
              <p class="opinion">Opinión: {{ referido.opinion || 'No aplica' }}</p>
              <template #popper>
                <div class="descripVmenu">{{ referido.opinion || 'No aplica' }}</div>
              </template>
            </VMenu>
          </div>
        </div>
      </div>

      <!-- Modal buscar referido por referente-->
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
                    <button value="Buscar" class="btn btn-success btn-sm w-50" @click="filtrarPorCedulaReferente">
                      <div v-if="loadIngresar">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      </div>
                      {{ msgButton }}
                    </button>
                  </div>
                  <h4 class="text-danger text-center fw-bold">{{ msgNoReferido }}</h4>
                  <div class="row justify-content-center" v-if="mostrarReferidos">
                    <h1 class="mb-3">Referente</h1>
                    <table class="mb-4">
                      <tr>
                        <th>Nombre</th>
                        <th>Cédula</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                      </tr>
                      <tr>
                        <td>{{ nombreReferente }} {{ apellidoReferente }}</td>
                        <td>{{ cedulaReferente }}</td>
                        <td>{{ correoReferente }}</td>
                        <td>{{ telefonoReferente }}</td>
                      </tr>
                    </table>
                    <hr class="my-3">
                    <h1 class="mb-3">Referidos</h1>

                    <!-- Mostrar referidos de la cédula digitada -->
                    <table>
                      <tr>
                        <th>Nombre</th>
                        <th>Cédula</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                      </tr>
                      <tr v-for="(referente, index) in useReferentes.referentesCedulas" :key="index">
                        <td>{{ referente.idReferido.nombre }} {{ referente.idReferido.apellido }}</td>
                        <td>{{ referente.idReferido.cedula }}</td>
                        <td>{{ referente.idReferido.correo }}</td>
                        <td>{{ referente.idReferido.telefono }}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
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

                <div class="row justify-content-center">
                  <div class="col-6 p-4">
                    <button value="Buscar" class="btn btn-success btn-sm w-50" @click="filtrarPorCedulaReferido">
                      <div v-if="loadIngresar">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      </div>
                      {{ msgButton }}
                    </button>
                  </div>
                </div>
                <h4 class="text-danger text-center fw-bold mt-3">{{ validacion }}</h4>

                <div class="row justify-content-center" v-if="mostrarReferentes">
                  <h1 class="mb-4">Referido</h1>
                  <table class="mb-4">
                    <tr>
                      <th>Nombre</th>
                      <th>Cédula</th>
                      <th>Correo</th>
                      <th>Teléfono</th>
                    </tr>
                    <tr>
                      <td>{{ nombreReferido }} {{ apellidoReferido }}</td>
                      <td>{{ cedulaRefido }}</td>
                      <td>{{ correoReferido }}</td>
                      <td>{{ telefonoReferido }}</td>
                    </tr>
                  </table>

                  <hr class="my-3">
                  <h1>Referente</h1>
                </div>
              </div>
            </div>

            <!-- Mostrar referente de la cédula digitada -->
            <div class="container p-3" v-if="mostrar" style="display: flex; flex-direction: column; align-items: center;">
              <table>
                <tr>
                  <th>Nombre</th>
                  <th>Cédula</th>
                  <th>Correo</th>
                  <th>Teléfono</th>
                </tr>
                <tr>
                  <td>{{ referentes.nombre }} {{ referentes.apellido }}</td>
                  <td>{{ referentes.cedula }}</td>
                  <td>{{ referentes.correo }}</td>
                  <td>{{ referentes.telefono }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Modal seleccionar descarga -->
    <div class="modal fade" id="modalDescarga" tabindex="-1" aria-labelledby="modalBuscarReferentesLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <p class="fw-bold text-center">Seleccione la lista de datos que desea descargar</p>
          <div class="d-flex justify-content-center gap-5">
            <button @click="descargarReferidos()" id="buttony">Referidos</button>
            <button @click="descargarReferentes()" id="buttonn">Referentes</button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<style scoped>
#botones {
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 20px;
  height: 40px;
}

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

hr {
  background: rgb(0, 0, 0);
  height: 5px;
  border: 0;
  opacity: 1;
  width: 100%;
}

#logOut:hover {
  background-color: #ffffff;
  border-color: #000000;
}

#logOut:hover i.fas {
  color: #000000;
}

table {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #ccc;

}

th,
td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
  text-align: center;
}

th {
  background-color: #eee;
  font-weight: bold;
}

td {
  vertical-align: top;
}

.modal-dialog {
  max-width: 600px;
  max-height: 800px;
}

#modalDescarga {
  font-family: Arial, sans-serif;
  border-radius: 5px;
  padding: 20px;
  margin: 40px auto;
}

#modalDescarga .modal-content {
  padding: 20px;
}

#modalDescarga .modal-header {
  border: none;
  max-height: 20px
}


#buttony,
#buttonn {
  background-color: #4CAF50;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

#buttony:hover,
#buttonn:hover {
  background-color: #3e8e41;
}



@media screen and (max-width: 768px) and (min-width: 386px) {
  #logoBoton {
    display: flex;
    flex-direction: column;
  }
}

@media screen and (max-width: 385px) {
  #logoBoton {
    display: flex;
    flex-direction: column;
  }

  #botones {
    display: block;
    justify-content: initial;
    gap: 0;
    height: auto;
  }
}
</style>
