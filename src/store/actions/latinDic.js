import * as actionsType from './actionTypes';
import axios from 'axios';
import {getApi} from '../utilities/apiConfig';

const latinDicStart = () => {
    return {
        type: actionsType.LATIN_DIC_START
    }
}

const searchLatinDicSuccess = (searchResult) => {
    return {
        type: actionsType.SEARCH_LATIN_DIC_SUCCESS,
        searchResult: searchResult
    }
}

const LatinDicError = errMessage => {
    return {
        type: actionsType.LATIN_DIC_ERROR,
        error: errMessage
    }
}

export const searchLatinDic = (latin) => {
    return dispatch => {
        dispatch(latinDicStart());
        const url = getApi('GET', 'latinDic', null, `latin=${latin}`);
        axios.get(url, {'Content-Type' : 'application/json'}) 
            .then(res => dispatch(searchLatinDicSuccess(res.data.data)))
            .catch(err => dispatch(LatinDicError(err.message)));
    }
}