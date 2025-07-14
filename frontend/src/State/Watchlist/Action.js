import api from "@/config/api";
import * as types from "./ActionTypes";

export const getUserWatchlist = (jwt) => async (dispatch) => {
  dispatch({ type: types.GET_USER_WATCHLIST_REQUEST });

  try {
    const responses = await api.get("/api/watchlist/user", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({
      type: types.GET_USER_WATCHLIST_SUCCESS,
      payload: responses.data,
    });
    console.log("user watchlist", responses.data);
  } catch (error) {
    dispatch({
      type: types.GET_USER_WATCHLIST_FAILURE,
      error: error.message,
    });
  }
};

// export const addItemToWatchlist =
//   ({ coinId, jwt }) =>
//   async (dispatch) => {
//     dispatch({ type: types.ADD_COIN_TO_WATCHLIST_REQUEST });

//     try {
//       const responses = await api.get(
//         `/api/watchlist/add/coin/${coinId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${jwt}`,
//           },
//         }
//       );

//       dispatch({
//         type: types.ADD_COIN_TO_WATCHLIST_SUCCESS,
//         payload: responses.data,
//       });
//       console.log("add coin to watchlist", responses.data);
//     } catch (error) {
//       console.log("error", error.response.data);
//       dispatch({
//         type: types.ADD_COIN_TO_WATCHLIST_FAILURE,
//         error: error.message,
//       });
//     }
//   };

export const addItemToWatchlist =
  ({ coinId, jwt }) =>
  async (dispatch) => {
    dispatch({ type: types.ADD_COIN_TO_WATCHLIST_REQUEST });

    try {
      const responses = await api.post(
        `/api/watchlist/add/coin/${coinId}`,
        {}, // empty request body
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch({
        type: types.ADD_COIN_TO_WATCHLIST_SUCCESS,
        payload: responses.data,
      });
      console.log("add coin to watchlist", responses.data);
    } catch (error) {
      console.log("error", error?.response?.data || error.message);
      dispatch({
        type: types.ADD_COIN_TO_WATCHLIST_FAILURE,
        error: error.message,
      });
    }
  };
