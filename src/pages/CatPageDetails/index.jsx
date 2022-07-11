import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCatWithInfo } from "../../store/cat/thunks";
import { selectCatDetails } from "../../store/cat/selectors";
import { selectToken } from "../../store/user/selectors";
import { updayteCatLike } from "../../store/cat/thunks";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import PlotRoute from "../PlotRoute";
import CommentForm from "../../components/CommentForm";
import StarRating from "../../components/StarRating";
import AddImgLocation from "../../components/AddImgLocation";
import { BsFillHeartFill } from "react-icons/bs";
import { LatLng, latLng, Point } from "leaflet";
import { FaPaw } from "react-icons/fa";

export default function CatPageDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  const token = useSelector(selectToken);
  const catDetails = useSelector(selectCatDetails);

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
    if (catDetails) {
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

  return (
    <div>
      <div key={catDetails.id}>
        <h2>{catDetails.name}</h2>
        <img src={catDetails.picture} alt={catDetails.title} />
        {catDetails.images.map((c) => (
          <img src={c.url} alt={catDetails.title} />
        ))}
        <p>
          <BsFillHeartFill />
          {catDetails.like}
        </p>{" "}
        <button onClick={() => dispatch(updayteCatLike(catDetails.id))}>
          Like
        </button>
        <h3>Rate the cat</h3>
        <StarRating category="fluffy" catId="2" />
        <StarRating category="wekrf" catId="2" />
        <StarRating category="flulkdjgfjkffy" catId="2" />
        <div>
          {token ? (
            <AddImgLocation />
          ) : (
            <h3>
              Have you seen Me? <FaPaw />
              You need to Login to post my picture
            </h3>
          )}
        </div>
        <div>
          {catDetails.comments.map((comment) => (
            <div>
              <p>{comment.user.name}</p>
              <p>{comment.text}</p>
            </div>
          ))}
          {token ? (
            <CommentForm />
          ) : (
            <h3>You need to Login to leave the comment</h3>
          )}
        </div>
      </div>
      <div>
        {address ? (
          <MapContainer
            style={{
              height: "40vw",
              width: "60vw",
              maxWidth: "800px",
              maxHeight: "500px",
            }}
            center={[52.36994, 4.906]}
            zoom={25}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <PlotRoute
              points={[myLocation, [catDetails.latitude, catDetails.longitude]]}
            />
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
    </div>
  );
}
