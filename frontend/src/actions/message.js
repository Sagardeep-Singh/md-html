import { MESSAGE_CLEAR, MESSAGE_FAIL, MESSAGE_SUCCESS } from "../actions/types";

export const clearMessage = () => (dispatch) => {
  dispatch({
    type: MESSAGE_CLEAR,
  });
};

export const displayMessage = (message) => (dispatch) => {
  dispatch({
    type: MESSAGE_SUCCESS,
    payload: message,
  });
};

export const displayError = (message) => (dispatch) => {
  dispatch({
    type: MESSAGE_FAIL,
    payload: message,
  });
};
