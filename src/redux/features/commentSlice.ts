import { createSlice } from "@reduxjs/toolkit";
import type { CommentSliceState, PostInfoAction } from "@/types";

const initialState: CommentSliceState = {
  isVisible: false,
  info: {
    postId: "id",
    name: "",
    userName: "",
    userImg: "",
    postText: "",
    timestamp: new Date(),
  },
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    toggleCommentModal: (state) => {
      state.isVisible = !state.isVisible;
    },
    setPostInfo: (state, action: PostInfoAction) => {
      state.info = action.payload;
    },
  },
});

export const { toggleCommentModal, setPostInfo } = commentSlice.actions;

export default commentSlice.reducer;
