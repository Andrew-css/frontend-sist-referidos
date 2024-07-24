<script setup>
import { ref, watch, onMounted } from 'vue';
import { useStoreReferido } from '../stores/referido.js';
import { useStoreReferente } from '../stores/referente.js';
import { useRouter } from 'vue-router';

const useReferidos = useStoreReferido();
const useReferentes = useStoreReferente();
const router = useRouter();
const nombre = ref("");
const apellido = ref("");
const cedula = ref("");
const correo = ref("");
const telefono = ref("");
const idReferid = ref(useReferidos.nuevoReferido);
const referente = ref("");
const referidos = ref([]);
const mensajeValidacion = ref("");
const mostrarError = ref(false);

async function getInfoReferentes() {
    try {
        const response = await useReferentes.getAll();
        console.log("hola soy referentes", response);
    } catch (error) {
        console.log(error);
    }
};

async function getInfoReferidos() {
    try {
        const response = await useReferidos.getAll();
        response.sort((a, b) => {
            if (a.nombre < b.nombre) return -1;
            if (a.nombre > b.nombre) return 1;
            return 0;
        });
        referidos.value = response;
        console.log("hola soy referidos", response);
    } catch (error) {
        console.log(error);
    }
};


const agregarNuevoReferente = async () => {
    if (!referente.value) {
        mostrarError.value = !nombre.value;
        setTimeout(() => {
            mostrarError.value = false;
        }, 3500);
    }

    const data = {
        nombre: nombre.value,
        apellido: apellido.value,
        cedula: cedula.value,
        correo: correo.value,
        telefono: telefono.value,
        idReferido: idReferid.value,
    };

    try {
        const response = await useReferentes.agregar(data);

        if (useReferentes.estatus === 200) {
            goToMsg();
            console.log("Reseña añadida")
        } else if (useReferentes.estatus === 400) {
            return;
        }
    } catch (error) {
        console.log('Error al agregar referido:', error);
    }
};

watch(referente, (newValue) => {
    nombre.value = newValue.nombre;
    apellido.value = newValue.apellido;
    cedula.value = newValue.cedula;
    correo.value = newValue.correo;
    telefono.value = newValue.telefono;
});

function goToMsg() {
    router.push("/msg");
}

onMounted(() => {
    getInfoReferidos();
    getInfoReferentes();
});

</script>

<template>
    <div class="main">
        <div class="container" style="margin-top: 8%;">
            <form @submit.prevent="agregarNuevoReferente">
                <p class="text-center fw-bold fs-5" :class="mostrarError ? 'label-error' : 'label'">Por favor seleccione la
                    persona que le recomendó nuestro servicio</p>
                <div class="container text-center mb-3">
                    <div class="input-group mt-4">
                        <select v-model="referente" class="form-select input"
                            :class="mostrarError ? 'input-border' : 'input'" id="inputGroupSelect03"
                            aria-label="Example select with button addon">
                            <option value="" disabled selected>Escoge tu referente...</option>
                            <option v-for="referido in referidos" :key="referido._id" :value="referido"
                                :disabled="referido._id === idReferid">{{ referido.nombre }} {{ referido.apellido }}
                            </option>
                        </select>
                    </div>
                </div>
                <div style="width: 100%; display: flex; justify-content: center;">
                    <input type="submit" value="Enviar" class="boton-elegante">
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.main {
    margin: 0;
    height: 100vh;
    width: 100%;
    display: flex;
    background-color: #000000;
}

form {
    width: 45%;
    margin: 40px auto;
    padding: 40px;
    background-color: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}

.input {
    width: 100%;
    height: 45px;
    background-color: #05060f0a;
    border-radius: .5rem;
    padding: 0 1rem;
    border: 2px solid transparent;
    font-size: 1rem;
    transition: border-color .3s cubic-bezier(.25, .01, .25, 1) 0s, color .3s cubic-bezier(.25, .01, .25, 1) 0s, background .2s cubic-bezier(.25, .01, .25, 1) 0s;
}



.label {
    display: block;
    margin-bottom: .3rem;
    font-size: .9rem;
    font-weight: bold;
    transition: color .3s cubic-bezier(.25, .01, .25, 1) 0s;
}

.input:hover,
.input:focus,
.input-group:hover .input {
    outline: none;
    border-color: #05060f;
}

.input-group:hover .label,
.input:focus {
    color: #05060fc2;
}

.boton-elegante {
    padding: 5px 30px;
    border: 2px solid #2c2c2c;
    background-color: #1a1a1a;
    color: #ffffff;
    font-size: 1.2rem;
    cursor: pointer;
    border-radius: 30px;
    transition: all 0.4s ease;
    outline: none;
    position: relative;
    overflow: hidden;
    font-weight: bold;
}

.boton-elegante::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle,
            rgba(255, 255, 255, 0.25) 0%,
            rgba(255, 255, 255, 0) 70%);
    transform: scale(0);
    transition: transform 0.5s ease;
}

.boton-elegante:hover::after {
    transform: scale(4);
}

.boton-elegante:hover {
    border-color: #666666;
    background: rgb(128, 251, 128);
    color: black;
}

.label {
    color: black;
}

.label-error {
    display: block;
    margin-bottom: .3rem;
    font-weight: bold;
    transition: color .3s cubic-bezier(.25, .01, .25, 1) 0s;
    color: red;
}

.input-border {
    width: 100%;
    height: 44px;
    background-color: #05060f0a;
    border-radius: .5rem;
    padding: 0 1rem;
    font-size: 1rem;
    border: 2px solid red;
}

@media screen and (max-width: 768px) {
    form {
        width: 90%;
        padding: 20px;
    }

    .input {
        height: 40px;
    }

    .boton-elegante {
        padding: 5px 20px;
    }
}

@media screen and (max-width: 480px) {
    form {
        width: 95%;
        padding: 15px;
    }

    .input {
        height: 35px;
    }

    .boton-elegante {
        padding: 5px 15px;
    }
}</style>