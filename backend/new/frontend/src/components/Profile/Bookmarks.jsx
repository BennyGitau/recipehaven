import React from 'react';
import image from '../../assets/imgs/login-Signup.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faShareAlt } from '@fortawesome/free-solid-svg-icons';

function Bookmarks() {
    return (
        <section className="mb-4 bg-gray-200 rounded-lg">
        <h2 className='text-2xl font-bold text-gray-700 pl-4 pt-4'>My Bookmarks</h2>
          <div className="grid grid-cols-1 p-2 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white p-2  rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:ring-1 hover:ring-gray-400">
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
                    <button>
                        <p className="text-red-500 text-xl">Remove</p>
                    </button>
                    <div className="flex space-x-3">
                      <button className=" text-xl hover:text-green-700 transition-transform duration-100 hover:scale-110">
                        <span role="img" aria-label="comment"><FontAwesomeIcon icon={faComment} /></span>
                      </button>
                      <button className="text-xl hover:text-green-700 transition-transform duration-100 hover:scale-110">
                        <span role="img" aria-label="share"><FontAwesomeIcon icon={faShareAlt} /></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        // <div className="container mx-auto p-4 bg-gray-200 rounded-lg">
        //     <h2 className="text-xl text-gray-500 font-medium mb-4">My Bookmarks</h2>
        //     <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
        //         {bookmarks.map((recipe) => (
        //             <div key={recipe.id} className="border p-4 bg-white rounded shadow">
        //                 <h3 className="text-lg font-bold">{recipe.title}</h3>
        //                 <p>{recipe.description}</p>
        //                 <button
        //                     className="mt-2 bg-red-500 text-white py-1 px-3 rounded"
        //                 >
        //                     Remove
        //                 </button>
        //             </div>
        //         ))}
        //     </div>
        // </div>
    );
}

export default Bookmarks;