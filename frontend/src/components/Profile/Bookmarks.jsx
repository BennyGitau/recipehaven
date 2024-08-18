import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { userAuth } from "../../contexts/userContext";
import { BiTrash } from 'react-icons/bi';
import ShareBtn from '../GetRecipe/ShareBtn';

function Bookmarks() {
  const { handleGetUserBookMarks, handleRemoveFromBookMark  } = userAuth();
  const [bookMarks, setBookMarks] = useState([]);
    useEffect(() => {
    const fetchBookmarks = async () => {
      const fetchedBookmarks = await handleGetUserBookMarks();
      if (fetchedBookmarks) {
        setBookMarks(fetchedBookmarks);
      }
    };
    fetchBookmarks();
  }, []);

  const handleRemove = async (bookmark_id) => {
    await handleRemoveFromBookMark(bookmark_id);
    const updatedBookmarks = bookMarks.filter((bookmark) => bookmark.id !== bookmark_id);
    setBookMarks(updatedBookmarks);
  };
  console.log(bookMarks)

    return (
        <section className="mb-4 bg-gray-200 rounded-lg">
        <h2 className='text-2xl font-bold text-gray-700 pl-4 pt-4'>My Bookmarks</h2>
          <div className="grid grid-cols-1 p-2 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[...bookMarks]?.reverse().map((bookmark) => (
              <div key={bookmark.id} className="bg-white p-2  rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:ring-1 hover:ring-gray-400">
                <img 
                  src={bookmark?.banner_image} 
                  alt="Recipe"
                  className="w-full h-44 object-cover rounded-xl" 
                />
                <div className="p-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-bold">{bookmark?.title}</h3>
                    <p>⭐<span className="ml-2">{bookmark?.rating}</span></p>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <button 
                      onClick={() => handleRemove(bookmark.id)}
                    >
                      <BiTrash className='text-red-500 text-xl' />
                    </button>
                    <div className="flex space-x-3">
                      <ShareBtn
                          image={bookmark?.banner_image}
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
    );
}

export default Bookmarks;