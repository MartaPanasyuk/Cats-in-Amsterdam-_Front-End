import axios from "axios";
import { catFetched, catDetailsFatched } from "../cat/slice";

const API_URL = `http://localhost:4000`;

// Get All Cats
export const fetchCat = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${API_URL}/cats`);
    //console.log("response", response.data);
    const res = response.data;
    dispatch(catFetched(res));
  } catch (e) {
    console.log(e.message);
  }
};

//Get Cat by Id includes Images and Comments
export const fetchCatWithInfo = (catId) => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${API_URL}/cats/${catId}`);
    //console.log("response", response.data);
    const res = response.data;
    dispatch(catDetailsFatched(res));
  } catch (e) {
    console.log(e.message);
  }
};

// PUT Increasing  Likes
export const updayteCatLike = (catId) => async (dispatch, getState) => {
  try {
    const response = await axios.put(`${API_URL}/cats/${catId}`);
    //console.log("response", response.data);
    dispatch(catDetailsFatched(response.data));
  } catch (e) {
    console.log(e.message);
  }
};

//Create a new Comment
export const postNewComment = (text, catId) => async (dispatch, getState) => {
  try {
    const userId = getState().user.profile.id;
    const token = getState().user.token;
    const response = await axios.post(
      `${API_URL}/artworks/picture/auction`,
      {
        text: text,
        userId: userId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    //console.log("response", response.data);
    //dispatch(
    //showMessageWithTimeout("success", false, "You Art is Posted!", 2000)
    //);
  } catch (e) {
    console.log(e.message);
  }
};

//Create a new Cat
