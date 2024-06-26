<script setup>
import { ref } from 'vue'
import { useStoreReferido } from '../stores/referido.js'
import { useRouter } from 'vue-router';

let router = useRouter();

const nombre = ref("");
const cedula = ref("");
const correo = ref("");
const telefono = ref("");
const opinion = ref("");
const useReferidos = useStoreReferido();
const validacion = ref("")


async function getInfo() {
    try {

        const response = await useReferidos.getAll()
        console.log("hola soy referidos", response);
    } catch (error) {
        console.log(error);
    }
};

getInfo();

const agregarNuevoReferido = async () => {
    const data = {
        nombre: nombre.value,
        cedula: cedula.value,
        correo: correo.value,
        telefono: telefono.value,
        opinion: opinion.value,
    };

    try {
        const response = await useReferidos.agregar(data);

        if (useReferidos.estatus === 200) {
            goToFormReferente();
        } else if (useReferidos.estatus === 400) {
            validacion.value = useReferidos.validacion;
            return;
        }

    } catch (error) {
        console.log('Error al agregar  referido:', error);
    }
}

function goToFormReferente() {
    router.push('/formref')
}

</script>

<template>
    <div class="main">
        <div class="container">
            <form @submit.prevent="agregarNuevoReferido">
                <h2 class="text-center">Formulario de datos</h2>
                <h4 class="text-danger text-center fw-bold">{{ validacion }}</h4>
                <label class="fw-bold mt-4" for="nombre">Digite su nombre</label>
                <input type="text" id="nombre" name="nombre" v-model="nombre" required><br><br>


                <label class="fw-bold" for="cedula">Digite su cédula</label>
                <input type="number" id="cedula" name="cedula" v-model="cedula" required><br><br>

                <label class="fw-bold" for="correo">Digite su correo electrónico</label>
                <input type="email" id="correo" name="correo" v-model="correo" required><br><br>

                <label class="fw-bold" for="telefono">Digite su teléfono</label>
                <input type="number" id="telefono" name="telefono" v-model="telefono" required><br><br>

                <label class="fw-bold" for="opinion">Digite su opinión respecto al servicio ofrecido</label>
                <textarea id="opinion" name="opinion" v-model="opinion" required></textarea><br><br>

                <input type="submit" value="Enviar">
            </form>

        </div>
    </div>
</template>

<style scoped>
.main {
    margin: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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

label {
    display: block;
    margin-bottom: 10px;
}

input,
textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #3e3b3b;
}

input[type="submit"] {
    background-color: #000000;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
}

input[type="submit"]:hover {
    background-color: #f8e68f;
    color: black;
    font-weight: bold;
}
</style>
