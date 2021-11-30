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
    const url = getApi("GET", "event", "idetify");
    axios
      .get(url)
      .then((res) => dispatch(fetchHashTagIdSuccess(res.data.data)))
      .catch((err) => dispatch(fetchError(err.message)));
  };
};

const fetchEventSuccess = (type, events) => {
  return {
    type: actionsType.FETCH_EVENT_SUCCESS,
    events: {
      type: type,
      events: events,
    },
  };
};

// fetch event
export const fetchEvent = (payload) => {
  return (dispatch) => {
    dispatch(fetchStart());
    const query = getQuery(payload);
    const url = getApi("GET", "event", null, query);
    axios
      .get(url)
      .then((res) => {
        return dispatch(fetchEventSuccess(res.data.data));
      })
      .catch((err) => dispatch(fetchError(err.message)));
  };
};

const fetchEventDetailSucces = (event) => {
  return {
    type: actionsType.FETCH_EVENT_DETAIL_SUCCESS,
    event: event,
  };
};

export const fetchEventDetail = (id) => {
  return (dispatch) => {
    dispatch(fetchStart());
    const url = getApi("GET", "event", id, null);
    axios
      .get(url)
      .then((res) => dispatch(fetchEventDetailSucces(res.data.data)))
      .catch((err) => dispatch(fetchError(err.message)));
  };
};

export const eventEndForm = () => {
  return {
    type: actionsType.EVENT_END_FORM
  }
}

const changeEventStart = () => {
  return {
    type: actionsType.CHANGE_EVENT_START,
  };
};

const changeEventSuccess = (newEvent) => {
    return {
        type: actionsType.CHANGE_EVENT_SUCCESS,
        newEvent: newEvent
    }
}

const changeEventError = (error) => {
    return {
        type: actionsType.CHANGE_EVENT_ERROR,
        error: error
    }
}

export const updateEvent = (payload, token) => {
  return (dispatch) => {
    dispatch(changeEventStart());
    const header = headerAuthConfig(token);
    axios
      .put(
        `${baseUrl}auth/campaign-event/${payload.id}`,
        {...payload},
        header
      )
      .then((res) => dispatch(changeEventSuccess(res.data.data)))
      .catch((err) => dispatch(changeEventError(err.message)));
  };
};

const createEventSuccess = (newEvent) => {
  return {
    type: actionsType.CREATE_EVENT,
    newEvent: newEvent
  }
}

export const createEvent = (payload, token) => {
  return (dispatch) => {
    dispatch(changeEventStart());
    const header = headerAuthConfig(token);
    axios
      .post(
        `${baseUrl}auth/campaign-event`,
        {...payload},
        header
      )
      .then((res) => dispatch(createEventSuccess(res.data.data)))
      .catch((err) => dispatch(changeEventError(err.message)));
  };
}

const deleteEventSuccess = (deleteId) => {
  return {
    type: actionsType.DELETE_EVENT_SUCCESS,
    deleteId:deleteId
  }
}
export const deleteEvent = (id, token) => {
  return (dispatch) => {
    dispatch(changeEventStart());
    const header = headerAuthConfig(token);
    axios
      .delete(
        `${baseUrl}auth/campaign-event/${id}`,
        header
      )
      .then((res) => dispatch(deleteEventSuccess(id)))
      .catch((err) => dispatch(changeEventError(err.message)));
  };
}