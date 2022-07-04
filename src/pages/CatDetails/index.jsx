import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCat } from "../../store/cat/thunks";
import { selectCats } from "../../store/cat/selectors";

export default function CatDetails() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCat());
  }, [dispatch]);

  const cats = useSelector(selectCats);

  return (
    <div>
      <MapContainer
        style={{
          border: "2px solid",
          borderRadius: "10px",
          height: "50vw",
          width: "60vw",
          maxWidth: "1000px",
          maxHeight: "800px",
          margin: "0px 19.5%",
        }}
        center={[52.36994, 4.906]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cats.map((cat) => (
          // the marker is every pointer you see on the map
          <Marker key={cat.name} position={[cat.latitude, cat.longitude]}>
            {/* when we click on the marker, we see the popup */}
            <Popup>
              <img
                alt={cat.name}
                style={{ width: "100px", borderRadius: "0.5em" }}
                src={cat.picture}
              />
              <p>{cat.name}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      ;
    </div>
  );
}
