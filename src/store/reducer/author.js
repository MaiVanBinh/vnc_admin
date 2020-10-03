import * as actionsType from '../actions/actionTypes';
import { updateObject } from '../utilities/updateObject';

const initState = {
    authors: null,
    laoding: false,
    error: null,
    page: 1
}

const authorStart = (state, action) => {
    return updateObject(state, {
        laoding: true
    });
}


const authorError = (state, action) => {
    return updateObject(state, {
        laoding: false,
        error: action.error
    });
}

const fetchAuthorsSuccess = (state, action) => {
    return updateObject(state, {
        laoding: false,
        authors: action.authors
    })
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case(actionsType.AUTHOR_START): return authorStart(state, action);
        case(actionsType.AUTHOR_ERROR): return authorError(state, action);
        case(actionsType.FETCH_AUTHORS_SUCCESS): return fetchAuthorsSuccess(state, action);
        default: return state;
    }
}

export default reducer;