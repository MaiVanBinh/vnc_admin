import * as actionsType from '../actions/actionTypes';
import {updateObject} from '../utilities/updateObject';

const initState = {
    loading: false,
    error: null,
    species: null
}

const speciesStart = (state) => {
    return updateObject(state, {loading: true});
}

const speciesError = (state, action) => {
    return updateObject(state, { error: action.errMessage, loading: false});
}

const fetchSpeciesSuccess = (state, action) => {
    return updateObject(state, { loading: false, species: action.species});
    // , 
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case actionsType.SPECIES_START: return speciesStart(state, action);
        case actionsType.SPECIES_ERROR: return speciesError(state, action);
        case actionsType.FETCH_SPECIES_SUCCESS: return fetchSpeciesSuccess(state, action);
        default: return state;
    }
}

export default reducer;