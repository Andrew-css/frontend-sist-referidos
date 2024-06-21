import axios from "axios";
import {ref} from 'vue'
import { defineStore } from "pinia";

const modelo = "referente";
const estatus = ref("");
const validacion = ref("");
const nuevoReferente = ref("");
const referentesCedulas = ref("");


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
    }
  };

  const activar = async (id) => {
    try {
      const response = await axios.put(`${modelo}/activar/${id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const inactivar = async (id) => {
    try {
      const response = await axios.put(`${modelo}/inactivar/${id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return { getAll,getPorCedula, agregar, editar, activar, inactivar, referentes, estatus, validacion, nuevoReferente, referentesCedulas };
});
