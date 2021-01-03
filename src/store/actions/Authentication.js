import {
  LOGIN_ERROR,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOG_OUT,
} from "./actionTypes";
import axios from "axios";
import { baseUrl } from "../utilities/apiConfig";

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: LOG_OUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

const loginStart = () => {
  return {
    type: LOGIN_START,
  };
};

const loginSuccess = (token) => {
  return {
    type: LOGIN_SUCCESS,
    token: token,
  };
};

const loginError = (errMessage) => {
  return {
    type: LOGIN_ERROR,
    errMessage: errMessage,
  };
};
export const login = (email, password) => {
  return (dispatch) => {
    dispatch(loginStart());
    axios
      .post(
        `${baseUrl}users/login`,
        { email: email, password: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        // res.data.expirationTime
        localStorage.setItem("token", res.data.data.token);
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(loginSuccess(res.data.data.token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => dispatch(loginError(err.message)));
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(loginSuccess(token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};