import React from "react";
import "./style.css";
import { useState, useEffect } from "react";
import Cloudinary from "../Cloudinary";
import { useDispatch } from "react-redux";
import { FaPaw } from "react-icons/fa";
import { updateCat } from "../../store/cat/thunks";

export default function AddImgLocation() {
  const [myLocation, setMyLocation] = useState(null); // { latitude: 1231, longitude: 123 }

  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(null);

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCat(image, myLocation));
    setImage(null);
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

  //console.log("my location", myLocation);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="Form-wrapper">
      {showForm ? (
        <form onSubmit={onFormSubmit}>
          <Cloudinary image={image} setImage={setImage} />
          <button>Post a new photo</button>
          <button onClick={() => setShowForm(false)}>Discard</button>
        </form>
      ) : (
        <button onClick={() => setShowForm(true)} className="btn-wrapper">
          Have you seen me? <FaPaw />
        </button>
      )}
    </div>
  );
}
