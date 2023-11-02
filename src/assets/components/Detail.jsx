import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/Detail.scss';
import toggleFavorite from "./toggleFavorite"; // Import the function


const limitWords = (text, limit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
  };
  

function Detail() {
    const [meal, setMeal] = useState({
        strMeal: '',
        strInstructions: '',
        strMealThumb: '',
        strIngredient1: '',
        strIngredient2: '',
        strIngredient3: '',
        strIngredient4: ''
    });

    const { mealName } = useParams();
    const [isFavorited, setIsFavorited] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
                const fetchedMeal = response.data.meals[0];
                setMeal({
                    strMeal: fetchedMeal.strMeal,
                    strInstructions: fetchedMeal.strInstructions,
                    strMealThumb: fetchedMeal.strMealThumb,
                    strIngredient1: fetchedMeal.strIngredient1,
                    strIngredient2: fetchedMeal.strIngredient2,
                    strIngredient3: fetchedMeal.strIngredient3,
                    strIngredient4: fetchedMeal.strIngredient4
                });
            } catch (error) {
                console.error("Error fetching meal data:", error);
            }
        };

        console.log(meal , "Hasil MEAL Berhasil")
        fetchData();
    }, [mealName]);


    const handleFavoriteClick = (meal) => {
        toggleFavorite(meal, setIsFavorited, isFavorited);
      };
      

    return (
        <div className="kartu-utama-detail">
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
                <button class="favorites-btn" onClick={() => handleFavoriteClick(meal)}>Add Favorites</button>
              </div>
            </div>
            <img
              className="image-utama"
              src={meal.strMealThumb}
              alt={meal.strMeal}
            />
          </div>
    );
}

export default Detail;
