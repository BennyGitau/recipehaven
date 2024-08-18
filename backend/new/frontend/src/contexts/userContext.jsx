import { useAuth, useUser } from "@clerk/clerk-react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";


const UserContext = createContext();


export const userAuth = () => useContext(UserContext);


export const UserProvider = ({ children }) => {
 const { getToken } = useAuth();
 const { isLoaded, isSignedIn, user } = useUser();


 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [isSearching, setIsSearching] = useState(false);
 const [isClerk, setIsClerk] = useState(false);


 const [postSuccess, setPostSuccess] = useState(false);
 const [recipes, setRecipes] = useState([]);
 const [recipe, setRecipe] = useState(null);
 const [_param, setParam] = useState(null);
 const [_user, setUser] = useState(null);




 const handlSetUser = async () => {
   let userId = user?.emailAddresses[0]?.emailAddress || Cookies.get("user");


   if (user?.emailAddresses[0]?.emailAddress) {
     const clerkUser = {
       fullname: `${user.firstName} ${user.lastName}`,
       image: user.imageUrl || "default_image_url",
       email: user.emailAddresses[0].emailAddress,
     };
     setUser(clerkUser);
     return clerkUser;
   }


   const userFromDb = await getUserFromDb(userId);
   if (userFromDb?.id) {
     const dbUser = {
       fullname: `${userFromDb.firstname} ${userFromDb.lastname}`,
       image: "default_image_url",
       email: userFromDb.email,
     };
     setUser(dbUser);
     return dbUser;
   }


   return null;
 };


 const handleLogin = async (data, setFormData, navigate) => {
   const res = await fetch("http://127.0.0.1:5000/api/login", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(data),
   }).then((res) => res.json());


   if (res?.error) {
     toast.error(res.error, { theme: "colored" });
     return;
   }


   if (res?.success) {
     setTimeout(() => {
       toast.success("Login Successful !", { theme: "colored" });
     }, 1000);


     setFormData(null);
     Cookies.set("access_token", res.access_token, { expires: 7 });
     Cookies.set("refresh_token", res.refresh_token, { expires: 7 });
     Cookies.set("user", data.email, { expires: 7 });


     setIsLoggedIn(true);
     navigate("/recipes");
   }
 };
 const handleRegister = async (formData, setError, setFormData) => {
   if (formData.password !== formData.password_confirmation) {
     setError({
       email: "",
       password: "Password did not match",
       firstname: "",
       lastname: "",
       username: "",
     });
     toast.error("Password did not match !", { theme: "colored" });
     return;
   }


   if (formData.password.length < 8) {
     setError({
       email: "",
       password: "Passwords MUST be at least 8 characters",
       firstname: "",
       lastname: "",
       username: "",
     });
     toast.error("Passwords MUST be at least 8 characters", {
       theme: "colored",
     });
     return;
   }


   await fetch("http://127.0.0.1:5000/api/register", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(formData),
   }).then((res) => res.json());


   setError(null);
   setFormData({
     email: "",
     password: "",
     firstname: "",
     lastname: "",
     username: "",
     password_confirmation: "",
   });
   toast.success("Registration Successful", {
     theme: "colored",
   });
 };


 const handleLogout = async () => {
   setIsLoggedIn(false);
   Cookies.remove("access_token");
   Cookies.remove("refresh_token");
   Cookies.remove("user");
 };


 const handleUserUpdate = async (userData) => {
   try {
     const headers = {
       "Content-Type": "application/json",
       Authorization: `Bearer ${Cookies.get("access_token")}`,
     };
     const response = await axios.patch(`http://127.0.0.1:5000/api/profile/${user?.id}`, userData, { headers });
     const clerkUser = await handlSetUser();
     setUser(clerkUser);
     return response;
   } catch (error) {
     if (error?.response) {
       toast.error(error.response.data.error, { theme: "colored" });
       return error.response;
     }
   }
 };
 const getUserFromDb = async (id) => {
   try {
     const response = await fetch(`http://127.0.0.1:5000/api/users/${id}`, {
       method: "GET",
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${Cookies.get("access_token")}`,
       },
     });
     if (!response.ok) {
       throw new Error("Network response was not ok");
     }
     return await response.json();
   } catch (error) {
     console.error("Error fetching user:", error);
     return {}; // Handle as needed
   }
 };


 const handlePostRecipe = async (formData) => {
   const userId = user?.emailAddresses[0]?.emailAddress || Cookies.get("user");
   const userFromDb = await getUserFromDb(userId);


   if (!userFromDb?.id) {
     return;
   }


   const res = await fetch("http://127.0.0.1:5000/api/recipes", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({ ...formData, user_id: userFromDb?.id }),
   }).then((res) => res.json());


   if (res?.error) {
     toast.error(res.error, { theme: "colored" });
     return;
   }


   setPostSuccess(!postSuccess);
   toast.success(`${formData.title} Posted Successfully !`, {
     theme: "colored",
   });
 };


 const handleGetAllRecipes = async () => {
   const res = await fetch("http://127.0.0.1:5000/api/recipes", {
     method: "GET",
     headers: {
       "Content-Type": "application/json",
     },
   }).then((res) => res.json());


   setRecipes(res);
 };


 const handleGetSingleRecipe = async (id) => {
   try {
     const res = await fetch(`http://127.0.0.1:5000/api/recipes/${id}`, {
       method: "GET",
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${Cookies.get("access_token")}`,
       },
     }).then((res) => res.json());


     setRecipe(res);
     return res;
   } catch (error) {
     console.error("Error fetching recipe:", error);
     return null; // Handle as needed
   }
 };


 useEffect(() => {
   handleGetAllRecipes();
 }, [postSuccess]);


 useEffect(() => {
   if (_param) {
     handleGetSingleRecipe(_param);
   }
 }, [_param]);


 useEffect(() => {
   const initialize = async () => {
     if (isLoaded && isSignedIn) {
       setIsLoggedIn(true);
     } else if (Cookies.get("access_token")) {
       setIsLoggedIn(true);
     }


     const token = await getToken();
     if (token) {
       setIsClerk(true);
     }


     const fetchedUser = await handlSetUser();
     if (fetchedUser) {
       // console.log("Fetched User: ", fetchedUser);
       setUser(fetchedUser);
     }
   };


   initialize();
 }, [isLoaded, isSignedIn, getToken, user]);


 useEffect(() => {
   if (_user) {
     // console.log("_user: ", _user);
   }
 }, [_user]);


 return (
   <UserContext.Provider
     value={{
       isLoggedIn,
       setIsLoggedIn,
       isSearching,
       setIsSearching,
       handleLogin,
       handleRegister,
       handleLogout,
       handlePostRecipe,
       handleGetAllRecipes,
       handleGetSingleRecipe,
       recipes,
       recipe,
       setParam,
       _param,
       isClerk,
       user,
       handleUserUpdate,
       _user,
     }}
   >
     {children}
   </UserContext.Provider>
 );
};
export { UserContext };
