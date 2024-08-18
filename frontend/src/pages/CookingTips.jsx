
import React from "react";
import image from '../assets/imgs/login-Signup.jpg';
import Layout from "../components/Layout/Layout";
import images6 from '../assets/imgs/cookingtips/images6.jpeg'
import images2 from '../assets/imgs/cookingtips/images2.jpeg'
import images7 from '../assets/imgs/cookingtips/images7.jpeg'
import images9 from '../assets/imgs/cookingtips/images9.jpeg'
import images11 from '../assets/imgs/cookingtips/images11.jpeg'
import download from '../assets/imgs/cookingtips/download.jpeg'

function CookingTips() {
  return (
    <Layout>
      <section className="min-h-screen text-slate-900  w-full h-full bg-gray-100">
        <div className="bg-white shadow-md overflow-hidden mx-auto p-1 max-w-4xl xl:max-w-[73rem]">
          <img src={images9} alt="Header" className="w-full h-48 object-cover" />
          <div className="max-w-4xl xl:max-w-[73rem] w-full mx-auto py-8">
            <h1 className="text-3xl font-bold max-w-2xl uppercase ">
              Share your journeys with us and learn new tips and recipes
              from the Recipe Newsletter
            </h1>
            <span className="h-[2.5px] w-48 rounded-full bg-slate-700 flex my-4" />
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
              pro tips
            </button>
            <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4">
              cooking hacks
            </button>
          </div>
        </div>

        <div className="max-w-4xl xl:max-w-[73rem] w-full mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-4 border-b border-slate-700 pb-3">
            Something from the shelf that will cook like a pro
          </h2>
          <div className="w-full grid grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md flex overflow-hidden">
              <img
                src={images2}
                alt="Recipe"
                className="w-32 h-full object-cover"
              />
              <div className="p-4 flex space-y-3 flex-col justify-between">
                <h3 className="text-xl uppercase font-bold">Mise en place</h3>
                <p className="text-gray-600 text-sm max-w-md">
                  Organize all of your tools, ingredients, and utensils before
                  you start preparing a recipe.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md flex overflow-hidden">
              <img
                src={image}
                alt="Recipe"
                className="w-32 h-full object-cover"
              />
              <div className="p-4 flex space-y-3 flex-col justify-between">
                <h3 className="text-xl uppercase font-bold">
                  Read all instructions
                </h3>
                <p className="text-gray-600 text-sm">
                  Understand the recipe start-to-finish to better organize your
                  workspace and avoid surprises.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md flex overflow-hidden">
              <img
                src={images11}
                alt="Recipe"
                className="w-32 h-32 object-cover"
              />
              <div className="p-4 flex space-y-3 flex-col ">
                <h3 className="text-xl uppercase font-bold">Clean as you go</h3>
                <p className="text-gray-600 text-sm">
                  Rinse and neatly place utensils in the sink as you use them to
                  stay organized.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md flex overflow-hidden">
              <img
                src={download}
                alt="Recipe"
                className="w-32 h-32 object-cover"
              />
              <div className="p-4 flex space-y-3 flex-col">
                <h3 className="text-xl uppercase font-bold">
                  Blender liquids first
                </h3>
                <p className="text-gray-600 text-sm">
                  Always add liquid ingredients first when using a blender for
                  better consistency.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md flex overflow-hidden">
              <img
                src={images7}
                alt="Recipe"
                className="w-32 h-32 object-cover"
              />
              <div className="p-4 flex space-y-3 flex-col justify-between">
                <h3 className="text-xl uppercase font-bold">Let meat rest</h3>
                <p className="text-gray-600 text-sm">
                  Allow meat to rest after cooking for more flavor and moisture.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mx-auto my-10 max-w-4xl xl:max-w-[73rem] ">
          <img src={images6} alt="Cooking" className="h-80 w-full object-cover" />
        </div>

        <div className="max-w-4xl xl:max-w-[73rem] mb-2 w-full mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 border-b-2 border-slate-700 pb-4">
            What are those hacks for cooking?
          </h2>
          <div className="text-gray-600 text-sm">
            <ul className="list-disc list-inside">
              <li className="mt-2">
                Cook pasta al dente for an authentic Italian taste.
              </li>
              <li className="mt-2">
                Use a pizza cutter to slice herbs quickly and easily.
              </li>
              <li className="mt-2">
                Keep appetizers cold by using ice-filled Ziploc bags under the
                serving dish.
              </li>
              <li className="mt-2">
                Spritz your cheese grater with cooking oil for easier cleanup.
              </li>
              <li className="mt-2">
                Warm eggs in a bowl of warm water to quickly bring them to room
                temperature.
              </li>
              <li className="mt-2">
                Place mixing bowls on a damp dishtowel to prevent slipping.
              </li>
              <li className="mt-2">
                Make a roux to prevent cheese from separating in cheese sauces.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default CookingTips;