import * as actionsType from '../actions/actionTypes';
import { updateObject } from '../utilities/updateObject';

const initState = null; // category list

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionsType.SET_LIST_FEEDBACK:
            return action.payload;
        default: return state;
    }
}

export default reducer;