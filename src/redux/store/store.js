import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducer/reducer";

const store = configureStore({
  reducer: { todo: userReducer.reducer },
});
export default store;
