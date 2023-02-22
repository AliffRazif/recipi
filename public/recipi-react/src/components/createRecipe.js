import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function CreateRecipe ({createRecipe} ) {

    const userId = sessionStorage.getItem("username")

const[newForm, setNewForm] = useState({
        dishName: '',
        image:'',
        cuisineType: '',
        ingredients: '',
        directions: '',
        notes: '',
        username: userId,
    }) 


const handleChange = (event) => {
        const value = {...newForm,[event.target.name]: event.target.value}
        setNewForm(value)
        console.log(value)
    }
    

const handleSubmit = (event) => {
    event.preventDefault()
    createRecipe(newForm)
    setNewForm({
        dishName: '',
        image:'',
        cuisineType: '',
        ingredients: '',
        directions: '',
        notes: '',
        })
    
    }

const navigate = useNavigate()

const redirect = () => {
    navigate('/recipes')
}



    return (
        <section className="form-style create-recipe-container">
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                name="dishName"
                value={newForm.dishName}
                placeholder="Dish Name"
                onChange={handleChange}
                className="create-recipe-form-input"/>
                <input
                type="text"
                name="image"
                value={newForm.image}
                placeholder="Image"
                onChange={handleChange}
                className="create-recipe-form-input"/>
                <input
                type="text"
                name="cuisineType"
                value={newForm.cuisineType}
                placeholder="Cuisine Type"
                onChange={handleChange}
                className="create-recipe-form-input"/>
                <textarea
                type="text"
                name="ingredients"
                value={newForm.ingredients}
                placeholder="Ingredients"
                onChange={handleChange}
                className="create-recipe-form-input-ingredients"/>
                <textarea
                type="text"
                name="directions"
                value={newForm.directions}
                placeholder="Directions"
                onChange={handleChange}
                className="create-recipe-form-input-directions"/>
                <input
                type="text"
                name="notes"
                value={newForm.notes}
                placeholder="Notes"
                onChange={handleChange}
                className="create-recipe-form-input"/>
                <button type="submit" className="create-recipe-form-button">Create Recipe</button>
                <button className="edit-recipe-back-button" onClick={redirect}>Back to Recipes</button>
            </form>

        </section>
    )
   
}







