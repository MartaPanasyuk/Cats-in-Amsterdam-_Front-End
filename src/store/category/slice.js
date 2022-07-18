import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  categoryDetails: [],
  comments: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    dataFetched: (state, action) => {
      console.log(action.payload, "cats that are categprized");
      state.categoryDetails = action.payload;
    },
    catCommentFetched: (state, action) => {
      state.comments = action.payload;
    },
  },
});

export const { dataFetched, fetchComments, catCommentFetched } =
  categorySlice.actions;

export default categorySlice.reducer;
