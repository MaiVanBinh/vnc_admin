import * as actionsType from "../actions/actionTypes";

const initState = null;

const createEventSuccess = (state, action) => {
  state.push(action.payload);
  return state;
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionsType.CREATE_EVENT: return createEventSuccess(state, action);
    case actionsType.SET_EVENTS_LIST:
      return action.payload
    default:
      return state;
  }
};

export default reducer;
