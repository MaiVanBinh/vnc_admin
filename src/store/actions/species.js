import axios from "axios";
import { getApi } from "../utilities/apiConfig";
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
