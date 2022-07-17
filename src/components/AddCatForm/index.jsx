import React from "react";
import "./style.css";
import { useState, useEffect } from "react";
import Cloudinary from "../Cloudinary";
import { postNewCat } from "../../store/cat/thunks";
import { useDispatch } from "react-redux";
import { FaPaw } from "react-icons/fa";

export default function AddCatForm() {
  const dispatch = useDispatch();
  const [myLocation, setMyLocation] = useState(null); // { latitude: 1231, longitude: 123 }
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(postNewCat(name, image, description, myLocation));
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

  //console.log("my location", myLocation);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="container">
      <div className="Add-form">
        <div className="Add-form-header">
          <h1 className="Add-form-text">Post a new Cat</h1>
          <p className="Add-form-subtext">
            If you want to add a new cat and share it with another user, please
            fill the form
          </p>
        </div>
        <form onSubmit={onFormSubmit} className="Form-container">
          <div>
            <input
              type="text"
              value={name}
              placeholder="Cats Name*"
              onChange={(e) => setName(e.target.value)}
              className="Input-form"
            />
          </div>
          <div>
            <input
              type="text"
              value={description}
              placeholder="Please add small description here*"
              onChange={(e) => setDescription(e.target.value)}
              className="Input-form"
            />
          </div>
          <Cloudinary image={image} setImage={setImage} />
          <button type="submit" className="btn-wrapper">
            <h4 className="button">
              Post a New Cat <FaPaw />
            </h4>
          </button>
        </form>
      </div>
    </div>
  );
}

/*


*/
