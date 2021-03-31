import * as actionsType from '../actions/actionTypes';

const initState = null; 
const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionsType.SET_TIMBER_SAMPLE:
            return action.payload;
        default: return state;
    }
}

export default reducer;