import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCat } from "../../store/cat/thunks";
import { selectCats } from "../../store/cat/selectors";
import { Link } from "react-router-dom";
import { CatMap } from "../../components";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCat());
  }, [dispatch]);

  const cats = useSelector(selectCats);

  return (
    <div className="home">
      {!cats ? (
        <p>Loading</p>
      ) : (
        <ImageList xs={{ width: 100, height: 450 }}>
          <ImageListItem key="Subheader" cols={12}></ImageListItem>
          {cats.map((cat) => (
            <ImageListItem key={cat.id}>
              <img
                src={`${cat.picture}?w=248&fit=crop&auto=format`}
                srcSet={`${cat.picture}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={cat.name}
                loading="lazy"
              />
              <ImageListItemBar
                title={cat.name}
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about fnvsnb`}
                  >
                    <Link to={`/cats/${cat.id}`}>
                      <InfoIcon sx={{ color: "rgba(255, 255, 255, 0.54)" }} />
                    </Link>
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
      <div>
        <CatMap />
      </div>
    </div>
  );
};
export { HomePage };
