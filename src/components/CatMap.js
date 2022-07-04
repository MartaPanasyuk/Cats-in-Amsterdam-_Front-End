import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { fetchCat } from "../store/cat/thunks";
import { selectCats } from "../store/cat/selectors";
import CatGallery from "../pages/CatGallery";
import L from "leaflet";

const CatMap = () => {
  const dispatch = useDispatch();
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    dispatch(fetchCat());
  }, [dispatch]);

  const cats = useSelector(selectCats);
  const markerIcon = new L.icon({
    iconUrl: require("../images/catFace.png"),
    iconSize: [40, 40],
  });

  // const routeLine = new L.Routing.control({
  //   waypoints: [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
  // });

  return (
    <>
      {showMap ? (
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
            <CatGallery
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
          <button onClick={() => setShowMap(false)}>Hide The Map</button>
        </div>
      ) : (
        <button onClick={() => setShowMap(true)}>Show The Map</button>
      )}
    </>
  );
};
export { CatMap };
