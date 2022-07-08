import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  catlist: [],
  details: null,
};

export const catSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {
    catFetched: (state, action) => {
      state.catlist = action.payload;
    },
    catDetailsFatched: (state, action) => {
      state.details = action.payload;
    },
    catImageFetched: (state, action) => {
      state.details.images = [...state.details.images, action.payload];
    },
  },
});

export const { catFetched, catDetailsFatched, catImageFetched } =
  catSlice.actions;

export default catSlice.reducer;
