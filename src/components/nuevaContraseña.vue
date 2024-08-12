<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStoreUsuarios } from "../stores/usuario.js";


const router = useRouter();
const isPwVisible = ref(false);
const isCheckPwVisible = ref(false);
const showOne = ref(true);
const showTwo = ref(false);

//Enviar nueva contraseña
const data = ref({ password: "" });
const checkPassword = ref("");
const useUsuario = useStoreUsuarios();
const loadNuevaPass = ref(false);

async function nuevaPassword() {
  try {
    loadNuevaPass.value = true;

    const response = await useUsuario.nuevaPassword(data.value);

    if (!response) return;

    if (response.status != 200) {
      console.log(response.error);
      return;
    }
    console.log("Contraseña actulizada con éxito");
  } catch (error) {
    console.log(error);
  } finally {
    loadNuevaPass.value = false;
    showOne.value = false;
    showTwo.value = true;
  }
}

// Validaciones
const vali = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
function validarCampos() {
  data.value = {
    ...data.value,
  };

  const arrData = Object.entries(data.value);
  for (const d of arrData) {
    if (d[1] === null) {
      console.log("Por favor complete todos los campos");
      return;
    }
    if (typeof d[1] === "string") {
      if (d[1].trim() === "") {
        console.log("Por favor complete todos los campos");
        return;
      }
    }
  }
  nuevaPassword();
}

function home() {
  router.push('/login')
}
</script>

<template>
    <main>
      <section class="container" v-if="showOne">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <img :src="logoSena" alt="" @click="home" style="max-width: 145px; cursor: pointer;">
          </div>
        </div>
        <form class="form" @submit.prevent="validarCampos">
          <div class="form-group">
            <label for="password">Por favor, ingrese la nueva contraseña</label>
            <input type="password" id="password" class="form-control" v-model="data.password" />
            <div class="invalid-feedback" v-if="!vali.test(data.password)">La contraseña debe contener una minúscula, una mayúscula, un número, un carácter especial y 8 carácteres.</div>
  
            <label for="confirm-password">Confirmar Contraseña</label>
            <input type="password" id="confirm-password" class="form-control" v-model="checkPassword" />
            <div class="invalid-feedback" v-if="checkPassword !== data.password">Las contraseñas no coinciden</div>
  
            <button type="submit" class="btn btn-primary" :disabled="loadNuevaPass">Cambiar Contraseña</button>
          </div>
        </form>
      </section>
  
      <section v-if="showTwo" id="second">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <img :src="logoSena" alt="" style="max-width: 145px;">
          </div>
        </div>
        <article id="stext">
          <div id="stext11">
            <p id="smessage">¡La contraseña ha sido cambiada exitosamente!</p>
            <div id="stext2">
              <p id="smessage2">Ahora puede ingresar al sistema</p>
              <button type="submit" class="btn btn-primary" @click="router.push('/')">Ir al inicio</button>
            </div>
          </div>
        </article>
      </section>
    </main>
  </template>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 20px;
    box-shadow: 25px 20px 5px #888888;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-control {
    width: 100%;
    font-size: 130%;
  }
  
  .btn {
    color: white;
    font-weight: bolder;
    font-size: 1.3rem;
    border-radius: 25px;
    cursor: pointer;
    width: 100%;
  }
  
  #second {
    width: 100%;
    height: 100vh;
  }
  
  #stext {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    min-height: 100vh;
  }
  
  #stext11 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    box-shadow: 25px 20px 5px #888888;
    width: 40%;
    padding: 25px;
    min-height: 40vh;
    gap: 50px;
  }
  
  #smessage {
    text-align: center;
    font-size: 315%;
    font-weight: bolder;
  }
  
  #smessage2 {
    font-size: 150%;
  }
  
  #stext2 {
    width: 50%;
    text-align: center;
  }
  
  @media screen and (max-width: 900px) and (min-width: 550px) {
    .form-group {
      width: 55%;
    }
  
    #stext11 {
      width: 70%;
      padding: 30px;
    }
  }
  
  @media screen and (max-width: 549px) and (min-width: 100px) {
    .form-group {
      width: 80%;
      box-shadow: none;
    }
  
    .logo{
      display: flex;
      justify-content: center;
    }
  
    #stext11 {
      width: 70%;
      padding-top: 30px;
      box-shadow: none;
    }
  
    #smessage {
      font-size: 250%;
    }
  
    #sbuttonpassword {
      width: 100%;
    }
  }
  </style>
