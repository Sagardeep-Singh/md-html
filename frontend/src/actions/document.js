import axios from "axios";
import { DOCUMENT_SAVE_SUCCESS, DOCUMENT_SAVE_FAIL } from "./types";
import Cookies from "js-cookie";
import { displayMessage, displayError } from "./message";

export const saveDocument = (id, name, md, auto_save, notice = true) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/documents/${id}`,
      {
        name,
        md,
        auto_save,
      },
      config
    );

    if (!res.data.document.id) {
      dispatch({
        type: DOCUMENT_SAVE_FAIL,
        payload: {},
      });
      dispatch(displayError("Could Not Save Document"));
    } else {
      dispatch({
        type: DOCUMENT_SAVE_SUCCESS,
      });
      notice && dispatch(displayMessage("Document Saved"));
    }
  } catch (err) {
    dispatch({
      type: DOCUMENT_SAVE_FAIL,
    });
    dispatch(displayError(err.message));
  }
};

export const createDocument = (name, md, auto_save) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/documents/`,
      {
        name,
        md,
        auto_save,
      },
      config
    );

    if (!res.data.document.id) {
      dispatch({
        type: DOCUMENT_SAVE_FAIL,
        payload: {},
      });
      dispatch(displayError("Could Not Create Document"));
    } else {
      dispatch({
        type: DOCUMENT_SAVE_SUCCESS,
      });
      dispatch(displayMessage("Document Created"));
    }
  } catch (err) {
    dispatch({
      type: DOCUMENT_SAVE_FAIL,
      payload: {},
    });
  }
};

export const deleteDocument = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/documents/${id}`,
      config
    );

    if (!res.data.success) {
      dispatch({
        type: DOCUMENT_SAVE_FAIL,
      });
      dispatch(displayError("Could Not Save Document"));
    } else {
      dispatch({
        type: DOCUMENT_SAVE_SUCCESS,
      });
      dispatch({
        type: DOCUMENT_SAVE_FAIL,
      });
      dispatch(displayMessage("Document Deleted"));
    }
  } catch (err) {
    dispatch({
      type: DOCUMENT_SAVE_FAIL,
    });
  }
};
