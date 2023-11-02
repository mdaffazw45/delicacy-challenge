import React, { useEffect, useRef, useState } from "react";
import { useParams , useNavigate } from "react-router-dom";
import { fetchMealsByCategory, fetchMealDetails } from "./APICall";
import "../styles/Page.scss";
import toggleFavorite from "./toggleFavorite"; // Import the function


// Outside your component
const limitWords = (text, limit) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
};

const Page = () => {
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);
  const kartuWrapperRef = useRef(null);
  const { category } = useParams();
  const [mealDetails, setMealDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [error, setError] = useState(null);

  const handleDetailClick = (mealName) => {
    navigate(`/detail/${mealName}`);

}

const handleFavoriteClick = (meal) => {
  toggleFavorite(meal, setIsFavorited, isFavorited);
};

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        const meals = await fetchMealsByCategory(category);
        const details = await Promise.all(
          meals.map((meal) => fetchMealDetails(meal.idMeal))
        );
        setMealDetails(details);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchMeals();
  }, [category]);

  useEffect(() => {
    if (mealDetails.length === 0) return;

    const firstCardWidth = kartuWrapperRef.current.firstChild.offsetWidth;
    const wrapperWidth = kartuWrapperRef.current.offsetWidth;
    const scrollPosition = firstCardWidth / 2 - wrapperWidth / 2;
    kartuWrapperRef.current.scrollLeft = scrollPosition;
  }, [mealDetails]);

  useEffect(() => {
    async function fetchDataFooter() {
      try {
        const fetchedMeals = await fetchMealsByCategory("beef");
        setMeals(fetchedMeals.slice(0, 5));
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    }

    fetchDataFooter();
  }, []);

  return (
    <div className="konten-utama-page">
      <div className="kartu-wrapper" ref={kartuWrapperRef}>
        {loading && <div>Loading...</div>}
        {error && <div>Error loading data.</div>}
        {mealDetails.map((meal, index) => (
          <div key={index} className="kartu-utama">
            <div className="tulisan-utama">
              <div className="meal-title">
                <h1>{meal.strMeal}</h1>
              </div>
              <div className="meal-instructions">
                <p>{limitWords(meal.strInstructions, 500)}</p>
              </div>

              <div className="ingredients">
                <div className="ingredients-kiri">
                  <img src='../image/olive-oil.png' alt="Olive Oil" />
                  <span>{meal.strIngredient1}</span>
                  <img src='../image/olive-oil.png' alt="Olive Oil" />
                  <span>{meal.strIngredient2}</span>
                </div>
                <div className="ingredients-kanan">
                  <img src='../image/olive-oil.png' alt="Olive Oil" />
                  <span>{meal.strIngredient3}</span>
                  <img src='../image/olive-oil.png' alt="Olive Oil" />
                  <span>{meal.strIngredient4}</span>
                </div>
              </div>
              <div class="tombol-bawah">
                <button class="detail-btn"  onClick={() => handleDetailClick(meal.strMeal)}>Detail</button>
                <button class="favorites-btn"  onClick={() => handleFavoriteClick(meal)} >Add Favorites</button>
              </div>
            </div>
            <img
              className="image-utama"
              src={meal.strMealThumb}
              alt={meal.strMeal}
            />
          </div>
        ))}
      </div>
      <div className="footer-page">
        <h2>More Recepies</h2>

        {meals.map((meal) => (
          <div className="makanan-bawah" key={meal.idMeal}>
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              width="100px"
              height="100px"
            />
            <p>{meal.strMeal}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
