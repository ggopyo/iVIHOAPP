import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./loginRedux";
import postReducer from "./postRedux";

import searchReducer from "./searchRedux";
import selectedUserReducer from "./selectedUserRedux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  login: loginReducer,
  post: postReducer,
  search: searchReducer,
  selectUser: selectedUserReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export let persistor = persistStore(store);
