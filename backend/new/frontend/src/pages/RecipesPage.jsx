import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import image from "../assets/imgs/singup-login.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";
import ShareBtn from "../components/GetRecipe/ShareBtn";
//import { AuthContext } from "../contexts/AuthContext";
import RecipeForm from "../components/Recipes/RecipeForm";


const RecipesPage = () => {
  //const { user } = useContext(AuthContext)();
  const [showForm, setShowForm] = useState(false);
  const buttons = [
    { text: 'Filter by', className: 'bg-yellow-500 w-[180px] hover:bg-yellow-600', icon: '>' },
    { text: 'Cuisines', className: 'bg-yellow-500 w-[180px] hover:bg-yellow-600', icon: '>' },
    { text: 'Tips&Tricks', className: 'bg-amber-500 w-[180px] hover:bg-amber-600', icon: '>', url: '/cooking_tips' },
    { text: 'Get recipe', className: 'bg-lime-500 w-[180px] hover:bg-lime-600', icon: '>', url: '/get_recipe' },
    { text: 'Add recipe', className: 'bg-orange-400 w-[180px] hover:bg-orange-500', icon: '>',
      onClick: () => {
          setShowForm(true);
      },
    },
  ];

  return (
    <Layout>
    <div className="flex flex-col items-center w-[90%] mx-auto mt-2">
      <section className="relative flex flex-col px-20 pt-20 pb-2.5 w-full font-medium leading-none text-white min-h-[355px] bg-gradient-r from-gray-900">
        <img loading="lazy" src={image} alt="trending-recipe" className="object-cover absolute inset-0 rounded-xl size-full" />
        <h2 className="relative text-2xl  text-red-600">Trending now ...</h2>
        <h1 className="relative mt-2 text-4xl font-bold leading-[51px] w-[446px] max-md:max-w-full">
          Mike's famous salad <br /> with cheese
        </h1>
        <p className="relative mt-5 text-xl">By John Mike</p>
        <div>

        </div>
      </section>
      <div className="flex gap-10 justify-center mt-8 max-w-full text-base font-semibold leading-none text-white min-h-[65px]">
        {buttons.map((button, index) => (
        <NavLink to={button.url}>
         <button key={index} 
          onClick={button.onClick}
          className={`flex items-center gap-6 px-6 py-4 rounded-xl ${button.className} max-md:px-5`}>
            <span className="flex space-x-7 text-lg">
              <span>{button.text}</span>
              <span className="text-xl">{button.icon}</span>
            </span>
          </button>
          </NavLink>
        ))}
      </div>
      <div className="w-full bg-gray-100 mt-8">
        {showForm && <RecipeForm />}
        {/* Recipe Grid */}
        <section className="mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white p-2 rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:ring-1 hover:ring-gray-400">
                <img 
                  src={image} 
                  alt="Recipe"
                  className="w-full h-44 object-cover rounded-xl  " 
                />
                <div className="p-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-bold">Russian Salad</h3>
                    <p>⭐<span className="ml-2">4.5</span></p>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <p className="text-red-500 text-xl">40 min</p>
                    <div className="flex space-x-3">
                      <button className="text-red-500 text-xl hover:text-red-700 transition-transform duration-100 hover:scale-110">
                        <span role="img" aria-label="like"><FontAwesomeIcon icon={faHeart} /></span>
                      </button>
                      <ShareBtn
                          image={image}
                          title="Delicious Recipe: Russian Salad" 
                          text="Check out this delicious recipe for Russian Salad!" 
                          url="https://yourwebsite.com/recipe/russian-salad"
                          btn={<FontAwesomeIcon icon={faShareAlt} />}
                        />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Recipes */}
        <section className="mb-4">
          <h2 className="text-3xl text-gray-700 font-bold mb-4">Recommended Recipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white p-2 rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:ring-1 hover:ring-gray-400">
                <img 
                  src={image} 
                  alt="Recipe"
                  className="w-full h-44 object-cover rounded-xl" 
                />
                <div className="p-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-bold">Russian Salad</h3>
                    <p>⭐<span className="ml-2">4.5</span></p>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <p className="text-red-500 text-xl">40 min</p>
                    <div className="flex space-x-3">
                      <button className="text-red-500 text-xl hover:text-red-700 transition-transform duration-100 hover:scale-110">
                        <span role="img" aria-label="like"><FontAwesomeIcon icon={faHeart} /></span>
                      </button>
                      <ShareBtn
                          image={image}
                          title="Delicious Recipe: Russian Salad" 
                          text="Check out this delicious recipe for Russian Salad!" 
                          url="https://yourwebsite.com/recipe/russian-salad"
                        />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Load More Button */}
        <div className="flex justify-center mt-8">
          <button className="bg-green-500 hover:bg-green-700 w-[25%] text-white font-bold py-3 px-4 rounded-lg">
            Load More
          </button>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default RecipesPage;