import { configureStore } from "@reduxjs/toolkit";
import diaryReducer from "./diarySlice";
const localStorageMiddlewares = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    const { diary } = getState();
    if (diary) {
      localStorage.setItem("diary", JSON.stringify(diary));
    }
    return result;
  };
};

export const store = configureStore({
  reducer: {
    diary: diaryReducer,
  },
  middleware: [localStorageMiddlewares],
});
