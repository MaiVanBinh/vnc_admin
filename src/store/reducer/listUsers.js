import * as actionTypes from '../actions/actionTypes';

let initState = null;

const reducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.SET_LIST_USERS: 
            return action.payload;
        default: 
            return state;
    }
}

export default reducer;