import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  catlist: [],
  details: null,
  categorylist: [],
};

export const catSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {
    catFetched: (state, action) => {
      console.log(action.payload, "cats");
      state.catlist = action.payload;
    },
    catDetailsFatched: (state, action) => {
      state.details = action.payload;
    },
    catImageFetched: (state, action) => {
      state.details.images = [...state.details.images, action.payload];
    },
    catCommentFetched: (state, action) => {
      state.details.comments = [...state.details.comments, action.payload];
    },
    fetchCategories: (state, action) => {
      state.categorylist = action.payload;
    },
  },
});

export const {
  catFetched,
  catDetailsFatched,
  catImageFetched,
  catCommentFetched,
  fetchCategories,
} = catSlice.actions;

export default catSlice.reducer;

/*


 


    */
