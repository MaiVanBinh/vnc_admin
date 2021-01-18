import * as actionsType from '../actions/actionTypes';
import { updateObject } from '../utilities/updateObject';

const initState = {
    loading: false,
    users: null
}

const userStart = (state, action) => {
    return updateObject(state, {loading: false});
}

const fetchUserSuccess = (state, action) => {
    return updateObject(state, { users: action.users, loading: false});
}

const deleteUserSuccess = (state, action) => {
    const udpateUser = state.users.filter(item => item.id !== action.id);
    return updateObject(state,  {
        loading: false,
        users: udpateUser
    })
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case actionsType.USER_START: return userStart(state, action);
        case actionsType.FETCH_USER_SUCCESS: return fetchUserSuccess(state, action);
        case actionsType.DELETE_USER_SUCCESS: return deleteUserSuccess(state, action);
        default: return state;
    }
}

export default reducer;