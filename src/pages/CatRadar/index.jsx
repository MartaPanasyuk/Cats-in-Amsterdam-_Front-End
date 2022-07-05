import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { fetchCat } from "../../store/cat/thunks";
import { selectCats } from "../../store/cat/selectors";
import PlotRoute from "../../pages/PlotRoute";
import L from "leaflet";

const CatRadar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCat());
  }, [dispatch]);

  const cats = useSelector(selectCats);
  const markerIcon = new L.icon({
    iconUrl: require("../../images/catFace.png"),
    iconSize: [40, 40],
  });

  return (
    <>
      <div className="MapContainer">
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
          <PlotRoute
            points={cats.map((cat) => [cat.latitude, cat.longitude])}
          />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {cats.map((cat) => (
            // the marker is every pointer you see on the map
            <Marker
              key={cat.name}
              position={[cat.latitude, cat.longitude]}
              icon={markerIcon}
            >
              {/* when we click on the marker, we see the popup */}
              <Popup>
                <img
                  alt={cat.name}
                  style={{ width: "125px", borderRadius: "0.5em" }}
                  src={cat.picture}
                />
                <p>{cat.name}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
};
export { CatRadar };
