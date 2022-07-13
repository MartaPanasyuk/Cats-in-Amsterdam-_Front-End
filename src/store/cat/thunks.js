import axios from "axios";
import {
  catFetched,
  catDetailsFatched,
  catImageFetched,
  catCommentFetched,
  fetchCategories,
} from "../cat/slice";
import { showMessageWithTimeout } from "../appState/thunks";

const API_URL = `http://localhost:4000`;

// Get All Cats
export const fetchCat = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${API_URL}/cats`);
    console.log("response of cats", response.data);
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
    console.log("response", response.data);
    dispatch(catCommentFetched(response.data));
    showMessageWithTimeout("success", false, "You Comment is Posted!", 2000);
  } catch (e) {
    console.log(e.message);
  }
};

//Create a new Cat
export const postNewCat =
  (name, image, description, myLocation) => async (dispatch, getState) => {
    try {
      const token = getState().user.token;
      const latitude = myLocation.latitude;
      const longitude = myLocation.longitude;
      const response = await axios.post(
        `${API_URL}/cats/addCat`,
        {
          name: name,
          picture: image,
          description: description,
          latitude,
          longitude,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      //console.log("response", response);
      dispatch(showMessageWithTimeout("success", true, "You Cat Is Posted!"));
    } catch (e) {
      console.log(e.message);
    }
  };

//Add Image and Location to the existing Cat
export const updateCat = (image, myLocation) => async (dispatch, getState) => {
  try {
    const token = getState().user.token;
    const userId = getState().user.profile.id;
    const catId = getState().cat.details.id;
    const latitude = myLocation.latitude;
    const longitude = myLocation.longitude;
    const response = await axios.post(
      `${API_URL}/cats/${catId}`,
      {
        url: image,
        latitude,
        longitude,
        userId,
        catId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // console.log("response", response);
    dispatch(showMessageWithTimeout("success", true, "You Image Is Posted!"));
    dispatch(catImageFetched(response.data));
  } catch (e) {
    console.log(e.message);
  }
};

//Get All Categories
export const allCategories = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${API_URL}/rating`);
    const res = response.data;
    //console.log("response", res);
    dispatch(fetchCategories(res));
  } catch (e) {
    console.log(e.message);
  }
};

// Add Cat Rating
export const rateCat =
  (newValue, categoryId, catId) => async (dispatch, getState) => {
    try {
      // const token = getState().user.token;
      const response = await axios.post(
        `${API_URL}/rating`,
        {
          stars: newValue,
          categoryId,
          catId,
        }
        //{ headers: { Authorization: `Bearer ${token}` } }
      );
      //console.log("response", response);
    } catch (e) {
      console.log(e.message);
    }
  };
