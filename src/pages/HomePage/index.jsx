import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCat } from "../../store/cat/thunks";
import { selectCats } from "../../store/cat/selectors";
import { Link } from "react-router-dom";
import { CatMap } from "../../components";

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
        cats.map((cat) => (
          <div key={cat.id}>
            <h2>{cat.name}</h2> <img src={cat.picture} alt={cat.name} />{" "}
            <Link to={`/cats/${cat.id}`}>
              <button>View details</button>
            </Link>
          </div>
        ))
      )}
      <div>
        <CatMap />
      </div>
    </div>
  );
};
export { HomePage };
