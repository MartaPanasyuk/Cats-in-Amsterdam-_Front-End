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

// PUT change the number of  seenigTimes
export const updayteCatSeenTimes = (catId) => async (dispatch, getState) => {
  try {
    const response = await axios.put(`${API_URL}/cats/${catId}`);
    //console.log("response", response.data);
    dispatch(catDetailsFatched(response.data));
  } catch (e) {
    console.log(e.message);
  }
};

/*


import axios from "axios";
import {
  pictureFetched,
  pictureDetailsFatched,
  addingNewBid,
} from "../artwork/slice";
import { showMessageWithTimeout } from "../appState/actions";

const API_URL = `http://localhost:4000`;

// Get All ArtWork
export const fetchArtWork = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${API_URL}/artworks`);
    //console.log("response", response.data);
    const res = response.data;
    dispatch(pictureFetched(res));
  } catch (e) {
    console.log(e.message);
  }
};

//Get ArtWork by Id includes Bids
export const fetchPictureWithBid =
  (artworkId) => async (dispatch, getState) => {
    try {
      const response = await axios.get(`${API_URL}/artworks/${artworkId}`);
      //console.log("response", response.data);
      const res = response.data;
      dispatch(pictureDetailsFatched(res));
    } catch (e) {
      console.log(e.message);
    }
  };

// PUT change the number of  hearts
export const updayteArtHearts = (artworkId) => async (dispatch, getState) => {
  try {
    const response = await axios.put(`${API_URL}/artworks/${artworkId}`);
    //console.log("response", response.data);
    dispatch(pictureDetailsFatched(response.data));
  } catch (e) {
    console.log(e.message);
  }
};

//POST a new Bid
export const postNewBid = (amount) => async (dispatch, getState) => {
  try {
    const artworkId = getState().artwork.details.id;
    const email = getState().user.profile.email;
    const token = getState().user.token;

    const response = await axios.post(
      `${API_URL}/artworks/${artworkId}/bids`,
      { email: email, amount: amount, artworkId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    //console.log("response", response.data);
    dispatch(addingNewBid(response.data));
  } catch (e) {
    console.log(e.message);
  }
};

//Create a new ArtWork
export const postNewArtWork =
  (title, minimumBid, imageUrl) => async (dispatch, getState) => {
    try {
      const userId = getState().user.profile.id;
      const token = getState().user.token;
      const response = await axios.post(
        `${API_URL}/artworks/picture/auction`,
        {
          title: title,
          minimumBid: minimumBid,
          imageUrl: imageUrl,
          userId: userId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      //console.log("response", response.data);
      dispatch(
        showMessageWithTimeout("success", false, "You Art is Posted!", 2000)
      );
    } catch (e) {
      console.log(e.message);
    }
  };

  */
