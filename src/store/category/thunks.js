import axios from "axios";
import {
  dataFetched,
  fetchComments,
  catCommentFetched,
} from "../category/slice";
import { showMessageWithTimeout } from "../appState/thunks";

const API_URL = `https://cat-radar.herokuapp.com`;

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

//Get Comment by CatId with User
export const fetchCommentWithUser = (catId) => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${API_URL}/cats/comment/${catId}`);
    //console.log("response", response.data);
    const res = response.data;
    dispatch(catCommentFetched(res));
  } catch (e) {
    console.log(e.message);
  }
};

//Create a new Comment
export const postNewComment = (text) => async (dispatch, getState) => {
  try {
    const token = getState().user.token;
    const userId = getState().user.profile.id;
    const catId = getState().cat.details.id;
    const response = await axios.post(
      `${API_URL}/cats/comment/${catId}`,
      {
        text: text,
        userId: userId,
        catId: catId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    //console.log("response", response.data);
    dispatch(fetchCommentWithUser(catId));
    showMessageWithTimeout("success", false, "You Comment is Posted!", 2000);
  } catch (e) {
    console.log(e.message);
  }
};
