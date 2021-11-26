import axios from "axios";
import * as actionsType from "./actionTypes";
import { getQuery } from "../utilities/updateObject";
import { getApi, baseUrl, headerAuthConfig } from "../utilities/apiConfig";

const fetchAnswerSuccess = (type, answers) => {
  return {
    type: actionsType.FETCH_ANSWER_SUCCESS,
    answers: {
      answers: ANSWERs,
    },
  };
};

// fetch ANSWER
export const fetcAnswer = (payload) => {
  return (dispatch) => {
    dispatch(fetchStart());
    const query = getQuery(payload);
    const url = getApi("GET", "answers", null, query);
    axios
      .get(url)
      .then((res) => {
        return dispatch(fetchAnswerSuccess(res.data.data));
      })
      .catch((err) => dispatch(fetchError(err.message)));
  };
};

const fetchAnswerDetailSucces = (answers) => {
  return {
    type: actionsType.FETCH_ANSWER_DETAIL_SUCCESS,
    answers: answers,
  };
};

export const fetchAnswerDetail = (id) => {
  return (dispatch) => {
    dispatch(fetchStart());
    const url = getApi("GET", "answers", id, null);
    axios
      .get(url)
      .then((res) => dispatch(fetchAnswerDetailSucces(res.data.data)))
      .catch((err) => dispatch(fetchError(err.message)));
  };
};

export const answerEndForm = () => {
  return {
    type: actionsType.ANSWER_END_FORM
  }
}

const changeAnswerStart = () => {
  return {
    type: actionsType.CHANGE_ANSWER_START,
  };
};

const changeAnswerSuccess = (newQuetion) => {
    return {
        type: actionsType.CHANGE_ANSWER_SUCCESS,
        newQuetion: newQuetion
    }
}

const changeAnswerError = (error) => {
    return {
        type: actionsType.CHANGE_ANSWER_ERROR,
        error: error
    }
}

export const updateAnswer = (payload, token) => {
  return (dispatch) => {
    dispatch(changeAnswerStart());
    const header = headerAuthConfig(token);
    console.log(payload)
    axios
      .put(
        `${baseUrl}auth/answers/${payload.id}`,
        {...payload},
        header
      )
      .then((res) => dispatch(changeAnswerSuccess(res.data.data)))
      .catch((err) => dispatch(changeAnswerError(err.message)));
  };
};

const createAnswerSuccess = (newQuetion) => {
  return {
    type: actionsType.CREATE_ANSWER,
    newQuetion: newQuetion
  }
}

export const createAnswer = (payload, token) => {
  return (dispatch) => {
    dispatch(changeAnswerStart());
    const header = headerAuthConfig(token);
    axios
      .post(
        `${baseUrl}auth/answers`,
        {...payload},
        header
      )
      .then((res) => dispatch(createAnswerSuccess(res.data.data)))
      .catch((err) => dispatch(changeAnswerError(err.message)));
  };
}

const deleteAnswerSuccess = (deleteId) => {
  return {
    type: actionsType.DELETE_ANSWER_SUCCESS,
    deleteId:deleteId
  }
}
export const deleteAnswer = (id, token) => {
  return (dispatch) => {
    dispatch(changeAnswerStart());
    const header = headerAuthConfig(token);
    axios
      .delete(
        `${baseUrl}auth/answers/${id}`,
        header
      )
      .then((res) => dispatch(deleteAnswerSuccess(id)))
      .catch((err) => dispatch(changeAnswerError(err.message)));
  };
}