<script setup>
import { ref } from 'vue'
import { useStoreReferido } from '../stores/referido.js'

const nombre = ref("");
const cedula = ref("");
const correo = ref("");
const telefono = ref("");
const opinion = ref("");
const useReferidos = useStoreReferido();

async function getInfo() {
    try {

        const response = await useReferidos.getAll()
        console.log("hola soy referidos", response);
    } catch (error) {
        console.log(error);
    }
};

getInfo();


</script>

<template>
    <div class="main">
        <div class="">
            <form>
                <h2 class="text-center">Formulario de datos</h2>
                <label class="fw-bold" for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" v-model="nombre"><br><br>

                <label class="fw-bold" for="cedula">Cédula:</label>
                <input type="number" id="cedula" name="cedula" v-model="cedula"><br><br>

                <label class="fw-bold" for="correo">Correo electrónico:</label>
                <input type="email" id="correo" name="correo" v-model="correo"><br><br>

                <label class="fw-bold" for="telefono">Teléfono:</label>
                <input type="tel" id="telefono" name="telefono" v-model="telefono"><br><br>

                <label class="fw-bold" for="opinion">Opinión:</label>
                <textarea id="opinion" name="opinion" v-model="opinion"></textarea><br><br>

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
