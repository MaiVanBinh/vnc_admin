import {
  LOGIN_ERROR,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOG_OUT,
} from "./actionTypes";
import axios from "axios";
import { baseUrl } from "../utilities/apiConfig";

export const logout = () => {
  localStorage.removeItem("autobi-auth");
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

const loginSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload
  };
};

const loginError = (errMessage) => {
  return {
    type: LOGIN_ERROR,
    errMessage: errMessage,
  };
};
export const login = (username, password, callback) => {
  return (dispatch) => {
    dispatch(loginStart());
    axios
      .post(
        `${baseUrl}users/login`,
        { username: username, password: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        // res.data.expirationTime
        // console.log(res);
        const data = res.data.data;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

        let authStorage = JSON.stringify(res.data.data);

        localStorage.setItem("autobi-auth", authStorage);
        localStorage.setItem("expirationDate", expirationDate);

        dispatch(loginSuccess(data));
        dispatch(checkAuthTimeout(3600));

        if(callback) callback(data);
      })
      .catch((err) => {
        dispatch(loginError(err.message));
        if(callback) callback(null);
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    // const auth = localStorage.getItem("autobi-auth");
    // if (!auth) {
    //   dispatch(logout());
    // } else {
      
    // }

    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    if (expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      // dispatch(loginSuccess(JSON.parse(auth)));
      dispatch(
        checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  };
};