import React, { useState, useContext } from "react";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import RecipeForm from "../Recipes/RecipeForm";
import bImg from "../../assets/imgs/shape3-min.png";
import { AuthContext } from "../../contexts/AuthContext"; 

function Testimonials() {
  const { user } = useContext(AuthContext); 
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleShareRecipeClick = () => {
    if (user) {
      setShowForm(true);
    } else {
      navigate("/login"); 
    }
  };

  return (
    <section className="relative flex justify-center w-full h-fit mt-80 xl:mt-[26rem] bg-blue-950">
      <img
        src={bImg}
        alt="shape"
        className="absolute inset-0 w-full h-full opacity-5"
      />
      <div className="relative z-20 max-w-4xl xl:max-w-[73rem] w-full py-12 xl:py-16 flex space-y-8 flex-col justify-center items-center">
        <h1 className="w-full text-center text-white uppercase text-5xl xl:text-7xl font-semibold grid">
          <span>Ready to share </span>
          <span>
            your nana's{" "}
            <span className="italic font-light text-xl">secret </span>🤫 recipe?
          </span>
        </h1>
        <span className="h-[3px] w-32 bg-slate-300 flex rounded-2xl" />
        <button
          onClick={handleShareRecipeClick}
          className="relative overflow-hidden group border border-green-600 w-fit text-2xl font-semibold bg-white px-6 py-2 rounded-xl flex items-center justify-center"
        >
          <span className="relative z-10"> Share your recipe</span>
          <BiPlus className="relative z-10 text-3xl text-slate-800" />
          <span className="absolute top-0 left-0 h-full right-0 -translate-x-full bg-green-600 rounded-xl z-[8] group-hover:translate-x-0 duration-300 ease-out" />
        </button>
        {showForm && <RecipeForm />} 
      </div>
    </section>
  );
}

export default Testimonials;

