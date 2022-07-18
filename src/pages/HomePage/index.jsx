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
import { BsFillHeartFill } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";

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
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="HomePage_wrapper">
      <div className="container">
        <div className="CatMap-page-title">
          <h2 className="CatMap-text">Cat Map</h2>
          <p className="CatMap-subtext">
            Find the most amazing cats hangign around you
          </p>
        </div>
        <div className="map-wrapper">
          <CatMap />
        </div>

        {!cats ? (
          <p>Loading</p>
        ) : (
          <div className="image-slider">
            <Slider {...settings}>
              {cats.map((cat) => (
                <div className="flex">
                  <div className="flex__column">
                    <div className="speakers-slider__item">
                      <Link to={`/cats/${cat.id}`}>
                        <img
                          src={cat.picture}
                          className="card-img"
                          alt="cats"
                        />
                      </Link>
                      <div className="card-content">
                        <h3 className="card-title">{cat.name}</h3>
                      </div>
                      <strong className="heart">
                        {cat.like} <BsFillHeartFill />
                      </strong>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
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
};
export { HomePage };

/*


*/
