import * as actionsType from '../actions/actionTypes';
import { updateObject } from '../utilities/updateObject';

const initState = {
    nationalPark: null,
    loading: false,
    error: null,
    nationalParks: null
};

const nationalParkStart = (state, action) => {
    return updateObject(state, {loading: true});
} 

const nationalParkError = (state, action) => {
    return updateObject(state, { loading: false, error: action.error});
}

const fetchNationalParkByIdSuccess = (state, action) => {
    return updateObject(state, { loading: false, nationalPark: action.nationalPark});
} 

const fetchNationalParkCoordsSuccess = (state, action) => {
    return(state, { loading: false, nationalParks: action.nationalParks});
}

const reducer = (state = initState, action ) => {
    switch(action.type) {
        case actionsType.NATIONAL_PARKS_START: return nationalParkStart(state, action);
        case actionsType.NATIONAL_PARKS_ERROR: return nationalParkError(state, action);
        case actionsType.FETCH_NP_BY_ID_SUCCES: return fetchNationalParkByIdSuccess(state, action);
        case actionsType.FETCH_NP_COORDS_SUCCESS: return fetchNationalParkCoordsSuccess(state, action);
        default: return state;
    }
}

export default reducer;