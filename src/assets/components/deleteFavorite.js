import axios from "axios";

export const deleteFavorite = (id) => {
  return axios.delete(`http://localhost:3000/favorites/${id}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error("There was an error deleting the favorite", error);
      throw error; // This will allow you to handle the error in the component where you use deleteFavorite
    });
};
