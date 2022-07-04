import { configureStore } from "@reduxjs/toolkit";

import appStateReducer from "./appState/slice";
import userReducer from "./user/slice";
import catReducer from "./cat/slice";

export default configureStore({
  reducer: {
    appState: appStateReducer,
    user: userReducer,
    cat: catReducer,
  },
});
