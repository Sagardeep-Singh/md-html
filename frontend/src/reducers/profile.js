import { PROFILE_LOAD_SUCCESS, PROFILE_LOAD_FAIL } from "../actions/types";

const intialState = {
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  city: "",
  auto_save: false,
};

export default function handle(state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_LOAD_SUCCESS:
      return {
        ...state,
        ...payload,
      };
    case PROFILE_LOAD_FAIL:
      return {
        ...intialState,
        username: "",
        first_name: "",
        last_name: "",
        phone: "",
        city: "",
        email: "",
        auto_save: false,
      };
    default:
      return state;
  }
}
