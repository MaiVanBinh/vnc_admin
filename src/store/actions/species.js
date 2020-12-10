import axios from "axios";
import { getApi, baseUrl, headerAuthConfig } from "../utilities/apiConfig";
import * as actionsType from "./actionTypes";

const speciesStart = () => {
  return {
    type: actionsType.SPECIES_START,
  };
};

const speciesError = (errMessage) => {
  return {
    type: actionsType.SPECIES_ERROR,
    errMessage: errMessage,
  };
};

const fetchSpeciesSuccess = (species) => {
  return {
    type: actionsType.FETCH_SPECIES_SUCCESS,
    species: species,
  };
};

export const fetchSpecies = () => {
  return dispatch => {
    dispatch(speciesStart());
    const api = getApi("GET", "species");
    axios
      .get(api)
      .then(res => dispatch(fetchSpeciesSuccess(res.data.data)))
      .catch(err => dispatch(speciesError(err.message)));
  };
};

const createSpeciesStart = () => {
  return {
    type: actionsType.CREATE_SPECIES_START
  }
}
const createSpecieSuccess = (dataCreated) => {
  return {
    type: actionsType.CREATE_SPECIES_SUCCESS,
    dataCreated: dataCreated
  }
}

const createSpeciesError = (errMessage) => {
  return {
    type: actionsType.CREATE_SPECIES_ERROR,
    error: errMessage
  }
} 
export const createSpecies = (name_vn, name_en, token) => {
  return dispatch => {
    dispatch(speciesStart());
    const header = headerAuthConfig(token);
    axios.post(`${baseUrl}auth/species`, {name_vn: name_vn, name_en: name_en}, header)
      .then(res => dispatch(createSpecieSuccess(res.data.data)))
      .catch(err => dispatch(createSpeciesError(err.message)));
  }
}

const deleteSpeciesSuccess = (id) => {
  return {
    type: actionsType.DELETE_SPECIES_SUCCESS,
    id: id
  }
}

const deleteSpeciesError = () => {
  return{
    type: actionsType.DELETE_SPECIES_ERROR
  }
}

export const deleteSpecies = (id, token) => {
  return dispatch => {
    // dispatch(speciesStart());
    const header = headerAuthConfig(token);
    axios.delete(`${baseUrl}auth/species/${id}`, header)
      .then(res => dispatch(deleteSpeciesSuccess(id)))
      .catch(err => dispatch(deleteSpeciesError()));
  }
}

export const endFormSpecies = () => {
  return {
    type: actionsType.SPECIES_END_FORM
  }
}

const updateSpeciesSuccess = (dataUpdate) => {
  return {
    type: actionsType.UPDATE_SPECIES_SUCCESS,
    dataUpdate: dataUpdate
  }
}

export const updateSpecies =(id, name_vn, name_en, token) => {
  return dispatch => {
    dispatch(speciesStart());
    const header = headerAuthConfig(token);
    axios.put(`${baseUrl}auth/species/${id}`, {name_vn: name_vn, name_en: name_en}, header)
      .then(res => dispatch(updateSpeciesSuccess(res.data.data)))
      .catch(err => dispatch(createSpeciesError(err.message)));
  }
}