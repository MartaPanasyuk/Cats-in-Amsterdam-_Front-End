import axios from "axios";
import { dataFetched } from "../category/slice";

const API_URL = `http://localhost:4000`;

//Get One Category Include Rating
export const oneCategory = (categoryId) => async (dispatch, getState) => {
  console.log(categoryId, "this is caegory");
  try {
    const response = await axios.get(`${API_URL}/rating/${categoryId}`);
    //console.log("response", response.data);
    const res = response.data;
    console.log(res, "this is res");
    dispatch(dataFetched(res));
  } catch (e) {
    console.log(e.message);
  }
};
