import {LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_START, LOG_OUT} from '../actions/actionTypes';

let authStorage = localStorage.getItem('autobi-auth');
let initState = {
    token: null,
    error: null,
    user: {}
};
if(authStorage) {
    authStorage = JSON.parse(authStorage);
    initState = authStorage;
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case LOGIN_SUCCESS: return action.payload;
        case LOGIN_START: return {token: null, error: null};
        case LOGIN_ERROR: return {token: null, error: action.errMessage}
        case LOG_OUT: return {token: null, error: null};
        default: return state;
    }
}

export default reducer;