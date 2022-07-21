import axios from "axios";
import React from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCatWithInfo, updayteCatLike } from "../../store/cat/thunks";
import { fetchCommentWithUser } from "../../store/category/thunks";
import { selectCatDetails } from "../../store/cat/selectors";
import { selectToken } from "../../store/user/selectors";
import { selectCommentBasedOnCat } from "../../store/category/selectors";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import PlotRoute from "../PlotRoute";
import CommentForm from "../../components/CommentForm";
import StarRating from "../../components/StarRating";
import AddImgLocation from "../../components/AddImgLocation";
import { BsFillHeartFill } from "react-icons/bs";
import { LatLng, latLng, Point } from "leaflet";
import { FaPaw, FaRegComment } from "react-icons/fa";
import { AiOutlineLogin } from "react-icons/ai";
import L from "leaflet";

export default function CatPageDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  const token = useSelector(selectToken);
  const catDetails = useSelector(selectCatDetails);
  const catComments = useSelector(selectCommentBasedOnCat);
  console.log("comments", catComments);

  const URL = `https://api.geoapify.com/v1/geocode/reverse`;

  const [address, setAddress] = useState("");
  const [myLocation, setMyLocation] = useState(null); // [lat lon]
  //console.log("mylocationMarta", myLocation);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const response = await axios.get(
          `${URL}?lat=${catDetails.latitude}&lon=${catDetails.longitude}&format=json&apiKey=c135377ae060499194a83dff3c1b31e3`
        );
        setAddress(response.data.results[0]);
        //console.log("smth", address);
      } catch (error) {
        console.log("ERROR", error);
      }
    };
    if (catDetails && !address) {
      getLocation();
    }
    //console.log(address);
  }, [catDetails, URL]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      console.log("geolocation available");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("my location", [
            position.coords.latitude,
            position.coords.longitude,
          ]);
          setMyLocation([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          console.log("Unable to retrieve your location");
        }
      );
    } else {
      console.log("geolocation not available");
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    dispatch(fetchCatWithInfo(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchCommentWithUser(id));
  }, [dispatch, id]);

  if (!catDetails)
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );

  const calculateSpread = (lat, long, points) => {
    const ll = new LatLng(lat, long);
    const distances = points.map((point) =>
      ll.distanceTo(new LatLng(point[0], point[1]))
    ); // Calculate all the distances to all the points
    return Math.max(...distances);
  };

  //Map Markers
  const meIcon = L.icon({
    iconUrl: require("../../images/navigation.png"),
    iconSize: [40, 40],
  });

  const catIcon = L.icon({
    iconUrl: require("../../images/pin.png"),
    iconSize: [40, 40],
  });

  console.log("MY LOCATION", myLocation);

  return (
    <div className="Details-page">
      <div className="container">
        <div key={catDetails.id} className="card-wrapper">
          <div className="card-header">
            <h2 className="page-title">{catDetails.name}</h2>
            <p className="hearts">
              <BsFillHeartFill />
              {catDetails.like}
            </p>{" "}
          </div>
          <div className="Image-sector">
            <img
              src={catDetails.picture}
              alt={catDetails.title}
              className="Image-card"
            />
            {catDetails.images.map((c) => (
              <img
                src={c.url}
                alt={c.title}
                key={c.id}
                className="Image-card"
              />
            ))}
          </div>
          <div className="btn-container">
            <button
              onClick={() => dispatch(updayteCatLike(catDetails.id))}
              className="btn"
            >
              <h2 className="btn-text">Like</h2>
            </button>
          </div>
          <p className="lable">―MAP―</p>
          <div className="Map-box">
            {address ? (
              <MapContainer
                style={{
                  height: "40vw",
                  width: "60vw",
                  maxWidth: "1000px",
                  maxHeight: "600px",
                  borderRadius: "15px",
                  marginTop: "10px",
                  marginBottom: "20px",
                  border: "8px solid #ff5b2e",
                }}
                center={[52.36994, 4.906]}
                zoom={25}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {myLocation && (
                  <>
                    <PlotRoute
                      points={[
                        myLocation,
                        [catDetails.latitude, catDetails.longitude],
                      ]}
                    />
                    <Marker
                      key={myLocation}
                      position={[myLocation[0], myLocation[1]]}
                      icon={meIcon}
                    >
                      <Popup>
                        <h3>You are here!</h3>
                      </Popup>
                    </Marker>
                  </>
                )}
                <Marker
                  key={catDetails.name}
                  position={[catDetails.latitude, catDetails.longitude]}
                  icon={catIcon}
                >
                  <Popup>
                    <img
                      alt={catDetails.name}
                      style={{ width: "125px", borderRadius: "0.5em" }}
                      src={catDetails.picture}
                    />
                    <p>{catDetails.name}</p>
                  </Popup>
                </Marker>
                <Circle
                  center={[catDetails.latitude, catDetails.longitude]}
                  radius={calculateSpread(
                    catDetails.latitude,
                    catDetails.longitude,
                    catDetails.images.map((image) => [
                      image.latitude,
                      image.longitude,
                    ])
                  )}
                />
                {/* For debugging, uncomment this */}
                {/* {catDetails.images.map((image) => (
              <Marker
                opacity={0.5}
                position={[image.latitude, image.longitude]}
              />
            ))} */}
              </MapContainer>
            ) : (
              ""
            )}
          </div>
          <div className="Box">
            <div className="Rating-wrapper">
              <h3 className="Rating-header">Rate This Cat</h3>
              <StarRating
                category={"Ffluffiness"}
                categoryId={1}
                catId={catDetails.id}
              />
              <StarRating
                category={"Purring"}
                categoryId={2}
                catId={catDetails.id}
              />
              <StarRating
                category={"Friendliness"}
                categoryId={3}
                catId={catDetails.id}
              />
            </div>
            <div className="Form-wrapper">
              {token ? (
                <AddImgLocation />
              ) : (
                <div className="box-text">
                  <h3 className="title">
                    Have you seen Me? <FaPaw />
                  </h3>
                  <p className="subtitle">
                    I don't mind you uploading my photo right here. <br /> But
                    firstly, please log in.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="Comment-wrapper">
          <h2 className="Comment-header">
            Comments <FaRegComment />
          </h2>
          {catComments.map((comment) => (
            <div key={comment.id}>
              <h3 className="CommentUser-name">{comment.user.name}</h3>
              <p className="CommentUser-text">{comment.text}</p>
            </div>
          ))}
          {token ? (
            <CommentForm />
          ) : (
            <h3 className="Comment-message">
              You need to Login to leave the comment <AiOutlineLogin />
            </h3>
          )}
        </div>
      </div>
      <div className="Footer">
        <h2 className="Footer-header">
          Made with ❤️ by{" "}
          <a href="https://github.com/MartaPanasyuk" className="Footer-link">
            Marta
          </a>
        </h2>
      </div>
    </div>
  );
}
