import * as actionsType from './actionTypes';
import axios from 'axios';
import { getApi } from '../utilities/apiConfig';

const nationalParkStart = () => {
    return {
        type: actionsType.NATIONAL_PARKS_START
    }
}

const nationParkError = (errMessage) => {
    return {
        type: actionsType.NATIONAL_PARKS_ERROR,
        error: errMessage
    }
}

const fetchNationParkSuccess = (np) => {
    return {
        type: actionsType.FETCH_NP_BY_ID_SUCCES,
        nationalPark: np
    }
}

export const fetchNationParkById = (id) => {
    return dispatch => {
        dispatch(nationalParkStart());
        const url = getApi('GET', 'nationalPark', id); 
        axios.get(url)
            .then(res => dispatch(fetchNationParkSuccess(res.data.data)))
            .catch(err => dispatch(nationParkError(err.message)));
    }
}

const fetchNationalParkCoordsSuccess = (nationalParks) => {
    return {
        type: actionsType.FETCH_NP_COORDS_SUCCESS,
        nationalParks: nationalParks
    }
}

export const fetchNationalParkCoords = () => {
    return dispatch => {
        dispatch(nationalParkStart());
        const url = getApi('GET', 'nationalPark'); 
        axios.get(url, { })
            .then(res => dispatch(fetchNationalParkCoordsSuccess(res.data.data)))
            .catch(err => dispatch(nationParkError(err.message)));
    }
}