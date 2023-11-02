const toggleFavorite = async (meal, setIsFavorited) => {
    setIsFavorited(prev => !prev);

    try {
        const response = await fetch('http://localhost:3000/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: meal.strMealThumb,
                name: meal.strMeal,
                instructions: meal.strInstructions,
                ingredients: [
                    meal.strIngredient1,
                    meal.strIngredient2,
                    meal.strIngredient3,
                    meal.strIngredient4
                ]
            })
        });

        if (response.status !== 201) {
            throw new Error('Failed to save favorite');
        }
    } catch (error) {
        console.log('Error while favoriting:', error);
        setIsFavorited(prev => !prev); // toggle back the favorite state if there's an error
    }
};

export default toggleFavorite;
