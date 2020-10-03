import * as actionsType from '../actions/actionTypes';
import { updateObject } from '../utilities/updateObject';

const initState = {
    searchResult: null,
    loading: false,
    error: null
}

const latinDicStart = (state, action) => {
    return updateObject(state, { loading: true });
}

const latinDicError = (state, action) => {
    return updateObject(state, { loading: false, error: action.error});
}

const searchLatinDicSuccess = (state, action) => {
    return updateObject(state, { loading: false, searchResult: action.searchResult});
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case actionsType.LATIN_DIC_START: return latinDicStart(state, action);
        case actionsType.LATIN_DIC_ERROR: return latinDicError(state, action);
        case actionsType.SEARCH_LATIN_DIC_SUCCESS: return searchLatinDicSuccess(state, action);
        default: return state;
    }
}

export default reducer;