import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { SignIn, SignUp } from "@clerk/clerk-react";
import clsx from "clsx";
import { useNavigate, NavLink } from "react-router-dom";
import { userAuth } from "../../contexts/userContext";
import bg from "../../assets/imgs/singup-login.jpg";


function LoginPage() {
 const { setIsLoggedIn, isLoggedIn, handleLogin } = userAuth();




 const navigate = useNavigate();
 const [error, setError] = useState(null);
 const [formData, setFormData] = useState({
   email: "",
   password: "",
 });


 const handleChange = (e) => {
   const { id, value } = e.target;
   setFormData((prev) => ({
     ...prev,
     [id]: value,
   }));
 };


 const handleSubmit = (e) => {
   e.preventDefault();
     handleLogin(
       { email: formData.email, password: formData.password },
       setFormData,
       navigate
     );
 };


  return (
       <Layout>
         <div
           className="flex h-screen max-w-screen justify-center items-center bg-cover bg-no-repeat"
           style={{ backgroundImage: `url(${bg})` }}
         >
           <div className="w-[40%] bg-black bg-opacity-60 rounded-xl shadow-xl max-h-screen flex items-center justify-center">
             <div className="w-full mt-2 mb-5 text-white max-w-md">
               <h2 className="text-2xl text-white font-bold mb-4">My Account</h2>
               <div className="mb-6">Home &gt; My Account</div>
               <div className="mb-4 pb-2 border-b-2 border-gray-300 flex justify-between">
                 <button className="font-bold border-b-4 border-white pb-1 p-1 rounded-lg hover:bg-green-500">
                   Sign In
                 </button>
                 <NavLink
                   to="/auth/register"
                   className="hover:bg-green-500 p-1 rounded-lg font-bold"
                 >
                   Register
                 </NavLink>
               </div>
               <form onSubmit={handleSubmit}>
                 <div className="mb-4">
                   <label className="block mb-2" htmlFor="email">
                     Username or email address*
                   </label>
                   <input
                     className="border border-black bg-gray-200 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                     id="email"
                     type="email"
                     name="email"
                     value={formData.email}
                     placeholder="Enter your email"
                     onChange={handleChange}
                   />
                 </div>
                 <div className="mb-4">
                   <label className="block mb-2" htmlFor="password">
                     Password*
                   </label>
                   <input
                     className="border border-black bg-gray-200 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                     id="password"
                     type="password"
                     name="password"
                     value={formData.password}
                     placeholder="Enter your password"
                     onChange={handleChange}
                   />
                 </div>
                 <div className="flex items-center justify-between mb-6">
                   <label className="flex items-center">
                     <input
                       className="form-checkbox h-5 w-5 text-green-600"
                       type="checkbox"
                     />
                     <span className="ml-2">Remember me</span>
                   </label>
                   <a
                     className="inline-block align-baseline border-b-2 border-white font-bold text-sm hover:text-green-500"
                     href="#"
                   >
                     Forgot your Password?
                   </a>
                 </div>
                 <div className="w-full">
                   <button
                     className="bg-green-500 w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                     type="submit"
                   >
                     Submit
                   </button>
                 </div>
               </form>
               <div className="divider flex space-x-2 items-center justify-between mt-2 font-bold text-xs">
                 <span className="flex h-[2px] w-full bg-slate-400"></span>
                 <span>OR</span>
                 <span className="flex h-[2px] w-full bg-slate-400"></span>
               </div>
               <h2 className="text-xl text-gray-200 text-center w-full font-medium">
                 Sign in with
               </h2>
               <div className="socials flex flex-col items-center w-full mx-auto mt-2">
                 <SignIn
                   signInFallbackRedirectUrl={"/recipes"}
                   appearance={{
                     elements: {
                       card: "p-0 h-fit w-full bg-transparent border-none shadow-none",
                       header: "hidden",
                       socialButtons: "gap-6 w-full bg-gray-100",
                       socialButtonsIconButton: "border border-slate-400",
                       socialButtonsProviderIcon: "h-6 w-8",
                       footer: "hidden",
                     },
                   }}
                 />
               </div>
             </div>
           </div>
         </div>
       </Layout>


 );
};
export default LoginPage;

