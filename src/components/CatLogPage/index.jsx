import React from "react";
import "./style.css";

export default function CatLogPage(props) {
  const { cats } = props;
  return (
    <div className="Page-wrapper Gridcontainer">
      {cats?.map((cat) => (
        <div className="image-box item">
          <h2>{cat.name}</h2>
          <img src={cat.picture} alt={cat.name} className="image" />
        </div>
      ))}
    </div>
  );
}
