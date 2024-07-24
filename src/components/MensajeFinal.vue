<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

function home() {
    router.push("/")
}

</script>

<template>
    <div class="bg-dark">
        <div class="contenedor-msg" style="width: 100%;">
            <div class="msg">
                <div class="alert alert-success text-center" role="alert">
                    <h4 class="alert-heading">¡Gracias por responder!</h4>
                    <p>Agradecemos el tiempo que te tomaste para responder nuestro formulario. Tu opinión es muy valiosa
                        para nosotros.</p>
                    <hr>
                    <p class="mb-0">Estamos emocionados de haber podido recopilar tus comentarios y los utilizaremos
                        para mejorar nuestros servicios.</p>
                </div>
            </div>
        </div>
        <div class="row justify-content-center" style="width: 100%;">
            <button class="btn btn-danger fw-bold " @click="home()">
                Regresar
            </button>
        </div>
    </div>
</template>


<style scoped>
.bg-dark {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.contenedor-msg {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.msg {
    display: flex;
    justify-content: center
}

.alert {
    margin-top: 20px;
    width: 80%;
}

.btn-danger {
    width: 100%;
    max-width: 200px;
    margin-top: 20px;
}

/* Media Queries */
@media screen and (max-width: 768px) {
    .alert {
        width: 90%;
    }

    .btn-danger {
        width: 100%;
        max-width: 150px;
    }
}

@media screen and (max-width: 480px) {
    .alert {
        width: 95%;
    }

    .btn-danger {
        width: 100%;
        max-width: 100px;
    }
}
</style>