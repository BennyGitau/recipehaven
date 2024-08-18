import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const GetRecipe = () => {
  const [ingredients, setIngredients] = useState("");
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false)
  const [inputError, setInputError] = useState("");


  const handleInputChange = (e) => {
    setIngredients(e.target.value);
    setInputError("");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ingredients.trim()) {
      setInputError("Please enter ingredients");
      return;
    }
    setIsLoading(true);
    setNoResults(false)
    try {
      const response = await axios.post(`https://recipehaven.onrender.com/api/get-recipe`, { ingredients: ingredients.split(',') });
      console.log('Response:', response.data);
      setSuggestedRecipes(response.data.recipes);
      setIsLoading(false);
      if (response.data.recipes.length === 0) {
        setNoResults(true)
      }
    } catch (error) {
      console.error('Error fetching recipe:', error);
      setIsLoading(false);
      setNoResults(true);
    }
  };
  const handlePrint = (recipe) => {
    const printContent = `
      <div>
        <h3>${recipe.title}</h3>
        <img src="${recipe.image}" alt="recipe" style="width:50%; height:auto;" />
        <h4>Ingredients:</h4>
        <ul>
          ${recipe.ingredients.map(ingredient => `<li>${ingredient.originalName} - ${ingredient.amount} ${ingredient.unit}</li>`).join('')}
        </ul>
        <h4>You might need:</h4>
        <ul>
          ${recipe.mightNeedIngredients.map(ingredient => `<li>${ingredient.originalName} - ${ingredient.amount} ${ingredient.unit}</li>`).join('')}
        </ul>
      </div>
    `;
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write('<html><head><title>Print Recipe</title></head><body>');
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Layout>
      <section className='w-full bg-slate-50'>
        <div className="mx-auto pt-4 min-h-screen bg-gray-100 max-w-4xl xl:max-w-[73rem]">          
          <h2 className="text-3xl p-2 font-semibold mb-1 text-orange-400">Didn't find a good recipe?😞 No worry</h2>
          <p className='mb-4 text-xl p-2 text-green-400'>Make one from the ingredients you have🥳</p>
          <div className="flex p-2 mb-4">
          <form onClick={handleSubmit} className="flex flex-row w-full">
            <input
              type="text"
              placeholder="Enter ingredients, separated by commas"
              value={ingredients}
              onChange={handleInputChange}
              className="p-2 w-full border bg-slate-50 border-gray-300 rounded-l-lg"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
            >
              Search
            </button>
            </form>
          </div>
          {inputError && <p className="text-red-500">{inputError}</p>}
          {isLoading ? (
            <p className='text-xl ml-4 font-bold rounded-sm text-blue-500 w-fit'><FontAwesomeIcon icon={faSpinner} className='animate-spin'/> Loading ...</p>
          ): noResults ? (
           <p>No results found</p> 
          ): (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedRecipes.map((recipe, index) => (
              <div key={index} className="bg-gray-100 text-gray-700 rounded-sm shadow overflow-hidden flex flex-col justify-between">
                <div className="p-4">
                  <img src={recipe.image} alt='recipe h-48 w-full object-cover' className='pb-2'/>
                  <h3 className="text-lg font-bold">{recipe.title}</h3>
                  <h2 className='mt-3 text-green-500 font-semibold text-xl'>Ingredients:</h2>
                  <ul className="list-item list-inside">
                    {recipe.ingredients.map((ingredient, i) => (
                      <li key={i} className="mt-1 mb-2">
                        <div className='flex space-x-2'>

                        <img src={ingredient.image} size={20} alt='ingredient' />
                        <p className='mt-2'>{ingredient.originalName} - {ingredient.amount} {ingredient.unit}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p className='mt-3 text-green-500 font-semibold text-xl'>You Might Need:</p>
                  <ul className="list-disc ">
                    {recipe.mightNeedIngredients.map((ingredient, i) => (
                      <li key={i} className="mt-1 ml-3">
                        <p className='mt-2'>{ingredient.originalName},</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg w-3/12 m-2 "
                    onClick={() => handlePrint(recipe)}
                  >
                    Print 
                </button>
              </div>
            ))} 
          </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default GetRecipe;