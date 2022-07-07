import React from "react";
import { useState, useEffect } from "react";
import Cloudinary from "../Cloudinary";

export default function AddCatForm() {
  const [myLocation, setMyLocation] = useState(null); // { latitude: 1231, longitude: 123 }
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();
    //dispatch(postNewArtWork(name, minimumBid, imageUrl));
    setName("");
    setDescription("");
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      console.log("geolocation available");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMyLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          console.log("Unable to retrieve your location");
        }
      );
    } else {
      console.log("geolocation not available");
    }
  };

  console.log("my location", myLocation);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div>
      <div>
        <p>Post a new Cat</p>
      </div>
      <form onSubmit={onFormSubmit}>
        <div>
          <label>Name </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div></div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Cloudinary />
        <button type="submit">Post a New Cat</button>
      </form>
    </div>
  );
}

/*


*/
