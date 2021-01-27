import * as actionsType from '../actions/actionTypes';

const initState = null;

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionsType.SET_LIST_IMAGES:
            return action.payload;
        default: return state;
    }
}

export default reducer;