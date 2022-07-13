import React from "react";

export default function CatLogPage(props) {
  const { cats } = props;
  return (
    <div>
      {cats?.map((cat) => (
        <div>
          <h2>{cat.name}</h2>
          <img src={cat.picture} alt={cat.name} />
        </div>
      ))}
    </div>
  );
}
