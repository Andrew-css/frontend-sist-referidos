<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useStoreUsuarios } from '../stores/usuario.js'

let router = useRouter();
const useUsuarios = useStoreUsuarios();

const identificacion = ref("");
const password = ref("");
const msgValidacion = ref("");
const showPassword = ref(false);
const loadIngresar = ref(false);
const msgButton = ref("Ingresar");

const Login = async () => {
    loadIngresar.value = true;
    msgButton.value = "";
    if (!identificacion.value || !password.value) {
        msgValidacion.value = "Por favor, complete todos los campos";
        loadIngresar.value = false;
        msgButton.value = "Ingresar";
        setTimeout(() => {
            msgValidacion.value = "";
            return;
        }, 5000);
        return;
    }

    const data = {
        identificacion: identificacion.value,
        password: password.value,
    };

    try {
        const response = await useUsuarios.login(data);

        if (useUsuarios.estatus === 200) {
            loadIngresar.value = false;
            msgButton.value = "Ingresar";
            goToResena();
            console.log("Login exitoso")
        } else if (useUsuarios.estatus === 400) {
            msgValidacion.value = useUsuarios.validacion
            loadIngresar.value = false;
            msgButton.value = "Ingresar";
            setTimeout(() => {
                msgValidacion.value = "";
                return;
            }, 5000);
            return;
        } else if (useUsuarios.estatus === 401) {
            msgValidacion.value = useUsuarios.validacion
            loadIngresar.value = false;
            msgButton.value = "Ingresar";
            setTimeout(() => {
                msgValidacion.value = "";
                return;
            }, 5000);
            return;
        }
    } catch (error) {
        console.log('Error al logearse:', error);
        loadIngresar.value = false;
        msgButton.value = "Ingresar";
    }
};

const mostrarOcultarPassword = () => {
    showPassword.value = !showPassword.value;
};

function goToResena() {
    router.push('/resena')
}

</script>

<template>
    <div class="main">
        <div class="login-card">
            <div class="card-header">
                <div class="log">Iniciar sesión</div>
                <h4 class="text-danger text-center fw-bold">{{ msgValidacion }}</h4>
            </div>
            <form @submit.prevent="Login">
                <div class="form-group">
                    <label for="username">Identificación:</label>
                    <input name="username" id="username" type="number" v-model="identificacion">
                </div>
                <div class="form-group">
                    <label for="password">Contraseña:</label>
                    <div class="password-input">
                        <input name="password" id="password" :type="showPassword ? 'text' : 'password'" v-model="password">
                        <button type="button" @click="mostrarOcultarPassword">
                            <i class="fas" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
                        </button>
                    </div>
                </div>
                <div class="form-group">
                    <button value="Ingresar" type="submit">
                        <div v-if="loadIngresar">
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        </div>
                        {{ msgButton }}
                    </button>
                </div>
            </form>
        </div>

    </div>
</template>

<style scoped>
.main {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000000;
}

.login-card {
    width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #e8e8e8;
    box-shadow: 2px 2px 10px #ccc;
}

.card-header {
    text-align: center;
    margin-bottom: 20px
}

.card-header .log {
    margin: 0;
    font-size: 24px;
    color: black;
}

.form-group {
    margin-bottom: 15px;
}

label {
    font-size: 18px;
    margin-bottom: 5px;
}

input[type="number"],
input[type="password"],
input[type="text"] {
    width: 100%;
    padding: 12px 20px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    transition: 0.5s;
}

button[type="submit"] {
    width: 100%;
    background-color: #333;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button[type="submit"]:hover {
    background-color: #ccc;
    color: black;
}

.password-input {
    position: relative;
}

.password-input button {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    border: none;
    background: none;
    cursor: pointer;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
