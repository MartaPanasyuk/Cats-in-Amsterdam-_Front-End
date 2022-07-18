import React from "react";
import "./style.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { oneCategory } from "../../store/category/thunks";
import { selectCatBasedOnCategory } from "../../store/category/selectors";
import { selectCats } from "../../store/cat/selectors";
import { useState } from "react";
import { fetchCat } from "../../store/cat/thunks";
import CatLogPage from "../../components/CatLogPage";

export default function CataLog() {
  const dispatch = useDispatch();

  const allCats = useSelector(selectCats); //This gets a list of all cats available
  const cats = useSelector(selectCatBasedOnCategory); //This gets a list of cats based on the category

  useEffect(() => {
    dispatch(fetchCat());
  }, [dispatch]);

  // const [selectCategory, setSelectCategory] = useState({}); //This updates the number of the category
  const [selectAllCats, setSelectAllCats] = useState(allCats); //This has all the cats
  const [selectedCats, setSelectedCats] = useState([]); //This holds only the cats available based on the category
  const [displayAllCats, setDisplayAllCats] = useState(true);

  useEffect(() => {
    setSelectedCats(cats.cats);
  }, [cats]);

  useEffect(() => {
    setSelectAllCats(allCats);
  }, [allCats]);

  // useEffect(() => {
  //   setSelectCategory(cats);
  // }, [cats]);

  const handleCilck = (categotyId) => {
    dispatch(oneCategory(categotyId));
    setDisplayAllCats(false);
  };

  return (
    <div>
      <div className="container">
        <div className="Button-section">
          <button
            onClick={() => setDisplayAllCats(true)}
            className="Catalog-btn"
          >
            <h2 className="button-text">All</h2>
          </button>
          <button onClick={() => handleCilck(1)} className="Catalog-btn">
            <h2 className="button-text">Flufiness</h2>
          </button>
          <button onClick={() => handleCilck(2)} className="Catalog-btn">
            <h2 className="button-text">Purring</h2>
          </button>
          <button onClick={() => handleCilck(3)} className="Catalog-btn">
            <h2 className="button-text">Friendliness</h2>
          </button>
        </div>
        <div>
          {displayAllCats ? (
            <CatLogPage cats={selectAllCats} />
          ) : (
            <div>
              <CatLogPage cats={selectedCats} />
            </div>
          )}
        </div>
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
}
