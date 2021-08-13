import {
    SIGNUP_SUCCESS, SIGNUP_FAIL
} from '../actions/types';

const intialState = {
    isAuthenticated: null,
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    city: ""
};

export default function (state = intialState, action) {
    const { type, _ } = action;

    switch (type) {
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        default:
            return state
    }
}