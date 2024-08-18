import React, { useState, useEffect } from 'react';
import { userAuth } from '../../contexts/userContext';
import { BiTrash } from 'react-icons/bi';
import RecipeForm from '../Recipes/RecipeForm';
import clsx from "clsx";

const PersonalRecipes = () => {
  const { handleGetUserRecipes, handleDeleteRecipe, isUpdate, setIsUpdate } = userAuth();
  const [recipes, setRecipes] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [clickedRecipe, setClickedRecipe] = useState(null);

  useEffect(() => {
    const fetchUserRecipes = async () => {
      const fetchedRecipes = await handleGetUserRecipes();
      if (fetchedRecipes) {
      setRecipes(fetchedRecipes);
    };
    };
    fetchUserRecipes();
  }, []);

  const handleDelete = async (id) => {
    await handleDeleteRecipe(id);
    const newRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(newRecipes);
  }
  
  return (
    <div className="p-6 bg-slate-200 rounded-lg ">
      <div
          className={clsx(
            "fixed z-[90] my-auto inset-0 top-0 py-4 bg-slate-300/65 duration-300 ease-out",
            formOpen
              ? "-translate-y-0 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full"
              : "-translate-y-[100vh]"
          )}
        >
          <RecipeForm
            setFormOpen={setFormOpen}
            formOpen={formOpen}
            recipeID={clickedRecipe}
          />
      </div>
      <h2 className="text-2xl font-semibold mb-4">Personal Recipes</h2>
      <div className="gap-x-6  ">
        {[...recipes]?.reverse().map((recipe) => (
          <div key={recipe.id} className="flex flex-row mb-3 bg-gray-100 rounded shadow-lg overflow-hidden hover:ring-1 hover:ring-gray-400 transition-transform duration-300 hover:scale-105">
            <img
              src={recipe?.banner_image}
              alt={recipe.title}
              className="w-32 h-33 object-cover"
            />
            <div>
            <div className="p-4">
              <h3 className="text-lg font-bold">{recipe?.title}</h3>
              <p className="text-gray-600 mt-2">{recipe?.description}</p>
            </div>
            <div className="flex space-x-4 items-center mb-2">
               <button
                  onClick={() => {
                  setClickedRecipe(recipe.id);
                  setIsUpdate(!isUpdate);
                  setFormOpen(!formOpen);
                  }}
                  className="text-green-500  hover:text-green-600  mr-2 ml-2"
                  >
                    Edit
              </button>
              <button 
              onClick={() => handleDelete(recipe.id)}
              className="text-orange-500 hover:text-orange-600 mr-2 ml-2"><BiTrash className='text-xl'/>
              </button>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalRecipes;
