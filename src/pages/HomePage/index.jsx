import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCat } from "../../store/cat/thunks";
import { selectCats } from "../../store/cat/selectors";
import { Link } from "react-router-dom";
import { CatMap } from "../../components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const cats = useSelector(selectCats);

  useEffect(() => {
    dispatch(fetchCat());
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <div>
      {!cats ? (
        <p>Loading</p>
      ) : (
        <>
          <Slider {...settings}>
            {cats.map((cat) => (
              <div className="card">
                <div className="card-top">
                  <img src={cat.picture} alt={cat.name} />
                  <h2>{cat.name}</h2>
                </div>
                <div className="card-bottom"></div>
              </div>
            ))}
          </Slider>
        </>
      )}
      <div>
        <CatMap />
      </div>
    </div>
  );
};
export { HomePage };
