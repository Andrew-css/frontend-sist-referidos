<script setup>
import { ref } from "vue";
import { useStoreUsuarios } from "../stores/usuario.js";
import { useRouter } from 'vue-router';
import NuevaPassword from "./nuevaContraseña.vue";

const router = useRouter();

// Verificar el código
const codigo = ref("");
const useUsuario = useStoreUsuarios();
const componenteNuevaPass = ref(false);
const loadVerificar = ref(false);

async function confirmarCodigo() {
  try {
    loadVerificar.value = true;
    const response = await useUsuario.confirmarCodigo(codigo.value);

    if (!response) return;
    
    componenteNuevaPass.value = true;
  } catch (error) {
    console.log(error);
  } finally {
    loadVerificar.value = false;
  }
}

// Validaciones
function validarCampos() {
  if (codigo.value === null || codigo.value === "") {
    console.log("Por favor complete todos los campos")
    return;
  }
  confirmarCodigo();
}

function home() {
  router.push('/login')
}
</script>

<template>
  <main class="container-fluid">
    <section v-if="!componenteNuevaPass">
      <div class="card col-12 col-md-8 col-lg-6 text-center">
        <div class="card-body">
          <h2 class="card-title">Verificar código</h2>
          <p class="card-text">Por favor, digite el código de verificación enviado a {{ useUsuario.email }}</p>
          <form @submit.prevent="validarCampos">
            <div class="form-group">
              <input type="number" id="codigo" class="form-control" v-model="codigo" />
            </div>
            <button type="submit" class="btn btn-primary" :disabled="loadVerificar">Enviar</button>
          </form>
        </div>
      </div>
    </section>

    <section v-if="componenteNuevaPass">
      <NuevaPassword />
    </section>
  </main>
</template>

<style scoped>
.header-container {
  flex-wrap: wrap;
}

.card {
  margin: 20px auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.card-text {
  font-size: 16px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-control:focus {
  border-color: #aaa;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.btn {
  color: white;
  font-weight: bold;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #337ab7;
  cursor: pointer;
}

.btn:hover {
  background-color: #23527c;
}

.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Responsivo */
@media screen and (max-width: 768px) {
  .company-name {
    font-size: 16px;
  }
}

@media screen and (max-width: 480px) {
  .company-name {
    font-size: 14px;
  }
}
</style>
