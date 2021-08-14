import axios from "axios";
import {
  PROFILE_LOAD_SUCCESS,
  PROFILE_LOAD_FAIL,
  PROFILE_SAVE_SUCCESS,
  PROFILE_SAVE_FAIL,
  PROFILE_DELETE_FAIL,
  PROFILE_DELETE_SUCCESS,
  LOGOUT_SUCCESS,
} from "./types";
import Cookies from "js-cookie";
import { displayMessage, displayError } from "./message";

export const loadProfile = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios
      .get(`${process.env.REACT_APP_API_URL}/profile`, {}, config)
      .catch((err) => {});

    if (!res.data.success) {
      dispatch({
        type: PROFILE_LOAD_FAIL,
        payload: {},
      });
    } else {
      dispatch({
        type: PROFILE_LOAD_SUCCESS,
        payload: {
          ...res.data.profile,
          ...res.data.user,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: PROFILE_LOAD_FAIL,
      payload: {},
    });
  }
};

export const saveProfile =
  (
    first_name,
    last_name,
    email,
    phone,
    city,
    auto_save,
    password = null,
    new_password = null,
    new_password2 = null
  ) =>
  async (dispatch) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/profile`,
        {
          first_name,
          last_name,
          email,
          phone,
          city,
          auto_save,
          password,
          new_password,
          new_password2,
        },
        config
      );

      if (!res.data.success) {
        dispatch({
          type: PROFILE_SAVE_FAIL,
          payload: {},
        });
        dispatch(displayError(res.data.message));
      } else {
        dispatch({
          type: PROFILE_SAVE_SUCCESS,
          payload: {
            ...res.data.profile,
            ...res.data.user,
          },
        });
        dispatch(displayMessage(res.data.message));
      }
    } catch (err) {
      dispatch({
        type: PROFILE_SAVE_FAIL,
        payload: {},
      });
    }
  };

export const deleteProfile = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/profile`,
      {},
      config
    );

    if (!res.data.success) {
      dispatch({
        type: PROFILE_DELETE_FAIL,
        payload: {},
      });
      dispatch(displayError(res.data.message));
    } else {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
      dispatch({
        type: PROFILE_DELETE_SUCCESS,
        payload: res,
      });
      dispatch(displayMessage(res.data.message));
      Cookies.delete("csrftoken");
    }
  } catch (err) {
    dispatch({
      type: PROFILE_DELETE_FAIL,
      payload: {},
    });
  }
};
