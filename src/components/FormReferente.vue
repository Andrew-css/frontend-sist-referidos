<script setup>
import { ref } from 'vue'
import { useStoreReferido } from '../stores/referido.js';
import { useStoreReferente } from '../stores/referente.js';
import { useRouter } from 'vue-router';

const useReferidos = useStoreReferido();
const useReferentes = useStoreReferente();
const router = useRouter();

const nombre = ref("");
const cedula = ref("");
const correo = ref("");
const telefono = ref("");
const idReferid = ref(useReferidos.nuevoReferido)



async function getInfo() {
    try {

        const response = await useReferentes.getAll()
        console.log("hola soy referidos", response);
    } catch (error) {
        console.log(error);
    }
};

getInfo();

const agregarNuevoReferente = async () => {
    const data = {
        nombre: nombre.value,
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
            return
        }

    } catch (error) {
        console.log('Error al agregar  referido:', error);
    }
}



function goToMsg() {
    router.push("/msg")
}



</script>

<template>
    <div class="main">
        <div>
            <form @submit.prevent="agregarNuevoReferente">
                <h2 class="text-center">Formulario de datos - Referente</h2>
                <label class="fw-bold mt-4" for="nombre">Digite el nombre del referente</label>
                <input type="text" id="nombre" name="nombre" v-model="nombre" required><br><br>


                <label class="fw-bold" for="cedula">Digite la cédula del referente</label>
                <input type="number" id="cedula" name="cedula" v-model="cedula" required><br><br>

                <label class="fw-bold" for="correo">Digite el correo del referente</label>
                <input type="email" id="correo" name="correo" v-model="correo" required><br><br>

                <label class="fw-bold" for="telefono">Digite el telefono del referente</label>
                <input type="number" id="telefono" name="telefono" v-model="telefono" required><br><br>


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
    width: 100%;
    margin: 40px auto;
    padding: 20px;
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
    border: 1px solid #ccc;
}

input[type="submit"] {
    background-color: #4CAF50;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

input[type="submit"]:hover {
    background-color: #3e8e41;
}
</style>
