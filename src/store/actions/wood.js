import axios from 'axios';
import {baseUrl} from '../utilities/apiConfig';
import * as actionsType from './actionTypes';

const fetchWoodSuccess = woods => {
    return {
        type: actionsType.FETCH_WOOD_SUCCESS,
        woods: woods
    }
}

export const fetchWood = (page) => {
    return dispatch => {
        dispatch({type: actionsType.WOOD_START});
        axios.get(`${baseUrl}woods?page=${page}`)
            .then(res => dispatch(fetchWoodSuccess(res.data.data)))
            .catch(err =>console.log(err))

    }
}