import * as actionsType from '../actions/actionTypes';
// import { updateObject } from '../utilities/updateObject';

const initState = null;

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionsType.SET_CREATURES_CATEGORIES:
            return action.payload;
        default: return state;
    }
}

export default reducer;