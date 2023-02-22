import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';


function RecipeDetails({ recipes }) {
    console.log(recipes)
    const params = useParams()
    console.log(params)
    const navigate = useNavigate()

    const redirect = () => {
        navigate('/recipes')
    }

    
  return (
    <div>
      {recipes.map((recipe,id)=> {
        if(recipe._id === params.recipeid){
            return (
                <div className="form-style edit-recipe-container">
                  <h1 className="recipe-details__dishName">{recipe.dishName}</h1>
                  <img className="recipe-details__image" src={recipe.image} alt={recipe.dishName}/>
                  <div className='details-container'>
                    <h2 className="recipe-details__cuisineType">Cuisine Type: {recipe.cuisineType}</h2>
                    <h3>Ingredients</h3>
                    <p className="recipe-details__ingredients">{recipe.ingredients}</p>
                    <h3>Directions</h3>
                    <p className="recipe-details__directions">{recipe.directions} </p>
                    <h3>Notes</h3>
                    <p className="recipe-details__notes">Notes: {recipe.notes} </p>
                  </div>
                  <button className="recipe-details__redirect" onClick={redirect}>Back to Recipes</button>
                </div>
              );
              
        }
      })}
    </div>
  );
}

export default RecipeDetails;