import * as actionsType from '../actions/actionTypes';
import {updateObject} from '../utilities/updateObject';

const initState = {
    loading: false,
    error: null,
    species: null,
    // có 4 option là null: không hoạt động, loading: dang xoa, success: thanh cong, error: loi
    deleting: null,
    submitSuccess: null,
    submitError: null
}

const speciesStart = (state) => {
    return updateObject(state, {loading: true});
}

const speciesError = (state, action) => {
    return updateObject(state, { error: action.errMessage, loading: false});
}

const fetchSpeciesSuccess = (state, action) => {
    return updateObject(state, { loading: false, species: action.species});
}

const createSpeciesSuccess = (state, action) => {
    const speciesUpdate = JSON.parse(JSON.stringify(state.species));
    speciesUpdate.push(action.dataCreated);
    return updateObject(state, {loading: false, species: speciesUpdate, submitSuccess: true});
}
const createSpeciesError = (state, action) => {
    return updateObject(state, { loading: false, submitError: action.error});
}

const deleteSpeciesSuccess = (state, action) => {
    const speciesUpdate = state.species.filter(item => item.id !== action.id);
    return updateObject(state, {
        species: speciesUpdate
    })
}

const updateSpeciesSuccess = (state, action) => {
    const newSpecies = action.dataUpdate;
    const speciesUpdate = state.species.map(item => {
        if(item.id === newSpecies.id) {
            return newSpecies;
        }
        return item;
    })
    return updateObject(state, {species: speciesUpdate, submitSuccess: true, loading: false});
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case actionsType.SPECIES_START: return speciesStart(state, action);
        case actionsType.SPECIES_ERROR: return speciesError(state, action);
        case actionsType.FETCH_SPECIES_SUCCESS: return fetchSpeciesSuccess(state, action);
        case actionsType.CREATE_SPECIES_SUCCESS: return createSpeciesSuccess(state, action);
        case actionsType.CREATE_SPECIES_ERROR: return createSpeciesError(state, action);
        case actionsType.DELETE_SPECIES_SUCCESS: return deleteSpeciesSuccess(state, action);
        case actionsType.DELETE_SPECIES_ERROR: return updateObject(state, { deleting: 'error'});
        case actionsType.DELETE_SPECIES_SUCCESS: return updateObject(state, { deleting: 'success'});
        case actionsType.SPECIES_END_FORM: return updateObject(state, {submitSuccess: null});
        case actionsType.UPDATE_SPECIES_SUCCESS: return updateSpeciesSuccess(state, action);
        default: return state;
    }
}

export default reducer;