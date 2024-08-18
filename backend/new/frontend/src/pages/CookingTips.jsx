import React from "react";
import image from '../assets/imgs/login-Signup.jpg';
import Layout from "../components/Layout/Layout";

function CookingTips() {
  return (
  <Layout>
     <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-white shadow-md rounded-lg overflow-hidden">
        <img 
          src={image} 
          alt="Header" 
          className="w-full h-48 object-cover" 
        />
        <div className="p-4">
          <h1 className="text-2xl font-bold">Send email your journeys with us and learn new tips and recipes from the Recipe Newsletter</h1>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
            pro tips
          </button>
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4">
            cooking hacks
          </button>
        </div>
      </header>
      
      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4">Something from the shelf that will cook like a pro</h2>
        <div className="space-y-4">
  
            <div className="bg-white rounded-lg shadow-md flex overflow-hidden">
              <img 
                src={image} 
                alt="Recipe"
                className="w-32 h-32 object-cover" 
              />
              <div className="p-4 flex flex-col justify-between">
                <h3 className="text-lg font-bold">Mise en place</h3>
                <p className="text-gray-600">Organize all of your tools, ingredients, and utensils before you start preparing a recipe.</p>
              </div>
            </div>
  
            <div className="bg-white rounded-lg shadow-md flex overflow-hidden">
              <img 
                src={image} 
                alt="Recipe"
                className="w-32 h-32 object-cover" 
              />
              <div className="p-4 flex flex-col justify-between">
                <h3 className="text-lg font-bold">Read all instructions</h3>
                <p className="text-gray-600">Understand the recipe start-to-finish to better organize your workspace and avoid surprises.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md flex overflow-hidden">
              <img 
                src={image}
                alt="Recipe"
                className="w-32 h-32 object-cover" 
              />
              <div className="p-4 flex flex-col justify-between">
                <h3 className="text-lg font-bold">Clean as you go</h3>
                <p className="text-gray-600">Rinse and neatly place utensils in the sink as you use them to stay organized.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md flex overflow-hidden">
              <img 
                src={image} 
                alt="Recipe"
                className="w-32 h-32 object-cover" 
              />
              <div className="p-4 flex flex-col justify-between">
                <h3 className="text-lg font-bold">Blender liquids first</h3>
                <p className="text-gray-600">Always add liquid ingredients first when using a blender for better consistency.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md flex overflow-hidden">
              <img 
                src={image} 
                alt="Recipe"
                className="w-32 h-32 object-cover" 
              />
              <div className="p-4 flex flex-col justify-between">
                <h3 className="text-lg font-bold">Let meat rest</h3>
                <p className="text-gray-600">Allow meat to rest after cooking for more flavor and moisture.</p>
              </div>
            </div>

          
        </div>
      </section>
      
      <section className="mt-8">
        <img 
          src={image} 
          alt="Cooking"
          className="w-full h-64 object-cover rounded-lg" 
        />
      </section>
      
      <footer className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">What are those hacks for cooking?</h2>
        <p className="text-gray-600">
        <ul className="list-disc list-inside">
            <li className="mt-2">Cook pasta al dente for an authentic Italian taste.</li>
             <li className="mt-2">Use a pizza cutter to slice herbs quickly and easily.</li>
             <li className="mt-2">Keep appetizers cold by using ice-filled Ziploc bags under the serving dish.</li>
             <li className="mt-2">Spritz your cheese grater with cooking oil for easier cleanup.</li>
             <li className="mt-2">Warm eggs in a bowl of warm water to quickly bring them to room temperature.</li>
             <li className="mt-2">Place mixing bowls on a damp dishtowel to prevent slipping.</li>
             <li className="mt-2">Make a roux to prevent cheese from separating in cheese sauces.</li>
           </ul>
        </p>
      </footer>
    </div>
  
  </Layout>)
}

export default CookingTips;