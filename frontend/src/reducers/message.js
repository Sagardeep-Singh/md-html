import { MESSAGE_SUCCESS, MESSAGE_FAIL, MESSAGE_CLEAR } from "../actions/types";

const intialState = {
  message: "",
  display: "d-none",
  type: "success",
};

export default function handle(state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case MESSAGE_SUCCESS:
      return {
        type: "success",
        display: "d-block",
        message: payload,
      };
    case MESSAGE_FAIL:
      return {
        message: payload,
        type: "danger",
        display: "d-block",
      };
    case MESSAGE_CLEAR:
      return {
        ...state,
        display: "d-none",
      };
    default:
      return state;
  }
}
