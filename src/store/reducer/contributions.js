import * as actionsType from '../actions/actionTypes';
// import { updateObject } from '../utilities/updateObject';

const initState = null; // category list

// const categoryStart = (state, action) => {
//     return updateObject(state, { loading: true });
// }

// const categoryError = (state, action) => {
//     return updateObject(state, { loading: false, error: action.errMessage });
// }

// const fetchCategorySuccess = (state, action) => {
//     return updateObject(state, { loading: false, category: action.category });
// }

const reducer = (state = initState, action) => {
    switch (action.type) {
        // case actionsType.CATEGORY_START: return categoryStart(state, action);
        // case actionsType.CATEGORY_ERROR: return categoryError(state, action);
        // case actionsType.FETCH_CATEGORY_SUCCESS: return fetchCategorySuccess(state, action);
        case actionsType.SET_LIST_CONTRIBUTES:
            return action.payload;
        default: return state;
    }
}

export default reducer;