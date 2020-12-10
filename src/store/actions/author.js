import * as actionsType from './actionTypes';
import axios from 'axios';
import {getApi} from '../utilities/apiConfig';

const authorStart = () => {
    return {
        type: actionsType.AUTHOR_START
    }
}

const fetchAuthorsSuccess = (authors) => {
    return {
        type: actionsType.FETCH_AUTHORS_SUCCESS,
        authors: authors
    }
}

const authorError = errMessage => {
    return {
        type: actionsType.AUTHOR_ERROR,
        error: errMessage
    }
}

export const fetchAuthors = (page, isAll) => {
    return dispatch => {
        dispatch(authorStart());
        const cpage = page ? page : 1;
        const url = getApi('GET', 'author', null, `page=${cpage}&` + isAll);
        console.log(url)
        axios.get(url) 
            .then(res => dispatch(fetchAuthorsSuccess(res.data.data)))
            .catch(err => dispatch(authorError(err.message)));
    }
}