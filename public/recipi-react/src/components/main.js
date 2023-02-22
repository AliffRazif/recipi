import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DisplayRecipes from "./displayRecipes";
import EditRecipe from "./editRecipe";
import Login from "./login";
import Logout from "./logout";
import SignUp from "./signup";
import RecipeDetails from "./recipeDetails";
import CreateRecipe from "./createRecipe";

export default function Main () {
    const [recipes, setRecipes] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState("");
    const nav = useNavigate()

    const URL = 'http://localhost:3003';

   
        const checkLoggedIn =  () => {
            // try {
            //     const response = await fetch(`${URL}/sessions`, {
            //         method: 'GET',
            //         credentials: 'include', // Send cookies along with the request
            //     });
            //     const data = await response.json();
            //     setIsLoggedIn(data.loggedIn);
            //     console.log(data)
            // } catch (error) {
            //     console.error(error);
            // }

               const serializedState = sessionStorage.getItem('token');
               if(serializedState === "Successfully logged in") {
                    setIsLoggedIn(true);

               }else{
                    setIsLoggedIn(false)
                    nav("/login")
               }
        };

    

    const getRecipes = async () => {
        const response = await fetch(`${URL}/recipes`);
        const data = await response.json();
        setRecipes(data);
    };

    const createRecipe = async (recipe) => {
        const response = await fetch(`${URL}/recipes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipe),
        });
        getRecipes();
    };

    const editRecipe = async (editedData, recipeid) => {
        await fetch(`${URL}/recipes/${recipeid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedData),
        });
        getRecipes();
    };

    const removeRecipe = async (removeId) => {
        await fetch(`${URL}/recipes/${removeId}`, {
            method: 'DELETE',
        });
        getRecipes();
    };

    useEffect(() => {
        checkLoggedIn();
        getRecipes();
    }, []);


    return (
        <div>
            <Routes>
                <Route path='/recipes' element={recipes ? <DisplayRecipes userData={userData} recipes={recipes} isLoggedIn={isLoggedIn} /> : <h1>Please Login</h1>} />
                <Route path='/recipes/edit/:recipeid' element={
                     recipes ?
                        <EditRecipe recipes={recipes} editRecipe={editRecipe} getRecipes={getRecipes} deleteRecipe={removeRecipe} isLoggedIn={isLoggedIn} />
                        :
                        <h1>Loading...</h1>
                } />
                <Route path='/recipes/show/:recipeid' element ={ recipes ? <RecipeDetails recipes={recipes} getRecipes={getRecipes} isLoggedIn={isLoggedIn}/> 
                        :
                        <h1>Loading...</h1>
                 }/>
                
                <Route path='/recipes/create' element ={<CreateRecipe userData={userData} createRecipe={createRecipe}/>}/>
                <Route path='/login' element={<Login setUserData={setUserData} setIsLoggedIn={setIsLoggedIn} />} />
                <Route path='/logout' element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
                <Route path='/signup' element={<SignUp  setIsLoggedIn={setIsLoggedIn}/>} />
            </Routes>
        </div>
    );
}
