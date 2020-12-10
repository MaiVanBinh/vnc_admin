import axios from "axios";
import * as actionsType from "./actionTypes";
import { getQuery } from "../utilities/updateObject";
import { getApi, baseUrl, headerAuthConfig } from "../utilities/apiConfig";

const fetchStart = () => {
  return {
    type: actionsType.FETCH_START,
  };
};

const fetchError = (errMessage) => {
  return {
    type: actionsType.FETCH_ERROR,
    error: errMessage,
  };
};
const fetchHashTagIdSuccess = (hashTagId) => {
  return {
    type: actionsType.FETCH_HASHTAG_ID_SUCCESS,
    hashTagId: hashTagId,
  };
};

export const fetchHashTagId = () => {
  return (dispatch) => {
    dispatch(fetchStart());
    const url = getApi("GET", "posts", "idetify");
    axios
      .get(url)
      .then((res) => dispatch(fetchHashTagIdSuccess(res.data.data)))
      .catch((err) => dispatch(fetchError(err.message)));
  };
};

const fetchPostSuccess = (type, posts) => {
  return {
    type: actionsType.FETCH_POST_SUCCESS,
    posts: {
      type: type,
      posts: posts,
    },
  };
};

// fetch post
export const fetchPost = (payload) => {
  return (dispatch) => {
    dispatch(fetchStart());
    const query = getQuery(payload);
    const url = getApi("GET", "posts", null, query);
    axios
      .get(url)
      .then((res) => {
        let category = payload && payload.category ? payload.category : "all";
        return dispatch(fetchPostSuccess(category, res.data.data));
      })
      .catch((err) => dispatch(fetchError(err.message)));
  };
};

const fetchPostDetailSucces = (post) => {
  return {
    type: actionsType.FETCH_POST_DETAIL_SUCCESS,
    post: post,
  };
};

export const fetchPostDetail = (id) => {
  return (dispatch) => {
    dispatch(fetchStart());
    const url = getApi("GET", "posts", id, null);
    axios
      .get(url)
      .then((res) => dispatch(fetchPostDetailSucces(res.data.data)))
      .catch((err) => dispatch(fetchError(err.message)));
  };
};

export const postEndForm = () => {
  return {
    type: actionsType.POST_END_FORM
  }
}

const changePostStart = () => {
  return {
    type: actionsType.CHANGE_POST_START,
  };
};

const changePostSuccess = (newPost) => {
    return {
        type: actionsType.CHANGE_POST_SUCCESS,
        newPost: newPost
    }
}

const changePostError = (error) => {
    return {
        type: actionsType.CHANGE_POST_ERROR,
        error: error
    }
}

export const updatePost = (payload, token) => {
  return (dispatch) => {
    dispatch(changePostStart());
    const header = headerAuthConfig(token);
    console.log(payload)
    axios
      .put(
        `${baseUrl}auth/posts/${payload.id}`,
        {...payload},
        header
      )
      .then((res) => dispatch(changePostSuccess(res.data.data)))
      .catch((err) => dispatch(changePostError(err.message)));
  };
};

const createPostSuccess = (newPost) => {
  return {
    type: actionsType.CREATE_POST_SUCCESS,
    newPost: newPost
  }
}

export const createPost = (payload, token) => {
  return (dispatch) => {
    dispatch(changePostStart());
    const header = headerAuthConfig(token);
    axios
      .post(
        `${baseUrl}auth/posts`,
        {...payload},
        header
      )
      .then((res) => dispatch(createPostSuccess(res.data.data)))
      .catch((err) => dispatch(changePostError(err.message)));
  };
}

const deletePostSuccess = (deleteId) => {
  return {
    type: actionsType.DELETE_POST_SUCCESS,
    deleteId:deleteId
  }
}
export const deletePost = (id, token) => {
  return (dispatch) => {
    dispatch(changePostStart());
    const header = headerAuthConfig(token);
    axios
      .delete(
        `${baseUrl}auth/posts/${id}`,
        header
      )
      .then((res) => dispatch(deletePostSuccess(id)))
      .catch((err) => dispatch(changePostError(err.message)));
  };
}