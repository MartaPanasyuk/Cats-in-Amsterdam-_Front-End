import React from "react";
import "./style.css";
import { GiPawPrint } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function CatLogPage(props) {
  const { cats } = props;
  return (
    <div className="section-cover">
      <div className="Image-sector">
        {cats?.map((cat) => (
          <div className="Image-card-wrapper">
            <img src={cat.picture} alt={cat.name} className="Image-card" />
            <Link to={`/cats/${cat.id}`} className="dex">
              {" "}
              <h4 className="Image-card-text">
                {cat.name} <GiPawPrint />
              </h4>{" "}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
