import * as actionsType from './actionTypes';
import axios from 'axios';
import {getApi} from '../utilities/apiConfig';

const categoryStart = () => {
    return {
        type: actionsType.CATEGORY_START
    }
}

const fetchCategorySuccess = (category) => {
    return {
        type: actionsType.FETCH_CATEGORY_SUCCESS,
        category: category
    }
}

const categoryError = errMessage => {
    return {
        type: actionsType.CATEGORY_ERROR,
        errMessage: errMessage
    }
}

export const fetchCategory = () => {
    return dispatch => {
        dispatch(categoryStart());
        const url = getApi('GET', 'categories');
        axios.get(url) 
            .then(res => {
                console.log(res);
                dispatch(fetchCategorySuccess(res.data.data));
            })
            .catch(err => dispatch(categoryError(err.message)));
    }
}