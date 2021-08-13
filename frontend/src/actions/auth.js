import axios from "axios";
import {
    SIGNUP_SUCCESS, SIGNUP_FAIL
} from './types';

export const signup = (username, password, password2, first_name, last_name, email) => async dispatch => {
    const config = {
        headers: {
            "Accept": "application/json",
            "Contact-Type": "applcation/json"
        }
    }

    const body = JSON.stringify({ username, password, password2, first_name, last_name, email });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, body, config);
        console.log(res);
        if (!res.success) {
            dispatch({
                type: SIGNUP_FAIL
            })
        }
        dispatch({
            type: SIGNUP_SUCCESS
        })
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        })
    }
}