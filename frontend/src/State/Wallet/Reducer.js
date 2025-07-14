import * as types from "./ActionTypes";

const initialState = {
  userWallet: null,
  loading: false,
  error: null,
  transactions: [],
};

const walletReducer = (state = initialState, action) => {
  console.log("Wallet Reducer received:", action.type);
  switch (action.type) {
    case types.GET_USER_WALLET_REQUEST:
    case types.DEPOSIT_MONEY_REQUEST:
    case types.TRANSFER_MONEY_REQUEST:
    case types.GET_WALLET_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.GET_WALLET_TRANSACTION_SUCCESS:
      return {
        ...state,
        transactions: action.payload,
        loading: false,
        error: null,
      };

    case types.GET_USER_WALLET_SUCCESS:
    case types.TRANSFER_MONEY_SUCCESS:
      console.log("Action type", action.type, "Payload:", action.payload);

      return {
        ...state,
        userWallet: action.payload,
        loading: false,
        error: null,
      };

    case types.DEPOSIT_MONEY_SUCCESS:
      console.log("Action type", action.type, "Payload:", action.payload);

      return {
        ...state,
        userWallet: action.payload,
        loading: false,
        error: null,
      };

    case types.GET_USER_WALLET_FAILURE:
    case types.DEPOSIT_MONEY_FAILURE:
    case types.TRANSFER_MONEY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case types.UPDATE_WALLET_BALANCE:
      console.log("Action type", action.type, "Payload:", action.payload);

      return {
        ...state,
        userWallet: action.payload,
      };

    default:
      return state;
  }
};

export default walletReducer;
