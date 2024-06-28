<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

function home() {
    router.push("/")
}

</script>

<template>
    <div class="bg-dark">
        <div class="row justify-content-center" style="width: 100%;">
            <div class="col-md-6">
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
}

.alert {
    margin-top: 20px;
}

.btn-danger {
    width: 200px;
}
</style>