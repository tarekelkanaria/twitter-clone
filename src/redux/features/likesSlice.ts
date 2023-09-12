import { createSlice } from "@reduxjs/toolkit";
import type { LikesInitAction, LikesSliceState } from "@/types";

const initialState: LikesSliceState = {
  isVisible: false,
  likesList: [],
};

const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    toggleLikesModal: (state) => {
      state.isVisible = !state.isVisible;
    },
    likesInit: (state, action: LikesInitAction) => {
      state.likesList = action.payload;
    },
  },
});

export const { toggleLikesModal, likesInit } = likesSlice.actions;

export default likesSlice.reducer;
