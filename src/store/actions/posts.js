import axios from 'axios';
import * as actionsType from './actionTypes';
import { getApi } from '../utilities/apiConfig';
import {getQuery} from '../utilities/updateObject';

const fetchStart = () => {
    return {
        type: actionsType.FETCH_START
    }
}

const fetchError = (errMessage) => {
    return {
        type: actionsType.FETCH_ERROR,
        error: errMessage
    }
}
const fetchHashTagIdSuccess = (hashTagId) => {
    return {
        type: actionsType.FETCH_HASHTAG_ID_SUCCESS,
        hashTagId: hashTagId
    }
}



export const fetchHashTagId = () => {
    return dispatch  => {
        dispatch(fetchStart());
        const url = getApi('GET', 'posts', 'idetify');
        axios.get(url)
            .then(res => dispatch(fetchHashTagIdSuccess(res.data.data)))
            .catch(err => dispatch(fetchError(err.message)));
    }
}

const fetchPostSuccess = (type, posts) => {
    return {
        type: actionsType.FETCH_POST_SUCCESS,
        posts: {
            type:type,
            posts: posts
        }
    }
} 

// fetch post 
export const fetchPost = (payload) => {
    return dispatch => {
        dispatch(fetchStart());
        const query = getQuery(payload);
        const url = getApi('GET', 'posts', null, query);
        axios.get(url)
            .then(res => dispatch(fetchPostSuccess(payload.category, res.data.data)))
            .catch(err => dispatch(fetchError(err.message)));
    };
}

const fetchPostDetailSucces = (post) => {
    return {
        type: actionsType.FETCH_POST_DETAIL_SUCCESS,
        post: post
    }
}

export const fetchPostDetail = (id) => {
    return dispatch => {
        dispatch(fetchStart());
        const url = getApi('GET', 'posts', id, null);
        console.log(url);
        axios.get(url)
            .then(res => dispatch(fetchPostDetailSucces(res.data.data)))
            .catch(err => dispatch(fetchError(err.message)));
    }
}