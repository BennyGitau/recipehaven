import { useNavigate, useLocation, useParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import Layout from "../components/Layout/Layout";
import { userAuth } from "../contexts/userContext";
import clsx from "clsx";
import { BiSend, BiUserCircle } from "react-icons/bi";
import { FaHeart, FaComment } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import ShareBtn from "../components/GetRecipe/ShareBtn";
import axios from "axios";
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { toast } from "react-toastify";

function RecipePage() {
  const param = useParams();
  const {
    setParam,
    recipe,
    _user,
    user,
    handleAddComment,
    handleAddResponse,
    handleAddToBookmarks,
    handleRemoveFromBookMark,
    handleAddRating,
    handleUpdateRating,
    headers,
    postSuccess,
    setPostSuccess,
    recipes,
  } = userAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const imagePrint = useRef();
  const infoPrint = useRef();
  const ingredientsPrint = useRef();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(null);
  const btnShare = `Share🔗`;
  const [bookMark, setBookMark] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


  const handlePrint = () => {
    const printContent1 = imagePrint.current
    ? `<img src="${imagePrint.current.src}" alt="Recipe Image" />`
    : '';
    const printContent2 = infoPrint.current.innerHTML;
    const printContent3 = ingredientsPrint.current.innerHTML;

    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Recipe</title></head><body>');
    printWindow.document.write('<div style="width: 50%; float: center;">' + printContent1 + '</div>');
    printWindow.document.write('<h3>Ingredients</h3>');
    printWindow.document.write('<div>' + printContent3 + '</div>');
    printWindow.document.write('<h3>Instructions</h3>');
    printWindow.document.write('<div>' + printContent2 + '</div>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };


  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!_user && !user) {
      toast.warn("Please login to comment", { theme: "colored" });
      setTimeout(() => {
      navigate("/auth/login", { state: { from: location.pathname } });
      }, 2000);
      return;
    }
    try {
      if (comment.trim()) {
        await handleAddComment(param?.recipe, {
          text: comment,
          user_id: _user?.user_id,
        });
        setPostSuccess(!postSuccess);
        setComment("");
      }
    } catch (error) {
      setPostSuccess(!postSuccess);
      console.log(error);
    }
  };

  useEffect(() => {
    if (param?.recipe) {
      setParam(param.recipe);
    }

    const fetchUserRating = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/recipes/${param?.recipe}/rating`, { headers });
        const ratings = await response.data
        // Find the user's rating from the list of ratings
        if (ratings) {
          setUserRating(ratings || null);
          setRating(ratings? ratings.value : 0);
          return;
        }
      } catch (error) {
        console.error("Error fetching user rating:", error);
      } 
    };

    fetchUserRating();
  }, [param, setParam, _user, headers]);

  const handleRating = async (value) => {
    if (!_user && !user) {
      toast.warn("Please login to rate", { theme: "colored" });
      setTimeout(() => {
      navigate("/auth/login", { state: { from: location.pathname } });
      },2000);
      return;   
    }
    try {
      if (rating) {
        await handleUpdateRating(param?.recipe, { value: value } ,userRating.id);
        setRating(value);
      } else {
        await handleAddRating(param?.recipe, { value: value });
      }
    } catch (error) {
      console.error("Error handling rating:", error);
    }
  };

  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  const handleBookmarkToggle = async (recipeId) => {
    setBookMark(!bookMark);
    if(!bookMark) {
      await handleAddToBookmarks(recipeId);
    } else {
      await handleRemoveFromBookMark(recipeId);
    }
   };
   const id = parseInt(param.recipe)
  
  const handleNext = () => {
    if (id < recipes.length) {
      navigate(`/recipes/${id + 1}`);
    }
  };

  const handlePrev = () => {
    if (id > 1) {
      navigate(`/recipes/${id - 1}`);
    }
  };


  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <section className="w-full h-full flex items-center justify-center text-gray-700">
        <div className="max-w-4xl xl:max-w-[73rem] w-full min-h-[calc(100vh-8rem)] mx-auto py-3 flex flex-col">
          <div className="user mt-8 left-0 top-1/2 -translate-y-1/2 h-fit flex flex-col w-full">
            <button
              onClick={() => navigate(-1)}
              className="w-fit text-white px-5 py-2 rounded-r-2xl text-xs border border-gray-600 font-semibold bg-gray-600"
            >
              Back to all
            </button>
          </div>
          <div className="relative h-fit flex flex-row justify-between items-center mr-3">
            <div className="flex flex-col space-y-3">
              <h1 className="text-3xl uppercase font-bold">{recipe?.title}</h1>
            </div>
            <div className="user relative h-fit flex flex-col space-y-2">
              <svg
              viewBox="0 0 268 246"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-56 h-56 absolute -top-20 -left-20 rotate-12"
              >
              <path
                d="M214.715 157.032C209.597 171.861 192.857 181.251 169.656 184.293C146.488 187.331 117.04 184.006 86.8183 173.575C56.5961 163.143 31.3681 147.595 15.0068 130.913C-1.37822 114.207 -8.76144 96.4903 -3.64285 81.6611C1.47575 66.8318 18.2153 57.4418 41.4167 54.3997C64.5847 51.3621 94.032 54.6861 124.254 65.1179C154.476 75.5497 179.704 91.0978 196.066 107.78C212.451 124.486 219.834 142.202 214.715 157.032Z"
                stroke="#3FB4B1"
                strokeOpacity="0.5"
              />
              <path
                d="M237.747 160.315C221.711 206.771 159.885 227.792 99.4671 206.938C39.0488 186.083 3.35331 131.4 19.3886 84.944C35.4239 38.4877 97.25 17.4665 157.668 38.321C218.086 59.1755 253.782 113.858 237.747 160.315Z"
                stroke="#3FB4B1"
                strokeOpacity="0.5"
              />
            </svg>
            <div className="name flex space-x-3 items-center text-base">
              {_user?.image_url ? (
                <img
                  ref={imagePrint}
                  src={_user?.image_url}
                  alt={recipe?.username}
                  className="h-8 w-8 rounded-full ring-2 ring-green-600"
                />
              ) : (
                <BiUserCircle className="h-6 w-6" />
              )}
              <span className="font-bold text-sm uppercase">
                {recipe?.author?.firstname} {recipe?.author?.lastname}
              </span>
              <span className="text-xs text-gray-50 px-4 font-bold py-1 rounded-xl bg-green-600">
                Follow <span className="text-[10px]">(12K)</span>
              </span>
            </div>
            </div>
          </div>
          <div className="w-full">
            <h1 className="text-xl font-bold text-gray-700 ml-2">Cuisine:  ~{recipe.cuisine}~</h1>
            <p className=" ml-2">{recipe?.description}</p>
          </div>
           <div className="flex items-center justify-between rounded-md space-x-2 w-full p-1 pl-2 mb-2 mt-3 pr-4 text-gray-900 ">
            <div className="flex items-center rounded px-2 bg-gray-200">
                <button
                  onClick={() => handleBookmarkToggle(recipe.id)}
                  className=" transition-transform duration-100 hover:scale-110"
                >
                  <span role="img" aria-label="like" className="flex items-center">Bookmark
                    {bookMark
                    ? <AiFillHeart /> 
                    : <AiOutlineHeart />}
                    <span className="text-slate-500 font-bold text-2xl mr-2">||</span>
                  </span>
                </button>
                <button onClick={handlePrint} className="py-2 text-xl hover:text-green-500">Print <span className="text-slate-500 font-bold text-2xl">||</span></button>
                <div className="rounded-lg hover:translate-transform duration-200 hover:scale-110">
                    {stars.map((star, i) => (
                      <button
                          key={i}
                            className={`text-black text-2xl ${star <= rating ? 'text-yellow-500' : ''}`}
                              onClick={() => handleRating(star)}
                                >
                                ★     
                      </button>
                      ))}
                      <span className="ml-1">({rating})</span>
                </div>
                <div className=" flex rounded-lg items-center">
                    <span className="text-slate-500 font-bold text-2xl mr-2">||</span>
                      <ShareBtn 
                        url={`https://recipehaven-silk.vercel.app/recipes/${recipe.id}`}
                        title={recipe.title}
                        image={recipe.banner_image}
                        text='Check out this delicious recipe'
                        btn={btnShare}
                      />
                </div>
              </div>
              <p className="text-xl flex items-center text-orange-400">
                <span className="inline-flex font-bold items-start justify-center">
                  {[...Array(5)].map((_, index) => (
                    <span key={index}>
                    {index <recipe?.rating ? (<AiFillStar className="" /> 
                      ) : ( <AiOutlineStar className="" /> )}
                    </span>
                      ))}
                </span>
                <p className="ml-2">({recipe?.rating})</p>
             </p>
          </div>
          <div>      
            <img
              src={recipe?.banner_image}
              alt={recipe?.title}
              className={clsx(
                "h-[32rem] w-full object-cover rounded-xl",
                recipe?.ingredients?.length > 0 ? "col-start-1 col-span-10" : ""
              )}
            />
          </div>
          <div className="w-full h-fit bg-gray-300 grid grid-cols-3  p-10 mx-auto mt-5 rounded-md">
              <div className="m-2 text-xl w-fit">PrepTime: <br></br>
                <span className="text-sm ml-3">{recipe?.prepTime} Mins</span>
              </div>
              <div className="m-2 text-xl w-fit">
                Cook Time: <br></br>
                <span className="text-sm ml-3">{recipe?.cookTime} Mins</span>
              </div>
              <div className="m-2 text-xl w-fit">
                Total Time: <br></br>
                <span className="text-sm ml-3">{parseInt(recipe?.prepTime) + parseInt(recipe?.cookTime)} Mins</span>
              </div>
              <div className="m-2 text-xl w-fit">
                Servings: <br></br>
                <span className="text-sm ml-3">{recipe?.servings}</span>
              </div>
          </div>
          {/* ingredients */}
          <section className="mt-6">
            <h1 className="text-2xl pl-1 font-bold py-1.5 border-b-2 border-slate-950">Ingredients:</h1>
             <ul className="list-none w-full ml-5 mt-3 space-y-2">
              {recipe?.ingredients?.map((ingredient, i) => (
                <li key={i}>
                  <div className="flex items-center space-x-3">
                    <img src={ingredient? ingredient.image : ''} alt="recipe image" className="w-12 h-12 rounded-full"/>
                    <span ref={ingredientsPrint} className="">{ingredient.name} {ingredient.quantity}</span>
                </div>
                </li>
              ))}
            </ul>
          </section>
          {/* instructions */}
          <section ref= {infoPrint} className="col-span-10 mt-8 col-start-1 text-base space-y-3">
            <h1 className="text-2xl pl-1 font-bold py-1.5 border-b-2 border-slate-950">Instructions:</h1>
            <p className="text-base font-normal text-gray-500 ml-3 mt-3">
            {typeof recipe?.instructions === 'string' &&
              recipe.instructions.split("\n").map((line, index) => (
                <span key={index}>
                  {index + 1}. {line}
                  <br />
                </span>
              ))
            }
          </p>
          </section>
          {/* images */}

          {recipe?.other_images.length > 0 && (
            <div className="w-[90%] mt-2 ">
              <div className="col-span-10 col-start-1 text-base">
                <h1 className="text-2xl pl-1 font-bold py-1.5 border-b-2 mb-2 border-slate-950">
                  Done and served.
                </h1>
              </div>
              <div className="grid  w-full">
                <Box sx={{ width: '95%', maxHeight: 500 }}>
                    <Masonry columns={6} spacing={1} sequential>
                        {recipe?.other_images.map((item, id) => (
                        <div key={id}>
                            <img
                            src={`${item.image}`}
                            alt='img'
                            loading="lazy"
                            className="w-full block rounded transition-transform duration-300 hover:scale-125"
                            />
                        </div>
                        ))}
                    </Masonry>
                </Box>
            </div>
              {/* <div className="grid h-80 grid-cols-9 gap-2 items-center justify-center grid-rows-2 col-span-10 col-start-1">
                {recipe?.other_images.map(({ image, id }, idx) => (
                  <div
                    key={id}
                    className={clsx(
                      "relative h-full w-full object-cover row-span-1 rounded-xl shadow-sm stroke-lime-950 drop-shadow-md overflow-hidden group",
                      idx === 0 && "col-span-2 row-span-2 bg-indigo-300",
                      idx === 1 &&
                        "col-span-2 row-span-2 row-start-2 bg-amber-300",
                      idx === 2 &&
                        "col-span-3 col-start-3 row-span-3 bg-green-300",
                      idx === 3 && "col-span-2 row-span-2 bg-cyan-300",
                      idx === 4 &&
                        "col-span-2 row-span-2 col-start-8 bg-red-300",
                      idx === 5 &&
                        "col-span-4 row-span-2 row-start-2 col-start-6 bg-pink-300",
                      idx > 5 && "hidden",

                      // 4
                      recipe?.other_images.length === 5 &&
                        idx === 0 &&
                        "col-span-2 row-span-2 bg-indigo-300",
                      recipe?.other_images.length === 5 &&
                        idx === 1 &&
                        "col-span-2 row-span-2 row-start-2 bg-amber-300",
                      recipe?.other_images.length === 5 &&
                        idx === 2 &&
                        "col-span-4 col-start-3 row-span-3 bg-green-300",
                      recipe?.other_images.length === 5 &&
                        idx === 3 &&
                        "col-span-3 col-start-7 row-span-2 bg-green-300",
                      recipe?.other_images.length === 5 &&
                        idx === 4 &&
                        "col-span-3 col-start-7 row-span-2 row-start-2 bg-cyan-300",

                      // 4
                      recipe?.other_images.length === 4 &&
                        idx === 0 &&
                        "col-span-2 row-span-2 bg-indigo-300",
                      recipe?.other_images.length === 4 &&
                        idx === 1 &&
                        "col-span-2 row-span-2 row-start-2 bg-amber-300",
                      recipe?.other_images.length === 4 &&
                        idx === 2 &&
                        "col-span-4 col-start-3 row-span-3 bg-green-300",
                      recipe?.other_images.length === 4 &&
                        idx === 3 &&
                        "col-span-3 col-start-7 row-span-3 bg-green-300",

                      // 3
                      recipe?.other_images.length === 3 &&
                        idx === 0 &&
                        "col-span-3 row-span-2 bg-indigo-300",
                      recipe?.other_images.length === 3 &&
                        idx === 1 &&
                        "col-span-3 row-span-2 row-start-2 bg-amber-300",
                      recipe?.other_images.length === 3 &&
                        idx === 2 &&
                        "col-span-7 col-start-4 row-span-3 bg-green-300",

                      // 2
                      recipe?.other_images.length === 2 &&
                        idx === 0 &&
                        "col-span-4 row-span-4 bg-indigo-300",
                      recipe?.other_images.length === 2 &&
                        idx === 1 &&
                        "col-span-3 row-span-4 col-start-5 bg-amber-300",

                      // 1
                      recipe?.other_images.length === 1 &&
                        idx === 0 &&
                        "col-span-9 row-span-4 bg-indigo-300"
                    )}
                  >
                    <img
                      src={image}
                      alt={`image-${id}`}
                      className={clsx(
                        "absolute inset-0 h-full w-full object-cover rounded-xl group-hover:scale-[1.2] duration-200 ease-out"
                      )}
                    />
                  </div>
                ))}
              </div> */}
            </div>
          )}
          <div className="mt-8 grid grid-cols-12 gap-20 w-full">
            <div className="col-span-10 col-start-1 text-base space-y-3 border-t-2 border-gray-700 ">
              <div
                className={clsx(
                  "flex justify-between items-center font-bold pt-4"
                )}
              >
                <div className="next">
                  <button
                    onClick={handleNext}
                    className="bg-green-600 px-8 py-2 rounded-xl text-white">
                    Next
                  </button>
                </div>
                <div className="prev">
                  <button
                    onClick={handlePrev} 
                  className="bg-green-600 px-8 py-2 rounded-xl text-white">
                    Prev
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-12 gap-20 w-full">
            <div className="col-span-10 col-start-1 text-base space-y-3">
              <h1 className="inline-flex bg-cyan-100 justify-between w-full text-2xl font-bold  py-1.5 border-b-2 border-slate-950">
                <div className="pl-1 space-x-1">
                  <span>Comments</span>
                  <span className="text-base -translate-y-[2.5px] inline-flex font-normal text-gray-500 mt-3">
                    ({recipe?.comments?.length})
                  </span>
                </div>
                <div className="all pr-3">
                  <button
                    disabled
                    className={clsx(
                      "text-sm italic",
                      recipe?.comments?.length == 0 ? "text-gray-400" : ""
                    )}
                  >
                    View all
                  </button>
                </div>
              </h1>
              <form
                onSubmit={handleSubmit}
                className="relative flex flex-col space-y-2 mt-3"
              >
                <textarea
                  id="comment"
                  name="comment"
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={handleChange}
                  className="w-full px-3 pr-20 py-1.5 text-sm border focus:ring-1 focus:ring-green-600 border-slate-300 rounded-md"
                />
                <BiSend
                  onClick={handleSubmit}
                  className="absolute right-3 top-[25%] -translate-y-1/2 text-4xl -rotate-12 text-green-600"
                />
              </form>
              <div className="w-full">
                <CommentsList
                  _user={_user}
                  param={param}
                  postSuccess={postSuccess}
                  setPostSuccess={setPostSuccess}
                  comments={recipe?.comments}
                  handleAddResponse={handleAddResponse}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
export default RecipePage;

const CommentsList = ({
  _user,
  param,
  comments,
  postSuccess,
  setPostSuccess,
  handleAddResponse,
}) => {
  const [responseText, setResponseText] = useState("");
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [commentId, setCommentId] = useState(null);

  const handleResponseSubmit = async (e) => {
    e.preventDefault();

    if (!commentId) return;

    try {
      if (responseText.trim()) {
        const res = await handleAddResponse(param?.recipe, commentId, {
          text: responseText,
          user_id: _user?.userID,
        });
        console.log("RES: ", res);
        if (res) {
          setResponseText("");
          // setActiveCommentId(null);
          setPostSuccess(!postSuccess);
        }
      }
    } catch (error) {
      setPostSuccess(!postSuccess);
      console.log(error);
    }
  };

  return (
    <div className="space-y-4">
      {[...comments]?.reverse().map((comment) => (
        <div
          key={comment?.id}
          id={comment?.id}
          className="px-2 pr-3 py-1.5 rounded-sm bg-cyan-50"
        >
          <div className="flex justify-between items-center space-x-3 ">
            <div className="flex items-center space-x-1">
              {comment?.user?.image ? (
                <img
                  src={comment?.user?.image}
                  alt={comment?.user?.username}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <BiUserCircle className="text-5xl" />
              )}
              <div className="flex h-full flex-col">
                <span className="text-sm font-semibold">
                  {comment?.fullname}
                </span>
                <span className="h-[2px] w-12 bg-slate-600 flex rounded-full my-[2.5px]" />
                <span className="text-sm text-gray-500">{comment?.text}</span>
              </div>
            </div>
            <div className="flex flex-col justify-between items-end h-full text-gray-600">
              <span className="text-gray-500 font-semibold text-[10px]">
                13/08/2024, 07:26:41
              </span>
              <span className="h-[2px] w-12 bg-transparent flex rounded-full my-[2.5px]" />
              <div className="flex space-x-3 font-bold">
                <span className="flex items-center space-x-2">
                  <FaHeart className="text-red-500 cursor-pointer" />
                  <span>0</span>
                </span>
                <span className="flex items-center space-x-2">
                  <FaComment
                    onClick={() => {
                      setActiveCommentId(comment?.id);
                      setCommentId(comment?.id);
                    }}
                    className="text-blue-500 cursor-pointer"
                  />
                  <span>{comment.responses.length}</span>
                </span>
              </div>
            </div>
          </div>

          {activeCommentId === comment.id && (
            <>
              <div className="relative flex flex-col space-y-2 mt-3 ml-12">
                {comment?.responses.map((response) => (
                  <div
                    key={response.id}
                    className="flex items-center space-x-2 bg-gray-100 px-3 py-1.5 rounded-md"
                  >
                    <div className="flex items-center space-x-1">
                      {response?.user?.image ? (
                        <img
                          src={response?.user?.image}
                          alt={response?.user?.username}
                          className="h-8 w-8 rounded-full"
                        />
                      ) : (
                        <BiUserCircle className="text-5xl" />
                      )}
                      <div className="flex h-full flex-col">
                        <span className="text-sm font-semibold">
                          {response?.fullname}
                        </span>
                        <span className="h-[2px] w-12 bg-slate-600 flex rounded-full my-[2.5px]" />
                        <span className="text-sm text-gray-500">
                          {response?.text}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <form
                onSubmit={handleResponseSubmit}
                className="relative flex flex-col space-y-2 mt-3 ml-12"
              >
                <textarea
                  id="comment"
                  name="comment"
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Respond..."
                  className="w-full px-3 pr-20 py-1.5 text-sm border focus:ring-1 focus:ring-green-600 border-slate-300 rounded-md"
                />
                <BiSend
                  onClick={handleResponseSubmit}
                  className="absolute right-3 top-[25%] -translate-y-1/2 text-4xl -rotate-12 text-green-600"
                />
              </form>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

