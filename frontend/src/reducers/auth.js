import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  CSRF_SUCCESS,
  CSRF_FAIL,
} from "../actions/types";

const intialState = {
  isAuthenticated: null,
};

export default function handle(state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTHENTICATED_SUCCESS:
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: payload,
      };
    case LOGIN_SUCCESS:
    case LOGOUT_FAIL:
      return {
        ...state,
        isAuthenticated: true,
      };
    case SIGNUP_SUCCESS:
    case LOGOUT_SUCCESS:
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };
    case SIGNUP_FAIL:
    case CSRF_SUCCESS:
    case CSRF_FAIL:
    default:
      return state;
  }
}
