import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Link, useNavigate } from "react-router-dom";
import ShareBtn from "../components/GetRecipe/ShareBtn";
import RecipeForm from "../components/Recipes/RecipeForm";
import { userAuth } from "../contexts/userContext";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { toast } from "react-toastify";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import {
  BiArrowToLeft,
  BiArrowToRight,
  BiChevronRight,
  BiTrash,
} from "react-icons/bi";
import clsx from "clsx";


const RecipesPage = () => {
    const {
    recipes,
    isLoggedIn,
    _user,
    user,
    handleDeleteRecipe,
    handleAddToBookmarks,
    handleRemoveFromBookMark,
    handleGetUserBookMarks,
    isUpdate,
    setIsUpdate,
  } = userAuth();
  const [formOpen, setFormOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userBookmarks, setUserBookmarks] = useState([]);
  const [visibleFilteredRecipes, setVisibleFilteredRecipes] = useState(12); 

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const bookmarks = await handleGetUserBookMarks();
        setUserBookmarks(bookmarks || []);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, []);

  const handleBookmarkToggle = async (recipeId) => {
    try {
      const isBookmarked = Array.isArray(userBookmarks) && userBookmarks.some(
        (bookmark) => bookmark?.id === recipeId
      );
      if (isBookmarked) {
        await handleRemoveFromBookMark(recipeId);
      } else {
        await handleAddToBookmarks(recipeId);
      }
      const updatedBookmarks = await handleGetUserBookMarks();
      setUserBookmarks(updatedBookmarks || []);
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  const toggleFilterDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [filters, setFilters] = useState({
    diet: [],
    cuisine: [],
    rating: "",
    serving: "",
  });
  const [clickedRecipe, setClickedRecipe] = useState(null);
 
  const toggleFilters = () => {
    setShowFilters(!showFilters);
    if(showFilters) {
      setFilters({
        diet: [],
        cuisine: [],
        rating: "",
        serving: "",
      });
    }
  };

  const slides = recipes
  .slice()
  .sort((a, b) => b.rating - a.rating) 
  .slice(0, 5);

   const handleLoadMore = () => {
    setVisibleFilteredRecipes((prevVisible) => prevVisible + 8); 
  };

  const handleRecipeSelectionChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => {
      if (type === "checkbox") {
        if (checked) {
          return { ...prevFilters, [name]: [...prevFilters[name], value] };
        } else {
          return {
            ...prevFilters,
            [name]: prevFilters[name].filter((item) => item !== value),
          };
        }
      } else if (type === "radio") {
        return { ...prevFilters, [name]: value };
      } else {
        return prevFilters;
      }
    });
  };

  //sorting recipes depending on their creation date
  const sortedRecipes = recipes
  .slice()
  .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); 

  const recommendrecipes = recipes.sort((a, b) => b.rating - a.rating);
  const recommendedRecipes = recommendrecipes.slice(0, 9);
  const applyFilters = () => {
  return sortedRecipes.filter((recipe) => {
    const matchesDiet = filters.diet.length
      ? filters.diet.includes(recipe.diet) || filters.diet.includes('')
      : true;
    const matchesCuisine = filters.cuisine.length
      ? filters.cuisine.includes(recipe.cuisine) || filters.cuisine.includes('')
      : true;
    const matchesRating = filters.rating
      ? parseInt(recipe.rating) === parseInt(filters.rating) || filters.rating === ''
      : true;
    const matchesServing = filters.serving
      ? parseInt(recipe.servings) === parseInt(filters.serving) || filters.serving === ''
      : true;

    return matchesDiet && matchesCuisine && matchesRating && matchesServing;
  });
  };

  const filteredRecipes = applyFilters();
  
  const initialDisplayedRecipes = filteredRecipes.slice(0, visibleFilteredRecipes);

  const goToSlide = (index) => {
    if (index < 0) {
      setCurrentSlide(slides.length - 1);
    } else if (index >= slides.length) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(index);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentSlide, goToSlide]);

  const navigate = useNavigate();
    const handleAddRecipe = (e) => {
    if (!_user) {
      e.preventDefault();
      toast.warn("You need to sign in to add a recipe!", {
        position: "top-center",
        autoClose: 3000,
      });
      setTimeout(() => navigate("/auth/login"), 3000);
    }
    setFormOpen(!formOpen) 
  };

  const filterbyRatings = [
    { name: "All Ratings", value: "" },
    { name: "1 Star", value: "1" },
    { name: "2 Stars", value: "2" },
    { name: "3 Stars", value: "3" },
    { name: "4 Stars", value: "4" },
    { name: "5 Stars", value: "5" },
  ];

  const filterbyServings = [
    { name: "1 Serving", value: "1" },
    { name: "2 Servings", value: "2" },
    { name: "3 Servings", value: "3" },
    { name: "4 Servings", value: "4" },
    { name: "5 Servings", value: "5" },
    { name: "Above 6", value: "" },
  ];
  const filterbyCuisines = [
    { name: "All", value: "" },
    { name: "American", value: "American" },
    { name: "Chinese", value: "Chinese" },
    { name: "Indian", value: "Indian" },
    { name: "Italian", value: "Italian" },
    { name: "Japanese", value: "Japanese" },
    { name: "Mexican", value: "Mexican" },
    { name: "Thai", value: "Thai" },
    { name: "French", value: "French" },
  ];
  const filterbyDiets = [
    { name: "All", value: "" },
    { name: "Vegan", value: "Vegan" },
    { name: "Vegetarian", value: "Vegetarian" },
    { name: "Gluten-free", value: "Gluten-free" },
    { name: "Paleo", value: "Paleo" },
    { name: "Keto", value: "Keto" },
  ];


  return (
    <Layout>
    <section className="w-full bg-gray-100">
    <div className="flex flex-col items-center  mx-auto mt-2">
         <div
            className={clsx(
              "fixed z-[90] my-auto inset-0 top-0 py-4 bg-slate-300/65  duration-300 ease-out",
              isLoggedIn && formOpen
                ? "-translate-y-0 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full"
                : "-translate-y-[100vh]"
            )}
          >
            {isLoggedIn && (
              <RecipeForm
                setFormOpen={setFormOpen}
                formOpen={formOpen}
                recipeID={clickedRecipe}
              />
            )}
        </div>
      <section className="relative flex flex-col pt-5 pb-2.5 w-full xl:max-w-[86rem] font-medium leading-none text-white min-h-[400px] bg-gradient-r from-gray-900">
        <div className="slider w-full h-96 bg-yellow-100 rounded-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr via-cyan-600/20 from-black/40 to-slate-950/20 z-10"></div>
          <div className="slider-container rounded-xl w-full h-full relative overflow-hidden">
            <h1 className="absolute text-4xl font-bold text-orange-600 z-20 m-10 w-fit uppercase">Now Trending...</h1>
            {slides.map((item, i) => (
              <div
                key={i}
                className={clsx(
                  "slide w-full h-full absolute inset-0 rounded-xl transition-transform duration-500 ease-out",
                  {
                    "transform scale-100 opacity-100 translate-x-0": currentSlide === i,
                  },
                  { "scale-80 opacity-70": currentSlide !== i },
                  { "transform -translate-x-full": currentSlide > i },
                  { "transform translate-x-full": currentSlide < i }
                )}
              >
                <figure className="h-full w-full relative">
                  <img
                    src={item.banner_image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 top-20 flex flex-col justify-between py-8 space-y-4 px-10 z-20 text-white">
                    <div className="flex flex-col space-y-4">
                      <h1 className="text-5xl font-bold uppercase">{item?.title}</h1>
                      <span className="h-[2px] my-2 w-32 rounded-full bg-slate-50 flex" />
                      <p className="uppercase text-xl font-bold">{item?.cuisine}</p>
                      <p className="text-xl text-orange-400">
                         <span className="inline-flex font-bold items-start justify-center">
                          {[...Array(5)].map((_, index) => (
                              <span key={index}>
                                {index < item?.rating ? (
                               <AiFillStar className="" /> 
                                ) : (
                               <AiOutlineStar className="" /> 
                                )}
                              </span>
                                ))}
                        </span>
                      </p>
                    </div>
                  </div>
                </figure>
              </div>
            ))}
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between w-3/4 mx-auto px-4 z-30">
              <button
                onClick={() => goToSlide(currentSlide - 1)}
                className="p-4 border border-white rounded-full cursor-pointer  text-white"
              >
                <BiArrowToLeft className="text-4xl" />
              </button>
              <button
                onClick={() => goToSlide(currentSlide + 1)}
                className="p-4 border border-white rounded-full cursor-pointer  text-white"
              >
                <BiArrowToRight className="text-4xl" />
              </button>
            </div>
            <div className="controller flex items-center justify-center space-x-4 absolute inset-x-4 bottom-2 h-12 rounded-xl z-20">
              {slides.map((_, i) => (
                <span
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={clsx(
                    "h-3 w-3 rounded-full border-black border-2 inline-flex cursor-pointer",
                    { "bg-black": currentSlide === i }
                  )}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="flex gap-10 justify-center mt-8 mb-6 max-w-full text-base font-semibold leading-none text-white min-h-[65px]">
        <button 
        onClick={()=> {
          toggleFilters();
          toggleFilterDropdown();
        }}
        className="bg-yellow-500 w-fit hover:bg-yellow-600 flex items-center h-fit py-3 gap-5 px-4 rounded-xl  ">
            <span className="flex space-x-5 items-center text-lg">
              <span>Filter Recipes</span>
                  <BiChevronRight
                    className={`text-3xl transform transition-transform duration-300 ${
                    isOpen ? "rotate-90" : "rotate-0"
                   }`} />
            </span>
        </button>
        <NavLink to="/cooking_tips">
          <button className='bg-amber-500  hover:bg-amber-600 flex items-center h-fit gap-5 px-5 py-3 rounded-xl '>
            <span className="flex space-x-5 items-center text-lg">
              <span>Tips & Tricks</span>
              <BiChevronRight className="text-3xl"/>
            </span>
          </button>
        </NavLink>
        <NavLink to="/get_recipe">
          <button className='bg-lime-500  hover:bg-lime-600 flex items-center h-fit gap-5 px-5 py-3 rounded-xl'>
            <span className="flex space-x-3 items-center text-lg">
              <span>Get A Recipe</span>
              <BiChevronRight className="text-3xl"/>
            </span>
          </button>
        </NavLink>      
        <button 
          id="add_recipe"
          onClick={handleAddRecipe}
          className={clsx("flex items-center gap-4 h-fit py-3 rounded-xl px-5 ", !isLoggedIn ? "bg-gray-500" : "cursor-pointer bg-orange-400  hover:bg-orange-500 ")}>
          <span className="flex space-x-3 items-center text-lg">
              <span>Add Recipe</span>
              <BiChevronRight className="text-3xl" />
            </span>
        </button>
      </div>
      <div className="container flex">
      {/* filters */}
      <div
        className={` left-0 h-[calc(100vh-6.5rem)] w-1/4 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full flex flex-col space-y-4 transform transition-transform duration-500 ${
          showFilters ? 'block mr-5 translate-x-0' : 'hidden -translate-x-full'
        }`}
      >
         <form
              onChange={handleRecipeSelectionChange}
              className={`rounded-xl bg-slate-50 pb-4 px-4 font-semibold [&_label]:text-sm [&_ul]:border-b [&_ul]:pb-2 [&_ul]:border-slate-400`}
            >
              <h3 className="font-bold text-lg mb-4 sticky top-0 py-2 w-full h-fit bg-inherit z-10">
                Filter Recipes
              </h3>
              {/* Diet */}
              <div className="mb-2">
                <h4 className="font-semibold mb-2">Diet</h4>
                <ul>
                  {filterbyDiets.map((diet, i) => (
                    <li key={i}>
                      <label>
                        <input
                          type="checkbox"
                          name="diet"
                          value={diet.value}
                        />{" "}
                        {diet.name}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Cuisines */}
              <div className="mb-2">
                <h4 className="font-semibold mb-2">Cuisines</h4>
                <ul>
                  {filterbyCuisines.map((cuisine, i) => (
                    <li key={i}>
                      <label>
                        <input
                          type="checkbox"
                          name="cuisine"
                          value={cuisine.value}
                        />{" "}
                        {cuisine.name}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Ratings */}
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Ratings</h4>
                <ul>
                  {filterbyRatings.map((rating, i) => (
                    <li key={i}>
                      <label>
                        <input
                          type="radio"
                          name="rating"
                          value={rating.value}
                        />{" "}
                        {rating.name}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Servings */}
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Servings</h4>
                <ul>
                  {filterbyServings.map((servings, i) => (
                    <li key={i}>
                      <label>
                        <input
                          type="radio"
                          name="serving"
                          value={servings.value}
                        />{" "}
                        {servings.name}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </form>
          </div>
        {/* )} */}
      <div className={`transition-all duration-500 ml-auto ${showFilters ? 'w-[calc(100%-6rem)]' : 'mx-auto max-w-5xl xl:max-w-[90rem]'}`}>
        {/* Recipe Grid */}
        <section className="mb-4">
          <div className={`grid gap-4 ${showFilters?" grid-cols-3 w-3/4":"grid-cols-4 "}}`}>
            {initialDisplayedRecipes.map((recipe) => (
              <div key={recipe.id} className={`bg-white p-2 rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:ring-1 hover:ring-gray-400 ${showFilters? "1/2":"w-full"}`}>
                   {isLoggedIn  && (
                    <>
                      <button
                        onClick={() => {
                          setClickedRecipe(recipe.id);
                          setIsUpdate(!isUpdate);
                          setFormOpen(!formOpen);
                        }}
                        className={clsx(
                          "absolute bg-blue-400 px-3 rounded-md py-1 text-xs font-semibold z-30 top-2 left-2",
                          (_user && _user.id === recipe.user_id || user?.email === _user?.email)
                            ? "block"
                            : "hidden"
                        )}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteRecipe(recipe.id)}
                        className={clsx(
                          "absolute bg-slate-50 p-1 rounded-sm z-30 top-2 right-2 text-red-600 text-md",
                          (_user && _user.id === recipe.user_id || user?.email === _user?.email)?
                           "block" : "hidden"
                        )}
                      >
                        <BiTrash />
                      </button>
                    </>
                  )}
                 <Link to={`/recipes/${recipe.id}`}>
                      <img
                        className="w-full h-44 rounded-xl object-cover"
                        src={recipe.banner_image}
                        alt={recipe.title}
                      />
                </Link>
                <div className="p-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-bold">{recipe.title}</h3>
                    <p>⭐<span className="ml-2">{recipe.rating}</span></p>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <p className="text-red-500 text-xl">{recipe.cookTime} Min</p>
                    <div className="flex space-x-3">
                     <button
                        onClick={() => handleBookmarkToggle(recipe.id)}
                        className="text-xl text-red-500 transition-transform duration-100 hover:scale-110"
                      >
                        <span role="img" aria-label="like">
                          {Array.isArray(userBookmarks) && userBookmarks.some(bookmark => bookmark?.id === recipe.id)
                            ? <AiFillHeart /> 
                            : <AiOutlineHeart />}
                        </span>
                      </button>
                      <ShareBtn
                          image={recipe.banner_image}
                          title={`Delicious Recipe: ${recipe.title}`} 
                          text={`Check out this delicious recipe for ${recipe.title}!`} 
                          url={`https://recipehaven-silk.vercel.app/recipes/${recipe.id}`}
                          btn={<FontAwesomeIcon icon={faShareAlt} />}
                        />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
         <div className="flex justify-center mt-8">
          <button 
          onClick={handleLoadMore}
          className="bg-green-500 hover:bg-green-700 w-[25%] mb-2 text-white font-bold py-3 px-4 rounded-lg">
            Load More
          </button>
        </div>

        {/* Recommended Recipes */}
        <section className="mb-4 mt-3">
          <h2 className="text-3xl bg-gray-300 rounded p-2 text-gray-700 w-fit text-center font-bold mb-4">~Recommended Recipes~</h2>
          <div className={`grid gap-4 ${showFilters?" grid-cols-3 gap-4":"grid-cols-4 gap-4"}}`}>
            {recommendedRecipes.map((recipe) => (
              <div key={recipe.id} className="bg-white p-2 rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:ring-1 hover:ring-gray-400">
                  <Link to={`/recipes/${recipe.id}`}>
                      <img
                        className="w-full h-44 rounded-xl object-cover"
                        src={recipe.banner_image}
                        alt={recipe.title}
                      />
                </Link>
                <div className="p-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-bold">{recipe.title}</h3>
                    <p>⭐<span className="ml-2">{recipe.rating}</span></p>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <p className="text-red-500 text-xl">{recipe.cookTime} Min</p>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleBookmarkToggle(recipe.id)}
                        className="text-xl text-red-500 transition-transform duration-100 hover:scale-110"
                      >
                        <span role="img" aria-label="like">
                          {Array.isArray(userBookmarks) && userBookmarks.some(bookmark => bookmark?.id === recipe.id)
                            ? <AiFillHeart /> 
                            : <AiOutlineHeart />}
                        </span>
                      </button>
                      <ShareBtn
                          image={recipe.banner_image}
                          title={recipe.title} 
                          text={`Check out this delicious recipe for ${recipe.title}!`}
                          url={`https://recipehaven-silk.vercel.app/recipes/${recipe.id}`}
                          btn={<FontAwesomeIcon icon={faShareAlt} />}
                        />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>       
       </div>
      </div>
    </div>
  </section>
    </Layout>
  );
};

export default RecipesPage;
