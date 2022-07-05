import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCatWithInfo } from "../../store/cat/thunks";
import { selectCatDetails } from "../../store/cat/selectors";
import { selectToken } from "../../store/user/selectors";
import { updayteCatSeenTimes } from "../../store/cat/thunks";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import CommentForm from "../../components/CommentForm";
import StarRating from "../../components/StarRating";

export default function CatPageDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  const token = useSelector(selectToken);
  const catDetails = useSelector(selectCatDetails);

  const URL = `https://api.geoapify.com/v1/geocode/reverse`;

  const [address, setAddress] = useState("");

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

  useEffect(() => {
    dispatch(fetchCatWithInfo(id));
  }, [dispatch, id]);

  if (!catDetails)
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );

  return (
    <div>
      <div key={catDetails.id}>
        <h2>{catDetails.name}</h2>
        <img src={catDetails.picture} alt={catDetails.title} />
        {catDetails.images.map((c) => (
          <img src={c.url} alt={catDetails.title} />
        ))}
        <p>Seen Times:{catDetails.seenTime}</p>{" "}
        <button onClick={() => dispatch(updayteCatSeenTimes(catDetails.id))}>
          Hev You seen me?
        </button>
        <p>Rate the cat</p>
        <StarRating />
        {catDetails.comments.map((c) => (
          <p>{c.text}</p>
        ))}
        <p>Location</p>
        {token ? (
          <CommentForm />
        ) : (
          <p>You need to Login to leave the comment</p>
        )}
      </div>
      {address ? (
        <MapContainer
          style={{
            height: "40vw",
            width: "60vw",
            maxWidth: "800px",
            maxHeight: "500px",
          }}
          center={[52.36994, 4.906]}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker key={address.name} position={[address.lat, address.lon]}>
            <Popup>
              <p>{address.address_line1}</p>
              <p>{address.address_line2}</p>
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        ""
      )}
    </div>
  );
}
