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
const metodo = ref("");
const useReferidos = useStoreReferido();
const validacion = ref("");
const opciones = ref([{ nombre: "Referido" }, { nombre: "Redes sociales" }, { nombre: "Otro" }])


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
    if (!nombre.value || !cedula.value || !correo.value || !telefono.value || !opinion.value || !metodo.value) {
        validacion.value = "Por favor, complete todos los campos";
        setTimeout(() => {
        validacion.value = "";
        return;
      }, 5000);
        return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(correo.value)) {
        validacion.value = "Por favor, ingrese un correo electrónico válido";
        setTimeout(() => {
        validacion.value = "";
        return;
      }, 5000);
        return;
    }

    if (metodo.value === "") {
        validacion.value = "Por favor, seleccione una opción en el método";
        setTimeout(() => {
        validacion.value = "";
        return;
      }, 5000);
        return;
    }
    
    if (metodo.value === "Redes sociales" || metodo.value === "Otro") {

        const data = {
            nombre: nombre.value,
            cedula: cedula.value,
            correo: correo.value,
            telefono: telefono.value,
            opinion: opinion.value,
            metodo: metodo.value,
        };

        try {
            const response = await useReferidos.agregar(data);

            if (useReferidos.estatus === 200) {
                goToMensajeFinal();
            } else if (useReferidos.estatus === 400) {
                validacion.value = useReferidos.validacion;
                return;
            }

        } catch (error) {
            console.log('Error al agregar  referido:', error);
        }
    } else {
        const data = {
            nombre: nombre.value,
            cedula: cedula.value,
            correo: correo.value,
            telefono: telefono.value,
            opinion: opinion.value,
            metodo: metodo.value,
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

}

function goToFormReferente() {
    router.push('/formref')
}

function goToMensajeFinal() {
    router.push('/msg')
}

</script>

<template>
    <div class="main">
        <div class="container">
            <form @submit.prevent="agregarNuevoReferido"
                style="display: flex; flex-direction: column;justify-content: center;">
                <h2 class="text-center" style="font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
                    Formulario de datos</h2>
                <h4 class="text-danger text-center fw-bold">{{ validacion }}</h4>
                <label class="fw-bold mt-4 label" for="nombre">Digite su nombre</label>
                <input type="text" id="nombre" name="nombre" v-model="nombre" class="input" ><br>

                <label class="fw-bold label" for="cedula">Digite su cédula o número de documento</label>
                <input type="number" id="cedula" name="cedula" v-model="cedula"  class="input"><br>

                <label class="fw-bold label" for="correo">Digite su correo electrónico</label>
                <input type="email" id="correo" name="correo" v-model="correo"  class="input"><br>

                <label class="fw-bold label" for="telefono">Digite su teléfono</label>
                <input type="number" id="telefono" name="telefono" v-model="telefono"  class="input"><br>

                <label class="fw-bold label" for="opinion">Por favor seleccione el método por el que encontró nuestro
                    servicio</label>
                <select v-model="metodo" class="form-select mb-4 input" id="inputGroupSelect03"
                    aria-label="Example select with button addon" >
                    <option value="" disabled selected>Escoge una opción...</option>
                    <option v-for="opcion in opciones" :key="opcion.nombre" :value="opcion.nombre">{{ opcion.nombre }}
                    </option>
                </select>

                <label class="fw-bold label" for="opinion">Digite su opinión respecto al servicio ofrecido</label>
                <textarea id="opinion" name="opinion" v-model="opinion" class="input" style="height: 70px;"
                    ></textarea><br><br>

                <input type="submit" value="Enviar" class="boton-elegante">
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


textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #3e3b3b;
}

.input {
    width: 100%;
    height: 44px;
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
</style>
