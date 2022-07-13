import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  categoryDetails: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    dataFetched: (state, action) => {
      console.log(action.payload, "cats that are categprized");
      state.categoryDetails = action.payload;
    },
  },
});

export const { dataFetched } = categorySlice.actions;

export default categorySlice.reducer;
