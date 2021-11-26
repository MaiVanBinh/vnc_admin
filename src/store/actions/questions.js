import axios from "axios";
import * as actionsType from "./actionTypes";
import { getQuery } from "../utilities/updateObject";
import { getApi, baseUrl, headerAuthConfig } from "../utilities/apiConfig";

const fetchQuestionSuccess = (type, questions) => {
  return {
    type: actionsType.FETCH_QUESTION_SUCCESS,
    questions: {
      questions: questions,
    },
  };
};

// fetch question
export const fetchQuestion = (payload) => {
  return (dispatch) => {
    dispatch(fetchStart());
    const query = getQuery(payload);
    const url = getApi("GET", "questions", null, query);
    axios
      .get(url)
      .then((res) => {
        return dispatch(fetchQuestionSuccess(res.data.data));
      })
      .catch((err) => dispatch(fetchError(err.message)));
  };
};

const fetchQuestionDetailSucces = (questions) => {
  return {
    type: actionsType.FETCH_QUESTION_DETAIL_SUCCESS,
    questions: questions,
  };
};

export const fetchQuestionDetail = (id) => {
  return (dispatch) => {
    dispatch(fetchStart());
    const url = getApi("GET", "questions", id, null);
    axios
      .get(url)
      .then((res) => dispatch(fetchQuestionDetailSucces(res.data.data)))
      .catch((err) => dispatch(fetchError(err.message)));
  };
};

export const questionEndForm = () => {
  return {
    type: actionsType.QUESTION_END_FORM
  }
}

const changeQuestionStart = () => {
  return {
    type: actionsType.CHANGE_QUESTION_START,
  };
};

const changeQuestionSuccess = (newQuetion) => {
    return {
        type: actionsType.CHANGE_QUESTION_SUCCESS,
        newQuetion: newQuetion
    }
}

const changeQuetionError = (error) => {
    return {
        type: actionsType.CHANGE_QUESTION_ERROR,
        error: error
    }
}

export const updateQuestion = (payload, token) => {
  return (dispatch) => {
    dispatch(changeQuestionStart());
    const header = headerAuthConfig(token);
    console.log(payload)
    axios
      .put(
        `${baseUrl}auth/question/${payload.id}`,
        {...payload},
        header
      )
      .then((res) => dispatch(changeQuestionSuccess(res.data.data)))
      .catch((err) => dispatch(changeQuetionError(err.message)));
  };
};

const createQuestionSuccess = (newQuetion) => {
  return {
    type: actionsType.CREATE_QUESTION,
    newQuetion: newQuetion
  }
}

export const createQuestion = (payload, token) => {
  return (dispatch) => {
    dispatch(changeQuestionStart());
    const header = headerAuthConfig(token);
    axios
      .post(
        `${baseUrl}auth/question`,
        {...payload},
        header
      )
      .then((res) => dispatch(createQuestionSuccess(res.data.data)))
      .catch((err) => dispatch(changeQuestionError(err.message)));
  };
}

const deleteQuestionSuccess = (deleteId) => {
  return {
    type: actionsType.DELETE_QUESTION_SUCCESS,
    deleteId:deleteId
  }
}
export const deleteQuestion = (id, token) => {
  return (dispatch) => {
    dispatch(changeQuestionStart());
    const header = headerAuthConfig(token);
    axios
      .delete(
        `${baseUrl}auth/question/${id}`,
        header
      )
      .then((res) => dispatch(deleteQuestionSuccess(id)))
      .catch((err) => dispatch(changeQuestionError(err.message)));
  };
}