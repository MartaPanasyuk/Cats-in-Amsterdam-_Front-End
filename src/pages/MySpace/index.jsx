import React from "react";
import "./style.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCats } from "../../store/cat/selectors";
import { fetchCat } from "../../store/cat/thunks";
import { getDistance } from "geolib";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import PlotRoute from "../PlotRoute";
import L from "leaflet";
import { IoIosHeart } from "react-icons/io";
import { BsEmojiHeartEyes } from "react-icons/bs";

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

  //console.log("myLocation", myLocation);

  const filteredCats = cats.filter((cat) => {
    if (myLocation) {
      const distance = getDistance(
        { latitude: cat.latitude, longitude: cat.longitude },
        { latitude: myLocation[0], longitude: myLocation[1] }
      );

      const near = distance < 3000;
      return near;
    }
  });
  //marker icon
  const meIcon = L.icon({
    iconUrl: require("../../images/navigation.png"),
    iconSize: [40, 40],
  });

  const catIcon = L.icon({
    iconUrl: require("../../images/pin.png"),
    iconSize: [40, 40],
  });

  return (
    <div>
      <div className="container">
        <div>
          <p className="lable">―MAP―</p>
          {myLocation ? (
            <div className="MapContainer">
              <div className="Map-header">
                <h2 className="section-header">Find you way here</h2>
              </div>
              <div className="map">
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
                  {filteredCats.map((cat) => (
                    <PlotRoute
                      points={[myLocation, [cat.latitude, cat.longitude]]}
                    />
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
                      <h3>You are Here!!!</h3>
                    </Popup>
                  </Marker>
                  {filteredCats.map((cat) => (
                    <Marker
                      key={cat.name}
                      position={[cat.latitude, cat.longitude]}
                      icon={catIcon}
                    >
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
            </div>
          ) : (
            <div>Loading</div>
          )}
        </div>
        <div className="Img-block">
          <h2 className="section-header">
            Hey look who's here <BsEmojiHeartEyes />
          </h2>
          <div className="Image-sector">
            {filteredCats.map((cat) => (
              <div className="Image-card-wrapper ">
                <img src={cat.picture} alt={cat.name} className="Image-card" />
                <Link to={`/cats/${cat.id}`} className="dex">
                  {" "}
                  <h4 className="Image-sector-text">
                    {cat.name} <IoIosHeart />
                  </h4>
                </Link>
              </div>
            ))}
          </div>
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
