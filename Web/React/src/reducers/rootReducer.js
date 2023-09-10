import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./authReducer";
import { modalDataReducer } from "./modalDataReducer";
import { messagesDataReducer } from "./messagesDataReducer";
import { persistReducer } from "redux-persist"; // redux-persist의 persistReducer import
import storage from "redux-persist/lib/storage"; // storage engine

// persist 잘 모르고 로컬스토리지로 썼었는데, 세션 스토리지로 바꾸고 싶다면 lib/storage/session으로 바꿀 것.

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // persist 적용될 리듀서
};

const rootReducer = combineReducers({
  auth: authReducer,
  modalData: modalDataReducer,
  messagesData: messagesDataReducer,
});

export default persistReducer(persistConfig, rootReducer);
