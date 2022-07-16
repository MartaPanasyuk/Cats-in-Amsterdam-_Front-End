import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { fetchCatWithInfo, rateCat } from "../../store/cat/thunks";
import "./style.css";

export default function StarRating(props) {
  const dispatch = useDispatch();
  const { categoryId, catId } = props;

  useEffect(() => {
    dispatch(fetchCatWithInfo(catId));
  }, [dispatch, catId]);

  const handleOnClick = (newValue) => {
    dispatch(rateCat(newValue, categoryId, catId));
  };

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });
  return (
    <div>
      <Typography component="legend">{props.category}</Typography>
      <StyledRating
        name="customized-color"
        defaultValue={1}
        getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
        precision={0.5}
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        onChange={(event, newValue) => {
          handleOnClick(newValue);
        }}
      />
    </div>
  );
}

/*
<div>
      <Typography component="legend">{props.category}</Typography>
      <Rating
        name="simple-controlled"
        value={star}
        onChange={(event, newValue) => {
          handleOnClick(newValue);
        }}
      />
    </div>

*/
