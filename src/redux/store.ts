import { configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "@/types";
import commentReducer from "./features/commentSlice";
import likesReducer from "./features/likesSlice";

const store = configureStore({
  reducer: {
    comment: commentReducer,
    likes: likesReducer,
  },
});

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
