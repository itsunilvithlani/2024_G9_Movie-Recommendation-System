import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    LOGOUT
} from '../actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    loginError: null // Added loginError
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case AUTHENTICATED_SUCCESS:
            return{
                ...state,
                isAuthenticated: true,
                loginError: null // Reset loginError
            }

        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh);
            return{
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh,
                loginError: null // Reset loginError
            }

        case SIGNUP_SUCCESS:
            return{
                ...state,
                isAuthenticated: false,
                loginError: null // Reset loginError
            }
        case USER_LOADED_SUCCESS:
            return{
                ...state,
                user: payload,
                loginError: null // Reset loginError
            }
        
        case AUTHENTICATED_FAIL:
        case USER_LOADED_FAIL:
        case LOGIN_FAIL:
            console.log("login failed");
            return{
                ...state,
                isAuthenticated: false,
                loginError: payload // Set loginError
            }

        case SIGNUP_FAIL:
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return{
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                loginError: null // Reset loginError
            }

        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
            return {
                ...state,
                loginError: null // Reset loginError
            }
        default: 
            return state
    }
}
