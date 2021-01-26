import * as actionsType from '../actions/actionTypes';
const initState = false;

export default (state = initState, action) => {
    switch (action.type) {
        case actionsType.SET_LOADER:
            return action.payload;
        default:
            return state;
    }
}