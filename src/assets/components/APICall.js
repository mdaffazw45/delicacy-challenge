import axios from 'axios';

export const fetchMealsByCategory = async (category) => {
  try {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    return response.data.meals || [];
  } catch (error) {
    throw new Error('Failed to fetch meals by category.');
  }
}

export const fetchMealDetails = async (idMeal) => {
  try {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    return response.data.meals[0];
  } catch (error) {
    throw new Error('Failed to fetch meal details.');
  }
}
