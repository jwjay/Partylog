import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import rootReducer from "../reducers/rootReducer";

export const store = configureStore({
  reducer: rootReducer,

  // non-serializable 에러 해결을 위해 쓴 코드.. 그냥 에러를 무시하는 코드인데, 찾아봐도 이런 해결법만 보임.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);
