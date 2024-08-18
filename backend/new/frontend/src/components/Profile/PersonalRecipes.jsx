import React from 'react';

const PersonalRecipes = () => {
  const recipes = [
    {
      title: "Spaghetti Carbonara",
      description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Chicken Tikka Masala",
      description: "A popular Indian curry dish made with roasted marinated chicken in a spiced curry sauce.",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Beef Stroganoff",
      description: "A Russian dish of sautéed pieces of beef served in a sauce with smetana (sour cream).",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Beef Stroganoff",
      description: "A Russian dish of sautéed pieces of beef served in a sauce with smetana (sour cream).",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="p-6 bg-slate-200 rounded-lg ">
      <h2 className="text-2xl font-semibold mb-4">Personal Recipes</h2>
      <div className="gap-x-6  ">
        {recipes.map((recipe, index) => (
          <div key={index} className="flex flex-row mb-3 bg-gray-100 rounded shadow-lg overflow-hidden hover:ring-1 hover:ring-gray-400 transition-transform duration-300 hover:scale-105">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-32 h-33 object-cover"
            />
            <div>
            <div className="p-4">
              <h3 className="text-lg font-bold">{recipe.title}</h3>
              <p className="text-gray-600 mt-2">{recipe.description}</p>
            </div>
            <div className="flex items-end mb-2">
              <button className="text-green-500  hover:text-green-600  mr-2 ml-2">Edit</button>
              <button className="text-orange-500 hover:text-orange-600 mr-2 ml-2">Delete</button>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalRecipes;
