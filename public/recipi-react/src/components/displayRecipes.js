import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "../recipis.scss"

export default function DisplayRecipes ({recipes, isLoggedIn, userData}) {

  const nav = useNavigate();
  
  const handleCreate = () =>{
    nav("create")
  }

  const userId = sessionStorage.getItem('username')

  const recipesFiltered = recipes.filter((recipi) => recipi.username === userId )

  console.log("displayed:",recipesFiltered)

  const loaded = () => {
    return (
      
      <div className="body-background">
        {recipesFiltered.map((recipe, index) => {
          return (
            <div className="recipe-container" key={recipe._id}>
              <img className="recipe-image" src={recipe.image} alt={recipe.dishName} />
              <h2 className="recipe-title">{recipe.dishName}</h2>
              <p className="recipe-cuisine-type">{recipe.cuisineType}</p>
              <Link className="recipe-link" to={`/recipes/show/${recipe._id}`}>View Recipe Details</Link>
              <Link className="edit-link" to={`/recipes/edit/${recipe._id}`}>Edit</Link>
            </div>
          );
        })}
      </div>
    );
  };

  const handleLogout = () => {
    nav("/logout")
  }

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return (
    <div className="top-container">
      <button className="logout-button"><a href='/logout'>Logout</a></button><br></br>
      <button className="create-recipe-button" onClick={handleCreate}>Create Recipe</button><br></br>
      <h2>Welcome {userData.firstName}! Here are your Recipes!</h2>
      {isLoggedIn}
      {isLoggedIn ? loaded() : loading()}
    </div>
  );
}



