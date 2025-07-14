// // import thunk from "redux-thunk";
// import thunk from "redux-thunk/es/index.js";

// import { combineReducers, legacy_createStore, applyMiddleware } from "redux";
// import authReducer from "./Auth/Reducer";
// import coinReducer from "./Coin/Reducer";

// const rootReducer = combineReducers({
//   auth: authReducer,
//   coin: coinReducer,
// });

// // export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./Auth/Reducer";
import coinReducer from "./Coin/Reducer";
import walletReducer from "./Wallet/Reducer";
import withdrawalReducer from "./Withdrawal/Reducer";
import orderReducer from "./Order/Reducer";
import assetReducer from "./Asset/Reducer";
import watchlistReducer from "./Watchlist/Reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  coin: coinReducer,
  wallet: walletReducer,
  withdrawal: withdrawalReducer,
  order: orderReducer,
  asset: assetReducer,
  watchlist: watchlistReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
