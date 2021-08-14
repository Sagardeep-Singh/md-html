import axios from "axios";
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  AUTHENTICATED_FAIL,
  AUTHENTICATED_SUCCESS,
  CSRF_FAIL,
  CSRF_SUCCESS,
} from "./types";
import Cookies from "js-cookie";
import { loadProfile } from "./profile";
import { displayMessage, displayError } from "./message";
export const signup =
  (username, password, password2, first_name, last_name, email) =>
  async (dispatch) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    const body = JSON.stringify({
      username,
      password,
      password2,
      first_name,
      last_name,
      email,
    });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/signup`,
        body,
        config
      );
      if (!res.data.success) {
        dispatch({
          type: SIGNUP_FAIL,
        });
      } else {
        dispatch({
          type: SIGNUP_SUCCESS,
        });
      }
    } catch (err) {
      dispatch({
        type: SIGNUP_FAIL,
      });
    }
  };

export const login = (username, password) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({
    username,
    password,
  });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      body,
      config
    );

    console.log(res);
    if (!res.data.success) {
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch(displayError(res.data.message));
    } else {
      dispatch({
        type: LOGIN_SUCCESS,
      });
      dispatch(displayMessage("Login Successful"));
      dispatch(loadProfile());
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
    dispatch(displayError(err.message));
  }
};

export const logout = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/logout`,
      {},
      config
    );
    if (!res.data.success) {
      dispatch({
        type: LOGOUT_FAIL,
      });
      dispatch(displayError(res.data.message));
    } else {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    }
    dispatch(displayMessage("Logout Successful"));
  } catch (err) {
    dispatch({
      type: LOGOUT_FAIL,
    });
    dispatch(displayError(err.message));
  }
};

export const checkAuthenticated = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/auth/authenticated`,
      {},
      config
    );
    if (!res.data.success) {
      dispatch({
        type: AUTHENTICATED_FAIL,
        payload: false,
      });
    } else {
      dispatch({
        type: AUTHENTICATED_SUCCESS,
        payload: true,
      });
    }
  } catch (err) {
    dispatch({
      type: AUTHENTICATED_FAIL,
      payload: false,
    });
  }
};

export const loadCsrfToken = () => async (dispatch) => {
  if (Cookies.get("csrftoken") && Cookies.get("csrftoken").length !== 0) {
    dispatch({
      type: CSRF_SUCCESS,
    });
  } else {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/csrf`,
        {},
        config
      );
      if (!res.data.success) {
        dispatch({
          type: CSRF_FAIL,
        });
        dispatch(displayError(res.data.message));
      } else {
        dispatch({
          type: CSRF_SUCCESS,
        });
      }
    } catch (err) {
      dispatch({
        type: CSRF_FAIL,
      });
    }
  }
};
