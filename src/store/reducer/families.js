import * as actionsType from '../actions/actionTypes';
import {updateObject} from '../utilities/updateObject';

const initState = {
    families: null,
    error: null,
    total: null,
    loading: false,
    submitSuccess: null,
    submitError: null,
}

const familiesStart = (state, action) => {
    return updateObject(state, {loading: true});
}

const fetchFamiliesSuccess = (state, action) => {
    return updateObject(state, {
        loading: false, families: action.families,
        error: null,
        total: action.total
    })
}

const fetchFamiliesError = (state,action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const createFamilySuccess = (state, action) => {
    const familiesUpdate = JSON.parse(JSON.stringify(state.families));
    familiesUpdate.unshift(action.newFamily);
    familiesUpdate.pop();
    return updateObject(state, { families: familiesUpdate, loading: false, submitSuccess: true});
}
const createFamilyError = (state, action) => {
    return updateObject(state, { loading: false, submitError: action.error}); 
}
const deleteFamilySuccess = (state, action) => {
    const familiesUpdate = state.families.filter(item => item.id !== action.id);
    return updateObject(state, {
        families: familiesUpdate
    })
}

const deleteFamilyError = (state, action) => {
    return updateObject(state, {submitError: action.error});
}

const updateFamilySuccess = (state, action) => {
    const newFamily = action.dataUpdate;
    const familiesUpdate = state.families.map(item => {
        if(item.id === newFamily.id) {
            return newFamily;
        }
        return item;
    })
    return updateObject(state, {families: familiesUpdate, submitSuccess: true, loading: false});
}

export default function reducer(state = initState, action) {
    switch(action.type) {
        case actionsType.FAMILIES_START: return familiesStart(state, action);
        case actionsType.FETCH_FAMILIES_SUCCESS: return fetchFamiliesSuccess(state, action);
        case actionsType.FAMILIES_ERROR: return fetchFamiliesError(state, action);
        case actionsType.CREATE_FAMILY_SUCCESS: return createFamilySuccess(state, action);
        case actionsType.CREATE_FAMILY_ERROR: return createFamilyError(state, action);
        case actionsType.FAMILIES_END_FORM: return updateObject(state, {submitSuccess: null});
        case actionsType.DELETE_FAMILY_SUCCESS:  return deleteFamilySuccess(state, action);
        case actionsType.DELETE_FAMILY_ERROR: return deleteFamilyError(state, action);
        case actionsType.UPDATE_FAMILY_SUCCESS: return updateFamilySuccess(state, action);
        default: return state;
    }
}