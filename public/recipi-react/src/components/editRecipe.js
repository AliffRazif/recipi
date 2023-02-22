import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"

export default function EditRecipe({recipes,editRecipe,deleteRecipe}) {
  
    const params = useParams()
    const id = params.recipeid;
    const navigate = useNavigate()

    const recipe = recipes.find((r) => r._id === id)

    const[newForm, setNewForm] = useState({
        dishName:recipe.dishName,
        image:recipe.image,
        cuisineType:recipe.cuisineType,
        ingredients: recipe.ingredients,
        directions: recipe.directions,
        notes: recipe.notes,
    }, {})


const handleChange = (event) => {
    const newFormValue = {...newForm, [event.target.name]: event.target.value}
    setNewForm(newFormValue)
    console.log(newForm)
}

const handleSubmit = (event) => {
    event.preventDefault()
    editRecipe(newForm, id)
    //console.log(newForm,id)

}

const remove = ()  => {
    deleteRecipe(recipe._id)
    navigate('/recipes')

}

const redirect = () => {
    navigate('/recipes')
}

return (
    <div className="form-style edit-recipe-container">
      <h1 className="edit-recipe-header">{recipe.dishName}</h1>
      <img className="edit-recipe-image" src={recipe.image} alt="noimage"/>
      <div className='details-container'>
        <h2 className="edit-recipe-cuisine-type">Cuisine Type: {recipe.cuisineType}</h2>
        <h3>Ingredients</h3>
        <p className="edit-recipe-ingredients">{recipe.ingredients}</p>
        <h3>Directions</h3>
        <p className="edit-recipe-directions">{recipe.directions}</p>
        <h3>Notes</h3>
        <p className="edit-recipe-notes">{recipe.notes}</p>
      </div>

      <form onSubmit={handleSubmit} className="edit-recipe-form">
        <input
          type="text"
          name="dishName"
          value={newForm.dishName}
          placeholder="Dish Name"
          onChange={handleChange}
          className="edit-recipe-form-input"
        />
        <input
          type="text"
          name="image"
          value={newForm.image}
          placeholder="Image"
          onChange={handleChange}
          className="edit-recipe-form-input"
        />
        <input
          type="text"
          name="cuisineType"
          value={newForm.cuisineType}
          placeholder="Cuisine Type"
          onChange={handleChange}
          className="edit-recipe-form-input"
        />
        <textarea
          type="text"
          name="ingredients"
          value={newForm.ingredients}
          placeholder="Ingredients"
          onChange={handleChange}
          className="edit-recipe-form-input-ingredients"
        />
        <textarea
          type="text"
          name="directions"
          value={newForm.directions}
          placeholder="Directions"
          onChange={handleChange}
          className="edit-recipe-form-input-directions"
        />
        <input
          type="text"
          name="notes"
          value={newForm.notes}
          placeholder="Notes"
          onChange={handleChange}
          className="edit-recipe-form-input"
        />
        <button type="submit" className="edit-recipe-form-button">Edit Recipe</button>
      </form>
      <button id="delete" onClick={remove} className="edit-recipe-delete-button">Delete Recipe</button>
      <button onClick={redirect} className="edit-recipe-back-button">Back to Recipes</button>
    </div>
  )

}
