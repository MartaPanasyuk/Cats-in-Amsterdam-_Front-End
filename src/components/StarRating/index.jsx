import React, { useState } from "react";
import { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/cat/thunks";
import "./style.css";

export default function StarRating(props) {
  const dispatch = useDispatch();
  const { category, catId } = props;
  const [startCurrentStat, setStarsCurrentState] = useState({});

  // dispatch(sendStarsInformation(category, catId))
  // is a get request to ask the server what is the current average of the cat in this category

  //useSelector("thisIstheResponseFromTheBackEnd On Line 13");
  const [star, setStar] = useState(null);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    // setStarsCurrentState("response");
  });
  //How to calculate an an average///////////////////////
  const fakeData = [
    {
      catId: 1,
      categoryId: 2,
      createdAt: "2022-07-08T12:19:13.855Z",
      id: 2,
      stars: 5,
      updatedAt: "2022-07-08T12:19:13.855Z",
    },
    {
      catId: 4,
      categoryId: 2,
      createdAt: "2022-07-08T13:44:47.557Z",
      id: 3,
      stars: 4,
      updatedAt: "2022-07-08T13:44:47.557Z",
    },
  ];
  const handleOnClick = (ratingValue) => {
    //Send a post request to the back end, with:
    //Cat Id, Category, and number of stars
    console.log(ratingValue, "this is value");
    // dispatch(fetchCatWithInfo(id));
  };
  // console.log(star, "this is star");
  const averageRating =
    fakeData.reduce((acc, rating) => {
      return acc + rating.stars;
    }, 0) / fakeData.length;

  //console.log(averageRating);
  /////////////////////////////////////////////

  const onRatingClick = (value) => {
    // dispatch a thunk to create rating.
  };

  return (
    <div>
      <div>
        <h2>Flufiness HardCode Data</h2>
      </div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={(value) => handleOnClick(value)}
            />
            <FaStar
              className="star"
              color={ratingValue <= (hover || star) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
      <p>The value is :{star}</p>
    </div>
  );
}

//
