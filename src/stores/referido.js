import axios from "axios";
import {ref} from 'vue'
import { defineStore } from "pinia";

const modelo = "referido";
const estatus = ref("");
const validacion = ref("");
const nuevoReferido = ref("");


export const useStoreReferido = defineStore(modelo, () => {
  const referidos = ref([]);

  const getAll = async () => {
    try {
      const response = await axios.get(`${modelo}/all`);
      console.log(response);
      referidos.value = response.data;
      estatus.value = response.status;
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const agregar = async (data) => {
    try {
      const response = await axios.post(`${modelo}/registro`, data);
      console.log("hola soy nuevo referido",response);
      estatus.value = response.status;
      nuevoReferido.value = response.data._id
      console.log("soy nuevo referido", nuevoReferido)
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

  return { getAll, agregar, editar, activar, inactivar, referidos, estatus, validacion, nuevoReferido };
});
