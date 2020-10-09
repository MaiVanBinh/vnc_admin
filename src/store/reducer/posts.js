import * as actionsType from "../actions/actionTypes";
import { updateObject } from "../utilities/updateObject";

const initState = {
  hashTagId: null,
  loading: false,
  error: null,
  all_events: null,
  all_species: null,
  religiousNames: null,
  overview: null,
  scientificReports: null,
  posts: null,
  currentPost: null,
  category: null,
};

const fetchStart = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};
const fetchError = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};
const fetchHashTagIdSuccess = (state, action) => {
  return updateObject(state, { hashTagId: action.hashTagId, loading: false });
};

const fetchPostsSuccess = (state, action) => {
  switch (action.posts.type) {
    case "1":
      return updateObject(state, {
        posts: action.posts.posts,
        all_events: action.posts.posts,
      });
    case "2":
      return updateObject(state, {
        posts: action.posts.posts,
        all_species: action.posts.posts,
      });
    case 7:
      return updateObject(state, {
        loading: false,
        overview: action.posts.posts,
      });
    case "6":
      return updateObject(state, {
        loading: false,
        religiousNames: action.posts.posts,
      });
    case "8":
      return updateObject(state, {
        loading: false,
        scientificReports: action.posts.posts,
      });
    default:
      return updateObject(state, { posts: action.posts.posts });
  }
};
const fetchPostDetailSuccess = (state, action) => {
  return updateObject(state, { currentPost: action.post, loading: false });
};
const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionsType.FETCH_START:
      return fetchStart(state, action);
    case actionsType.FETCH_HASHTAG_ID_SUCCESS:
      return fetchHashTagIdSuccess(state, action);
    case actionsType.FETCH_ERROR:
      return fetchError(state, action);
    case actionsType.FETCH_POST_SUCCESS:
      return fetchPostsSuccess(state, action);
    case actionsType.FETCH_POST_DETAIL_SUCCESS:
      return fetchPostDetailSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
