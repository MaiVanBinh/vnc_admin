import axios from 'axios';
import  * as actionTypes from "./actionTypes";
import { getApi, baseUrl, headerAuthConfig } from '../utilities/apiConfig';

const fetchFilterDataSuccess = (data) => {
    return {
        type: actionTypes.FETCH_FILTER_DATA_SUCCESS,
        filterData: data
    }
}

const fetchFilterDataStart = () => {
    return {
        type: actionTypes.FETCH_FILTER_DATA_START
    }
}

const fetchFilterDataError = (errMessage) => {
    return {
        type: actionTypes.FETCH_FILTER_DATA_ERROR,
        errMessage: errMessage
    }
}

export const deleteError = () => {
    return {
        type: actionTypes.DELETE_ERROR
    }
}

export const fetchFilterData = () => {
    return dispatch => {
        dispatch(fetchFilterDataStart());
        const url = getApi('GET', 'filterData','', '');
        axios.get(url)
            .then(res => {
                return dispatch(fetchFilterDataSuccess(res.data))
            })
            .catch(err => dispatch(fetchFilterDataError(err.message)));
    }
}

const fetchCreaturesStart = () => {
    return {
        type: actionTypes.FETCH_CREATURES_START
    }
}

const fetchCreaturesSuccess = (data) => {
    return {
        type: actionTypes.FETCH_CREATURES_SUCCESS,
        creatures: data
    }
}

const fetchCreaturesError = (errMessage) => {
    return {
        type: actionTypes.FETCH_CREATURES_ERROR,
        error: errMessage
    }
}

export const fetchCreatures = (query) => {
    let queryString = null;
    if(query) {
        queryString = query;
    }
    return dispatch => {
        dispatch(fetchCreaturesStart());
        const url = getApi('GET', 'creatures', null, queryString);
        axios.get(url)
            .then(res => dispatch(fetchCreaturesSuccess(res.data.data)))
            .catch(err => fetchCreaturesError(err.message))
    }
}

const fetchCreatureByIdStart = () => {
    return {
        type: actionTypes.FETCH_CREATURES_BY_ID_START
    }
}

const fetchCreatureByIdSuccess = (creature) => {
    return {
        type: actionTypes.FETCH_CREATURES_BY_ID_SUCCESS,
        creature: creature
    }
}

const fetchCreatureByIdError = (errMessage) => {
    return {
        type: actionTypes.FETCH_CREATURES_BY_ID_ERROR,
        errMessage: errMessage
    }
}


export const fetchCreatureById = (id) => {
    return dispatch => {
        dispatch(fetchCreatureByIdStart());;
        const api = getApi('GET', 'creatures', id, null);
        axios.get(api)
            .then(res => dispatch(fetchCreatureByIdSuccess(res.data.data)))
            .catch(err => dispatch(fetchCreatureByIdError(err.message)));
    }
}

const fetchCreatureRedBookStart = () => {
    return {
        type: actionTypes.FETCH_CREATURES_REDBOOK_START
    }
}

const fetchCreaturesRedBookSuccess = (species, data) => {
    return {
        type: actionTypes.FETCH_CREATURES_REDBOOK_SUCCESS,
        species: species,
        creatures: data,
    }
}

export const fetchCreatureRedBook = (species ,query) => {
    return dispatch => {
        dispatch(fetchCreatureRedBookStart());
        const url = getApi('GET', 'creatures', 'red-book', query);
        axios.get(url)
            .then(res => dispatch(fetchCreaturesRedBookSuccess(species, res.data.data)))
            .catch(err => dispatch(fetchCreaturesError(err.message)));
    }
}

export const editCreatureStart = (id, payload, token) => {
    return dispatch => {
        dispatch(fetchCreatureByIdStart());
        const headerCofig = headerAuthConfig(token);
        axios.post(`${baseUrl}auth/creatures/${id}`, payload, headerCofig)
        .then(res => dispatch(fetchCreatureByIdSuccess(res.data.data)))
        .catch(err => dispatch(fetchCreatureByIdError(err.message)));
    }
}

export const createCreature = (payload, token) => {
    return dispatch => {
        dispatch(fetchCreatureByIdStart());
        const headerCofig = headerAuthConfig(token);
        axios.post(`${baseUrl}auth/creatures`, payload, headerCofig)
        .then(res => dispatch(fetchCreatureByIdSuccess(res.data.data)))
        .catch(err => dispatch(fetchCreatureByIdError(err.message)));
    }
}

export const deleteCreatureSuccess = (id) => {
    return {
        type: actionTypes.DELETE_CREATURE_SUCCESS,
        id: id
    }
}
export const deleteCreature = (id, token) => {
    return dispatch => {
        dispatch(fetchCreatureByIdStart());
        const headerCofig = headerAuthConfig(token);
        axios.delete(`${baseUrl}auth/creatures/${id}`, headerCofig)
        .then(res => dispatch(deleteCreatureSuccess(id)))
        .catch(err => dispatch(fetchCreatureByIdError(err.message)));
    }
}