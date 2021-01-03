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
  formSubmit: false,
  total: 0,
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
        total: action.posts.posts.total,
        posts: action.posts.posts.posts,
        all_events: action.posts.posts.posts,
      });
    case "2":
      return updateObject(state, {
        total: action.posts.posts.total,
        posts: action.posts.posts.posts,
        all_species: action.posts.posts.posts,
      });
    case 7:
      return updateObject(state, {
        total: action.posts.posts.total,
        loading: false,
        overview: action.posts.posts.posts,
      });
    case "6":
      return updateObject(state, {
        total: action.posts.posts.total,
        loading: false,
        religiousNames: action.posts.posts.posts,
      });
    case "8":
      return updateObject(state, {
        total: action.posts.posts.total,
        loading: false,
        scientificReports: action.posts.posts.posts,
      });
    default:
      return updateObject(state, { posts: action.posts.posts.posts, total: action.posts.posts.total });
  }
};

const fetchPostDetailSuccess = (state, action) => {
  return updateObject(state, { currentPost: action.post, loading: false });
};

const changePostSuccess = (state, action) => {
  const updatePost = [...state.posts];
  const id = state.posts.findIndex(item => item.id === action.newPost.id);
  updatePost[id] = action.newPost;
  return updateObject(state, { formSubmit: 'success', posts: updatePost});
}

const createPostSuccess = (state, action) => {
  const updatePost = [...state.posts];
  updatePost.pop();
  updatePost.unshift(action.newPost);
  return updateObject(state, { formSubmit: 'success', posts: updatePost});
}

const deletePostSuccess =(state, action) => {
  const updatePost = [...state.posts];
  const id = updatePost.findIndex(item => item.id === action.deleteId);
  updatePost.splice(id, 1);
  return updateObject(state, { formSubmit: true, posts: updatePost});
}

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
    case actionsType.POST_END_FORM: return updateObject(state, {formSubmit: false})
    case actionsType.CHANGE_POST_SUCCESS: return changePostSuccess(state, action);
    case actionsType.CREATE_POST_SUCCESS: return createPostSuccess(state, action);
    case actionsType.DELETE_POST_SUCCESS: return deletePostSuccess(state, action);
    case actionsType.CHANGE_POST_START: return state;
    case actionsType.CHANGE_POST_ERROR: return state; 
    default:
      return state;
  }
};

export default reducer;
