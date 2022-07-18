import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { fetchCat } from "../store/cat/thunks";
import { selectCats } from "../store/cat/selectors";
import L from "leaflet";

const CatMap = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCat());
  }, [dispatch]);

  const cats = useSelector(selectCats);
  const markerIcon = new L.icon({
    iconUrl: require("../images/catFace.png"),
    iconSize: [40, 40],
  });

  return (
    <>
      <MapContainer
        style={{
          height: "40vw",
          width: "60vw",
          maxWidth: "1000px",
          maxHeight: "600px",
          borderRadius: "15px",
          marginTop: "10px",
          marginBottom: "20px",
          border: "5px solid #ff5b2e",
        }}
        center={[52.3599976, 4.8852188]}
        zoom={15}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cats.map((cat) => (
          <Marker
            key={cat.name}
            position={[cat.latitude, cat.longitude]}
            icon={markerIcon}
          >
            <Popup>
              <Link to={`/cats/${cat.id}`}>
                <img
                  alt={cat.name}
                  style={{ width: "125px", borderRadius: "0.5em" }}
                  src={cat.picture}
                />{" "}
              </Link>
              <p style={{ marginTop: "5px", fontSize: "15px" }}>{cat.name}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};
export { CatMap };
