import axios from "axios";
import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_2FA_PENDING,
  VERIFY_OTP_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionTypes";

export const register = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const baseUrl = "http://localhost:5454";
    const response = await axios.post(`${baseUrl}/auth/signup`, userData);
    const user = response.data;
    console.log(user);
    dispatch({ type: REGISTER_SUCCESS, payload: user.jwt });
    localStorage.setItem("jwt", user.jwt);
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.message });

    console.log(error);
  }
};


export const login = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const baseUrl = "http://localhost:5454"; // Use your actual port
    // 1. Make the API call to your /auth/signin endpoint
    const response = await axios.post(`${baseUrl}/auth/signin`, userData.data);
    const user = response.data;

    if (user.twoFactorAuthEnabled) {
      // 2. If 2FA is ON, the backend sends a session ID.
      //    - Dispatch the PENDING action to save the session.
      //    - Navigate the user to the verification page.
      dispatch({ type: LOGIN_2FA_PENDING, payload: user });
      userData.navigate("/verify-2fa");
    } else {
      // 3. If 2FA is OFF, the login is complete.
      //    - Save the JWT to localStorage.
      //    - Dispatch the final success action.
      localStorage.setItem("jwt", user.jwt);
      dispatch({ type: LOGIN_SUCCESS, payload: user.jwt });
      userData.navigate("/");
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};
export const getUser = (jwt) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const baseUrl = "http://localhost:5454";
    const response = await axios.get(`${baseUrl}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const user = response.data;
    console.log(user);
    dispatch({ type: GET_USER_SUCCESS, payload: user }); // well get our actual user  send this user as a payload whole user not only jwt
  } catch (error) {
    dispatch({ type: GET_USER_FAILURE, payload: error.message });

    console.log(error);
  }
};

export const verifyOtp = (otpData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST }); // You can reuse LOGIN_REQUEST for the loading state
  try {
    const baseUrl = "http://localhost:5454";
    // 1. Call your /auth/two-factor/otp/verify endpoint
    const response = await axios.post(
      `${baseUrl}/auth/two-factor/otp/verify?id=${otpData.id}&otp=${otpData.otp}`
    );
    const user = response.data;

    // 2. If the OTP is correct, the backend sends the final JWT.
    localStorage.setItem("jwt", user.jwt);
    // 3. Dispatch a success action with the final JWT.
    dispatch({ type: VERIFY_OTP_SUCCESS, payload: user.jwt });

    // You can navigate the user to the dashboard from here if you like
    // otpData.navigate("/");
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: LOGOUT });
};



export const RESEND_OTP_REQUEST = "RESEND_OTP_REQUEST";
export const RESEND_OTP_SUCCESS = "RESEND_OTP_SUCCESS";
export const RESEND_OTP_FAILURE = "RESEND_OTP_FAILURE";

export const resendOtp = (sessionId) => async (dispatch) => {
  dispatch({ type: RESEND_OTP_REQUEST });
  try {
    const baseUrl = "http://localhost:5454"; 
    await axios.post(
      `${baseUrl}/auth/two-factor/otp/resend?sessionId=${sessionId}`
    );

    dispatch({ type: RESEND_OTP_SUCCESS });
  } catch (error) {
    dispatch({ type: RESEND_OTP_FAILURE, payload: error.message });
  }
};
