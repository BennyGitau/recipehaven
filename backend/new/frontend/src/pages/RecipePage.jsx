import { useParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import Layout from "../components/Layout/Layout";
import { useUser } from "@clerk/clerk-react";
import image from "../assets/imgs/login-Signup.jpg";
import Ingredients from "../components/Recipes/Ingredients";
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import ShareBtn from "../components/GetRecipe/ShareBtn";

function RecipePage() {
    const { recipe } = useParams();
    const { isSignedIn, user } = useUser();
    const [singleRecipe, setRecipe] = useState(null);
    const imagePrint = useRef();
    const infoPrint = useRef();
    const ingredientsPrint = useRef();
    const summaryPrint = useRef();
    const id = useParams().recipe;
    const btnShare = `Share🔗`;

    const handlePrint = () => {
        const printContent1 = imagePrint.current.innerHTML;
        const printContent2 = infoPrint.current.innerHTML;
        const printContent3 = ingredientsPrint.current.innerHTML;
        const printContent4 = summaryPrint.current.innerHTML;


        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Recipe</title></head><body>');
        printWindow.document.write('<div>' + printContent1 + '</div>');
        printWindow.document.write('<div>' + printContent2 + '</div>');
        printWindow.document.write('<h3>Ingredients</h3>')
        printWindow.document.write('<div>' + printContent3 + '</div>');
        printWindow.document.write('<div>' + printContent4 + '</div>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
  };

  const images = [
    {url: "https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=600",},
    {url: "https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=600",},
    {url: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=600",},
    {url: "https://images.pexels.com/photos/784633/pexels-photo-784633.jpeg?auto=compress&cs=tinysrgb&w=600",},
    {url: "https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=600",},
    {url: "https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg?auto=compress&cs=tinysrgb&w=600",},
    {url: "https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=600",},
    {url: "https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=600",},
    {url: "https://images.pexels.com/photos/1006058/pexels-photo-1006058.jpeg?auto=compress&cs=tinysrgb&w=600",},
    {url: "https://images.pexels.com/photos/1109196/pexels-photo-1109196.jpeg?auto=compress&cs=tinysrgb&w=600",},
  ]
    const [rating, setRating] = useState(0);
    const handleRating =(value) => {
        setRating(value);
    }
    const stars = Array.from({ length: 5 }, (_, index) => index + 1);

    //const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('')
    const [replies, setReplies] = useState({}) 
    
    const handleSubmitComment =(e) => {
        e.prevemtDefault();
        const newCommentData = {
            text: newComment,
            author: 'username',
            replies: [],
        };
        //setComments([...comments, newCommentData]);
        setNewComment('');

    }
    const handleReply = (commentId) => {
        setReplies({ ...replies, [commentId]: !replies[commentId] });
    };

    const handleReplySubmit = (commentId, replyText) => {
        //logic tp handle reply submit
    // const updatedComments = comments.map((comment) =>
    //   comment.id === commentId
    //     ? { ...comment, replies: [...(comment.replies || []), replyText] }
    //     : comment
    // );
    // setComments(updatedComments);
    }

    //comments sample array
    const comments= [
        {
            image: image,
            text: "This is a sample comment",
            author: "John Doe",
            replies: [
            "reply 1", "reply 2", "reply 3"
            ]
        },
        {
            image: image,
            text: "This is a sample comment",
            author: "John Doe",
            replies: [
            "reply 1", "reply 2", "reply 3"
            ]
        },
        {
            image: image,
            text: "This is a sample comment",
            author: "John Doe",
            replies: [
            "reply 1", "reply 2", "reply 3"
            ]
        },
    ]

  return (
  <Layout>        
    <div className="container mx-auto px-4 py-8 w-[90%]">
            {/* Recipe Title and Image */}
            <div className="flex flex-col md:flex-row">
                <div className="md:w-3/4">
                    {/* user avatar and username */}
                    <div ref={imagePrint} className="flex justify-between items-center mb-2">
                        <h1 className="text-3xl font-bold mb-4">Delicious Sauce and Pasta</h1>
                        <div>
                            <div className="flex flex-row items-end">
                                <img
                                    src={image}
                                    alt="User Avatar"
                                    className="w-5 h-5 rounded-full mr-4"
                                />
                                <span className="text-gray-500">By John Doe</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center bg-gray-200 rounded-md space-x-2 w-fit p-1 pl-2 mb-2 pr-4 text-gray-900 ">
                        <button className="text-xl  py-1 rounded-full hover:text-green-500">Bookmark❤️ <span className="text-slate-500 font-bold text-2xl">||</span></button>
                        <button onClick={handlePrint} className="py-2 text-xl hover:text-green-500">Print <span className="text-slate-500 font-bold text-2xl">||</span></button>
                        <div className="rounded-lg hover:translate-transform duration-200 hover:scale-110">
                            {stars.map((star) => (
                                <button
                                    key={star}
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
                                url={`https://localhost:3000/recipe/${id}`}
                                title="Delicious Sauce and Pasta"
                                image={image}
                                text='Check out this delicious recipe'
                                btn={btnShare}
                            />
                        </div>
                    </div>
                    <div className="relative">
                        <img
                            src={image}
                            alt="Recipe"
                            className="w-full h-[400px] rounded-lg"
                        />
                        <span className="absolute top-4 left-4 text-white">⭐⭐⭐⭐⭐(1245)</span>
                    </div>
                </div>
                <div className="md:max-w-1/4 md:mt-28 pt-2 pb-2 md:ml-3 h-[400px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                <Ingredients print={ingredientsPrint} />
                </div>
            </div>
            <div>
                {/* Table of Contents */}
                <div className=" rounded-lg mt-8 w-[75%]">
                    <h2 className="text-3xl bg-gray-300 py-2 px-4 border-b-2 border-black font-bold mb-2">TABLE OF CONTENTS</h2>
                    <ul className="list-disc ml-5">
                        <li className="border-b-2 w-fit border-gray-300">Introduction</li>
                        <li className="border-b-2 w-fit border-gray-300">Ingredients</li>
                        <li className="border-b-2 w-fit border-gray-300">Instructions</li>
                        <li className="border-b-2 w-fit border-gray-300">Nutrition Facts</li>
                        <li className="border-b-2 w-fit border-gray-300">Comments</li>
                    </ul>
                </div>
                <button className="bg-gray-300 py-2 px-2 mt-2">+VIEW MORE</button>
                <div ref={infoPrint} className=" my-8 w-[65%]">
                    <p className="my-3">Recipe description jdhadjkahdajdsaduadajdiahdahdcaijdcuaddkdadhcuaddydgcag</p>
                    {/* Recipe at a Glance */}
                    <div className="mb-8">
                        <h2 className="text-xl border-b-2 font-bold mb-4">RECIPE AT A GLANCE</h2>
                        <div className="">
                            <p><strong>Cuisine Inspiration:</strong> Italian</p>
                            <p><strong>Primary Cooking Method:</strong> Stovetop</p>  
                            <p><strong>Dietary Info:</strong> Gluten-free</p>
                            <p><strong>Cooking Time:</strong> 25 minutes</p>
                            <p><strong>Servings:</strong> 4</p>
                            <p><strong>Skill Level:</strong> Easy</p>
                        </div>
                    </div>
                    {/* Recipe Steps */}
                    <div className="mt-3">
                        <h2 className="text-xl font-bold border-b-2 mb-6">Steps</h2>
                        <div className="flex items-center space-x-2">
                            <span className="text-center w-8 h-8 text-2xl font-bold">3</span>
                            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ultricies...</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Image Grid */} 
            <div className="grid bg-red-400w-full">
                <Box sx={{ width: '95%', maxHeight: 500 }}>
                    <Masonry columns={5} spacing={1} sequential>
                        {images.map((item, index) => (
                        <div key={index}>
                            <img
                            src={`${item.url}`}
                            alt='img'
                            loading="lazy"
                            className="w-full block rounded-lg transition-transform duration-300 hover:scale-125"
                            />
                        </div>
                        ))}
                    </Masonry>
                </Box>
            </div>
                {/* Summary Section */}
            <div ref={summaryPrint} className=" mt-8">
                    <h2 className="text-xl border-b-2 font-bold mb-4">Summary</h2>
                    <ul className="list-disc ml-4">
                        <li><strong>Simple to make:</strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ultricies...</li>
                        <li><strong>Hearty and Satisfying:</strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ultricies...</li>
                        <li><strong>Classic Italian Flavors:</strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ultricies...</li>
                        <li><strong>Kid-Friendly:</strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ultricies...</li>
                    </ul>
            </div>
                {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 w-[70%]">
                <button className="bg-green-500 w-[40%] text-white py-2 rounded-lg shadow hover:bg-green-600">⬅ Previous</button>
                <button className="bg-green-500 w-[40%] text-white py-2 rounded-lg shadow hover:bg-green-600">Next ➡</button>
            </div>
            {/* Comments Section */}
            <div className="mt-8 w-[65%]">
                <div className="flex justify-between border-b-2 items-center mb-4">
                    <h2 className="text-2xl font-bold">Comments</h2>
                    <a href="#" className="text-sm text-blue-500 hover:underline">View all</a>
                </div>
                <div className="space-y-6">
                {/* Individual comment */}
                    {comments?.map((comment, index) => (
                    <div key={index} className="border-b pb-4">
                        <div className="flex items-center space-x-2 justifty-start">
                            <img
                            src={comment.image}
                            alt="user avatar"
                            className="w-6 h-6 rounded-full"
                            />
                            <h3 className="text-lg font-semibold">{comment.author}</h3>
                        </div>
                        <p className="mb-2 ml-4">{comment.text}</p>

                        {/* Replies to this comment (if any) */}
                        <div className="flex space-x-4 ml-4 text-gray-500 text-sm mt-2">
                        <button className="flex items-center space-x-1">
                            <span>❤️</span>
                            <span>12</span>
                        </button>
                        <button
                            className="flex items-center space-x-1"
                            onClick={() => handleReply(comment.id || index)}
                        >
                            <span>💬</span>
                            <span>{comment.replies?.length || 0}</span>
                        </button>
                        </div>
                        {replies[comment.id || index] && (
                        <div>
                            {/* Display existing replies */}
                            {comment.replies?.map((reply, replyIndex) => (
                            <div key={replyIndex} className="ml-8">
                            <p className="italic text-gray-500">{reply}</p>
                            </div>
                            ))}
                            <div className="flex items-center w-full space-x-2">
                                <input
                                className="ml-8 w-2/3 p-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                                placeholder="Reply..."
                                onChange={(e) => setReply(e.target.value)}
                                />
                                <button type="submit" className="bg-black p-1 rounded-md text-white" onClick={() => handleReplySubmit(comment.id || index, reply)}>Reply</button>
                            </div>
                        </div>
                        )}
                        
                    </div>
                    ))}
                    {/* New Comment Input */}
                    <div className="pt-4 flex items-center">
                        <input
                            className="ml-4 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Add a comment..."
                            onChange={(e) => setNewComment(e.target.value)}
                            value={newComment}
                        />
                        <button 
                         type="submit"
                         onClick={handleSubmitComment}
                        className="bg-black p-2 rounded-md text-white ml-4">Post</button>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  );
}

export default RecipePage;
