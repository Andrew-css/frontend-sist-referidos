<script setup>
import { ref, watch, onMounted } from 'vue'
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
const idReferid = ref(useReferidos.nuevoReferido);
const referente = ref("");
const referidos = ref([]);
const mensajeValidacion = ref("")
const isChecked = ref(false);



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
        referidos.value = response;
        console.log("hola soy referidos", response);
    } catch (error) {
        console.log(error);
    }
};

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
            mensajeValidacion.value = "Por favor escoja una opción"
            return;
        }
    } catch (error) {
        console.log('Error al agregar referido:', error);
    }
};

`async function getInfoId() {
    try {
        const response = await useReferidos.getPorId(idReferente.value);
        console.log("hola soy referidoID", response);
    } catch (error) {
        console.log(error);
    }
};`

watch(referente, (newValue) => {
    console.log("Hola soy referido selec", newValue);
    nombre.value = newValue.nombre;
    cedula.value = newValue.cedula;
    correo.value = newValue.correo;
    telefono.value = newValue.telefono;
    console.log("soy nombre value", nombre.value, cedula.value, correo.value, telefono.value)
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
        <div class="container ">

            <form @submit.prevent="agregarNuevoReferente" class="w-50">
                <p class="text-center fw-bold fs-5">Por favor seleccione el método por el que encontró nuestro servicio</p>
                <p class="text-danger text-center fw-bold fs-5">{{ mensajeValidacion }}</p>
                <div class="container text-center mb-3">
                    <div class="row justify-content-center" style="width: 100%;">
                        <div class="form-check form-switch col-6">
                            <input class="form-check-input" type="checkbox" role="switch" id="referidoPorAlguien"
                                v-model="isChecked" style="margin-left: 30%;">
                            <label class="form-check-label" for="referidoPorAlguien">Referido por alguien</label>
                        </div>
                        <div class="form-check form-switch col-6">
                            <input class="form-check-input" type="checkbox" role="switch" id="redesSociales"
                                style="margin-left: 30%;">
                            <label class="form-check-label" for="redesSociales">Redes sociales</label>
                        </div>

                    </div>
                    <div class="input-group mt-4" v-if="isChecked">
                        <select v-model="referente" class="form-select" id="inputGroupSelect03"
                            aria-label="Example select with button addon">
                            <option value="" disabled selected>Escoge tu referente...</option>
                            <option v-for="referido in referidos" :key="referido._id" :value="referido"
                                :disabled="referido._id === idReferid">{{ referido.nombre }}</option>
                        </select>
                    </div>
                </div>

                <input type="submit" value="Enviar">
            </form>
        </div>

        <div class="modal-dialog modal-dialog-centered" id="modalCentered" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="modalCenteredLabel" aria-hidden="true">
            ...
        </div>
    </div>
</template>

<style scoped>
.main {
    margin: 0;
    height: 100vh;
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

.form-select {
    border: 1px solid black;
}
</style>