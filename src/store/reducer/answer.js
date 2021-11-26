import * as actionsType from "../actions/actionTypes";

const initState = null;

const createAnswerSuccess = (state, action) => {
  state.push(action.payload);
  return state;
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    // case actionsType.FETCH_START:
    //   return fetchStart(state, action);
    // case actionsType.FETCH_HASHTAG_ID_SUCCESS:
    //   return fetchHashTagIdSuccess(state, action);
    // case actionsType.FETCH_ERROR:
    //   return fetchError(state, action);
    // case actionsType.FETCH_POST_SUCCESS:
    //   return fetchPostsSuccess(state, action);
    // case actionsType.FETCH_POST_DETAIL_SUCCESS:
    //   return fetchPostDetailSuccess(state, action);
    // case actionsType.POST_END_FORM: return updateObject(state, {formSubmit: false})
    // case actionsType.CHANGE_POST_SUCCESS: return changePostSuccess(state, action);
    case actionsType.CREATE_ANSWER: return createAnswerSuccess(state, action);
    // case actionsType.DELETE_POST_SUCCESS: return deletePostSuccess(state, action);
    // case actionsType.CHANGE_POST_START: return state;
    // case actionsType.CHANGE_POST_ERROR: return state; 
    case actionsType.SET_ANSWERS_LIST:
      return action.payload
    default:
      return state;
  }
};

export default reducer;
