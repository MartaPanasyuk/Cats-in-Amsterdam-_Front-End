import "./style.css";
import { useState } from "react";

export default function Cloudinary(props) {
  const [image, setImage] = useState();

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "wnejvtpl");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dxtogimf2/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    console.log("file", file);
    setImage(file.url);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <input type="file" onChange={uploadImage} />
      <div>
        <img
          className="Image"
          src={
            image
              ? image
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png  "
          }
          alt="folder"
        />
        {image ? (
          <p className="Title" style={{ fontSize: 20 }}>
            Succesfully uploaded!
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
