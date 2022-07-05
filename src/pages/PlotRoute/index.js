import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// props = {
//  points: [[lat, lng], [lat, lng], ...]
// }

export default function PlotRoute(props) {
  const map = useMap();
  useEffect(() => {
    if (map) {
      //console.log(L.Routing);
      L.Routing.control({
        show: false,
        waypoints: props.points.map((p) => L.latLng(p[0], p[1])),
      }).addTo(map);
    }
  }, [map, props.points]);
  return null;
}
