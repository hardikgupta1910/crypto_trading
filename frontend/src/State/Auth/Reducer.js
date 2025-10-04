import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  GET_USER_REQUEST,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_2FA_PENDING,
  VERIFY_OTP_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_SUCCESS,
  LOGOUT,
} from "./ActionTypes";

const initialState = {
  user: null,
  loading: false,
  error: null,
  jwt: localStorage.getItem("jwt") || null,
  session: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case VERIFY_OTP_SUCCESS:
      return { ...state, loading: false, error: null, jwt: action.payload }; //in this jwt we store actual token as registration is success

    case GET_USER_SUCCESS: // seprate as here we had to update user state
      return { ...state, user: action.payload, loading: false, error: null };

    case LOGIN_2FA_PENDING: // <-- Add this new case
      // This case handles the intermediate state where we are waiting for the OTP.
      // It saves the session ID from the backend response.
      return {
        ...state,
        loading: false,
        session: action.payload.session,
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
      return { ...state, loading: false, error: action.payload }; // laoding is false as work i completed and we get failure on registration and store error message in payload field

    case LOGOUT: {
      return initialState;
    }

    default:
      return state;
  }
};

export default authReducer;
