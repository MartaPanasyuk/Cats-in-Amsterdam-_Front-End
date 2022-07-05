import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import Dropzone from "../Dropzone";
import ImageList from "../ImgeList";

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

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
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
        <div>
          <Dropzone onDrop={onDrop} accept={"image/*"} />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Post a New Cat</button>
      </form>
    </div>
  );
}

/*

setMyLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

*/
