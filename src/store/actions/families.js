import * as actionsType from "./actionTypes";
import { getApi, headerAuthConfig, baseUrl } from "../utilities/apiConfig";
import axios from "axios";

const fetchFamiliesSuccess = (data) => {
  return {
    type: actionsType.FETCH_FAMILIES_SUCCESS,
    families: data.families,
    total: data.total,
  };
};

const familiesError = (errMessage) => {
  return {
    type: actionsType.FAMILIES_ERROR,
    error: errMessage,
  };
};
export const fetchFamilies = (entires, page, filter) => {
  return (dispatch) => {
    const api = getApi(
      "GET",
      "families",
      null,
      `entires=${entires}&page=${page}&${filter}`
    );
    axios
      .get(api)
      .then((res) => dispatch(fetchFamiliesSuccess(res.data.data)))
      .catch((err) => dispatch(familiesError(err.message)));
  };
};

const familyStart = () => {
  return {
    type: actionsType.FAMILIES_START,
  };
};

const createFamilySuccess = (newFamily) => {
  return {
    type: actionsType.CREATE_FAMILY_SUCCESS,
    newFamily: newFamily,
  };
};

const createFamilyError = (errMessage) => {
  return {
    type: actionsType.CREATE_FAMILY_ERROR,
    error: errMessage,
  };
};

export const createFamily = (name_vn, name_latin, order, token) => {
  return (dispatch) => {
    dispatch(familyStart());
    const header = headerAuthConfig(token);
    axios
      .post(
        `${baseUrl}auth/families`,
        { name_vn: name_vn, name_latin: name_latin, order: order },
        header
      )
      .then((res) => dispatch(createFamilySuccess(res.data.data)))
      .catch((err) => dispatch(createFamilyError(err.message)));
  };
};

export const endFormFamily= () => {
  return {
    type: actionsType.FAMILIES_END_FORM,
  };
};
const deleteFamilySuccess = (id) => {
  return {
    type: actionsType.DELETE_FAMILY_SUCCESS,
    id: id,
  };
};

const deleteFamilyError = (errMessage) => {
  return {
    type: actionsType.DELETE_FAMILY_ERROR,
    error: errMessage,
  };
};

export const deleteFamily = (id, token) => {
  return (dispatch) => {
    // dispatch(speciesStart());
    const header = headerAuthConfig(token);
    axios
      .delete(`${baseUrl}auth/families/${id}`, header)
      .then((res) => dispatch(deleteFamilySuccess(id)))
      .catch((err) => dispatch(deleteFamilyError(err.message)));
  };
};

const updateFamilySuccess = (dataUpdate) => {
  return {
    type: actionsType.UPDATE_FAMILY_SUCCESS,
    dataUpdate: dataUpdate,
  };
};

export const updateFamily = (id, name_vn, name_latin, order, token) => {
  return (dispatch) => {
    dispatch(familyStart());
    const header = headerAuthConfig(token);
    axios
      .put(
        `${baseUrl}auth/families/${id}`,
        { name_vn: name_vn, name_latin: name_latin, order: order },
        header
      )
      .then((res) => dispatch(updateFamilySuccess(res.data.data)))
      .catch((err) => dispatch(createFamilyError(err.message)));
  };
};
