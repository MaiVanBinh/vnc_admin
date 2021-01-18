import * as actionsType from '../actions/actionTypes';
import { updateObject } from '../utilities/updateObject';

const initState = {
    loading: false,
    woods: null
}
const reducer = (state = initState, action ) => {
    switch(action.type) {
        case actionsType.WOOD_START: return updateObject(state, { loading: true});
        case actionsType.FETCH_WOOD_SUCCESS: return updateObject(state, {loading: false, woods: action.woods.wood})
        default: return state;
    }
}

export default reducer;