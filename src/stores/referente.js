import axios from "axios";
import {ref} from 'vue'
import { defineStore } from "pinia";

const modelo = "referente";
const estatus = ref("");
const validacion = ref("");
const nuevoReferente = ref("");
const referentesCedulas = ref("");
const referidoCedula = ref("")


export const useStoreReferente = defineStore(modelo, () => {
  const referentes = ref([]);

  const getAll = async () => {
    try {
      const response = await axios.get(`${modelo}/all`);
      console.log(response);
      referentes.value = response.data;
      estatus.value = response.status;
      return response.data;
    } catch (error) {
      console.log(error);
      estatus.value = error.response.status;
    }
  };

  const getPorCedula = async (cedula) => {
    try {
      const response = await axios.get(`${modelo}/buscarCedula/${cedula}`);
      console.log(response);
      referentesCedulas.value = response.data;
      estatus.value = response.status;
      return response.data;
    } catch (error) {
      console.log(error);
      estatus.value = error.response.status;
    }
  };

  const getPorCedulaReferido = async (cedula) => {
    try {
      const response = await axios.get(`${modelo}/buscarCedulaRef/${cedula}`);
      console.log(response);
      referidoCedula.value = response.data;
      console.log("hola ref por cedula rif", referidoCedula)
      estatus.value = response.status;
      return response.data;
    } catch (error) {
      console.log(error);
      validacion.value = error.response.data.error
      estatus.value = error.response.status;
    }
  };

  const agregar = async (data) => {
    try {
      const response = await axios.post(`${modelo}/registro`, data);
      console.log("hola soy nuevo referente",response);
      estatus.value = response.status;
      nuevoReferente.value = response.data._id
      console.log("soy nuevo referente", nuevoReferente)
      return response.data;
    } catch (error) {
      console.log(error);
      validacion.value = error.response.data.error
      estatus.value = error.response.status;
    }
  };

  const editar = async (id, data) => {
    try {
      const response = await axios.put(`${modelo}/editar/${id}`, data);
      estatus.value = response.status;
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      estatus.value = error.response.status;
    }
  };

  const activar = async (id) => {
    try {
      const response = await axios.put(`${modelo}/activar/${id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      estatus.value = error.response.status;
    }
  };

  const inactivar = async (id) => {
    try {
      const response = await axios.put(`${modelo}/inactivar/${id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      estatus.value = error.response.status;
    }
  };

  return { getAll,getPorCedula,getPorCedulaReferido, agregar, editar, activar, inactivar, referentes, estatus, validacion, nuevoReferente, referentesCedulas, referidoCedula };
});
