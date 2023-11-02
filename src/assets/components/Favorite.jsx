import React, { useEffect, useState } from "react";
import '../styles/Favorite.scss';
import { fetchFavorite } from "./fetchFavorite";
import { deleteFavorite } from "./deleteFavorite"; // import the delete function

const Favorite = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetchFavorite()
      .then(data => {
        setMeals(data);
      })
      .catch(error => {
        // Handle the error here if necessary
      });
  }, []);

  const handleDelete = (id) => {
    deleteFavorite(id)
      .then(() => {
        setMeals(prevMeals => prevMeals.filter(meal => meal.id !== id));
      })
      .catch(error => {
        // Handle the error here if necessary
      });
  };

  return (
    <div className='konten-utama-favorite'>
      {meals.map(meal => (
        <div key={meal.id} className='meal-box'>
          <img src={meal.image} alt={meal.name} className='meal-image' />
          <p className='meal-name'>{meal.name}</p>
          <button className='meal-trash' onClick={() => handleDelete(meal.id)}>Delete</button> {/* Add the delete button here */}
        </div>
      ))}
      <div className='footer-favorite'>

      </div>
    </div>
  );
}

export default Favorite;
