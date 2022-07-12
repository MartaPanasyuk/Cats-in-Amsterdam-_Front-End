import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCats } from "../../store/cat/selectors";
import { fetchCat } from "../../store/cat/thunks";
import { getDistance } from "geolib";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import PlotRoute from "../PlotRoute";
import L from "leaflet";

export default function MySpace() {
  const dispatch = useDispatch();
  const [myLocation, setMyLocation] = useState(null);

  useEffect(() => {
    dispatch(fetchCat());
  }, [dispatch]);

  const cats = useSelector(selectCats);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      console.log("geolocation available");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // console.log("my location", [ position.coords.latitude, position.coords.longitude,]);
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

  console.log("myLocation", myLocation);

  const filteredCats = cats.filter((cat) => {
    const distance = getDistance(
      { latitude: cat.latitude, longitude: cat.longitude },
      { latitude: myLocation[0], longitude: myLocation[1] }
    );
    //console.log("distance to cat", cat.id, distance);
    const near = distance < 3000;
    return near;
  });
  //console.log("near", filteredCats);

  //marker icon
  const meIcon = L.icon({
    iconUrl: require("../../images/person.png"),
    iconSize: [40, 40],
  });

  //const marker = L.marker([L.latLng], { icon: meIcon }).addTo(map);

  return (
    <div>
      {filteredCats.map((cat) => (
        <div>
          <img src={cat.picture} alt={cat.name} />
        </div>
      ))}
      {myLocation ? (
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
            {filteredCats.map((cat) => (
              <PlotRoute points={[myLocation, [cat.latitude, cat.longitude]]} />
            ))}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              key={myLocation}
              position={[myLocation[0], myLocation[1]]}
              icon={meIcon}
            >
              <Popup>
                <h3>It's Me!!!</h3>
              </Popup>
            </Marker>
            {filteredCats.map((cat) => (
              <Marker key={cat.name} position={[cat.latitude, cat.longitude]}>
                <Popup>
                  <Link to={`/cats/${cat.id}`}>
                    <img
                      alt={cat.name}
                      style={{ width: "125px", borderRadius: "0.5em" }}
                      src={cat.picture}
                    />{" "}
                  </Link>
                  <p>{cat.name}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      ) : (
        <div>dnkjfb</div>
      )}
    </div>
  );
}

/*

CataLog
*/
