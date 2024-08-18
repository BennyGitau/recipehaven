import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import axios from "axios";

const UserContext = createContext();

export const userAuth = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { getToken } = useAuth();
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isClerk, setIsClerk] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [_param, setParam] = useState(null);
  const [_user, setUser] = useState(null);
  const [recipeData, setRecipeData] = useState(null);
  const [formData, setFormData] = useState({
    banner_image: "",
    banner_file: "",
    description: "",
    title: "",
    cuisine: "",
    diet: "",
    prepTime: "",
    cookTime: "",
    servings: "",
    level: "",
    user_id: 0,
    instructions: "",
    ingredients: [],
    other_images: [],
  });

  const headers = useMemo(() => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${Cookies.get("access_token")}`,
  }), [Cookies.get("access_token")]);

  const fetchUserFromDb = async (email) => {
    if (!email) {
      console.error("Invalid email:", email);
      return null;
    }
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/users/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch user");
      const userData = await response.json();
      Cookies.set('access_token', userData.access_token, { expires: 7 });
      return userData
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };

  const handleSetUser = async () => {
    const userFromDb = await fetchUserFromDb(user?.emailAddresses[0].emailAddress || Cookies.get('user'));
    if (userFromDb?.id) {
      setUser(userFromDb);
      setIsLoggedIn(true);
      return userFromDb;
    }
    return null;
  };

  const handleLogin = async (data) => {
    if (!data.email || !data.password) {
    toast.error("Email and Password are required!", { theme: "colored" });
    return;
    }
    try {
      const res = await axios.post("http://127.0.0.1:5000/api/login", data)
      setUser(res.data.user);
      if (res?.data.error) {
        toast.error(res.data.error, { 
          theme: "colored",
          position: toast.POSITION.TOP_RIGHT,
        });
        await handleLogout();
        return;
      }
      if (res?.data.success) {
        toast.success("Login Successful!", { 
            theme: "colored",
        });
        Cookies.set("access_token", res.data.access_token, { expires: 7 });
        Cookies.set("refresh_token", res.data.refresh_token, { expires: 7 });
        Cookies.set("user", res.email, { expires: 7 });
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed!", { theme: "colored" });
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
      toast.error("Password did not match!", { theme: "colored" });
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

    try {
      await axios.post("http://127.0.0.1:5000/api/register", formData );
      setError(null);
      setFormData({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        username: "",
        password_confirmation: "",
      });
      toast.success("Registration Successful", { theme: "colored" });
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed!", { theme: "colored" });
    }
  };

  const handleLogout = async () => {
    if (isClerk) {
      signOut({ redirectUrl: "/auth/login" });
      setIsClerk(false);
    } else {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      Cookies.remove("user");
      setIsLoggedIn(false);
    }
  };

  const handleUserUpdate = async (userData) => {
   try {
     const response = await axios.patch(`http://127.0.0.1:5000/api/profile`, userData, { headers });
     if (response.data.status === 200) {
      setTimeout(() => {
        toast.success(`${userData.firstname} ${userData.lastname} Profile updated successfully`, { theme: "colored" });
      }, 1000)
     }
     setUser(response.data.user);
     return response.data;
   } catch (error) {
     if (error?.response) {
       toast.error(error.response.data.error, { theme: "colored" });
       return error.response;
     }
   }
};

    const handlePostRecipe = async (formData) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
        body: JSON.stringify(formData),
      });
      const res = await response.json();
      if (res?.error) {
        toast.error(res.error, { theme: "colored" });
        return;
      }

      setPostSuccess(!postSuccess);
      toast.success(`${formData.title} Posted Successfully!`, {
        theme: "colored",
      });
    } catch (error) {
      console.error("Post recipe error:", error);
      toast.error("Failed to post recipe!", { theme: "colored" });
    }
  };

  const handleGetAllRecipes = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/recipes")
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleGetSingleRecipe = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/recipes/${id}`, headers)
      setRecipe(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching recipe:", error);
      return null;
    }
  };

  const handleUpdateRecipe = async (id, formData) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/recipes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
        body: JSON.stringify(formData),
      });
      const res = await response.json();

      if (res?.error) {
        toast.error(res.error, { theme: "colored" });
        return;
      }
      setPostSuccess(!postSuccess);
      toast.success(`${formData.title} Updated Successfully!`, {
        theme: "colored",
      });
    } catch (error) {
      console.error("Update recipe error:", error);
      toast.error("Failed to update recipe!", { theme: "colored" });
    }
  };
  const handleGetUserRecipes = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:5000/api/user-recipes', { headers });

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Error fetching user recipes:', response.data);
            return null;
        }
    } catch (error) {
        console.error('Error fetching user recipes:', error);
        return null;
    }
};

  const handleDeleteRecipe = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/api/recipes/${id}`, {headers});
      if (response?.error) {
        toast.error(res.error, { theme: "colored" });
        return;
      }
      setPostSuccess(!postSuccess);
      toast.success(`Recipe Deleted Successfully!`, { theme: "colored" });
    } catch (error) {
      console.error("Delete recipe error:", error);
      toast.error("Failed to delete recipe!", { theme: "colored" });
    }
  };

  const handleAddComment = async (recipeId, commentData) => {
    try {
      const response = await axios.post(`http://127.0.0.1:5000/api/recipes/${recipeId}/comments`,commentData, {headers});
      return response.data;
    } catch (error) {
      console.error("Error adding comment:", error);
      return null;
    }
  };

  const handleAddResponse = async (recipeId, commentId, responseData) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/api/recipes/${recipeId}/comments/${commentId}/responses`,{headers},{text: responseData.text})

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.data;
    } catch (error) {
      console.error("Error adding response:", error);
      return null;
    }
  };

  const handleAddToBookmarks = async (recipe_id) => {
    try {
      if (!recipe_id) {
        toast.error("Didnt find a recipe_id...", recipe_id, { theme: "colored",});
        return;
      }
      const response = await axios.post("http://127.0.0.1:5000/api/bookmarks", {recipe_id}, {headers});
      if (response.status===201) {
        toast.success(" Bookmarked!", { theme: "colored", });
        return ;
      } else {
       toast.error("Failed to bookmark recipe!", { theme: "colored",}); 
       return null;
      }
    } catch (error) {
      console.error("Error adding to bookmarks:", error);
      toast.error(error, { theme: "colored",});
      return null;
    }
  };

  const handleGetUserBookMarks = async () => {
    try {    
      const response = await axios.get(`http://127.0.0.1:5000/api/bookmarks`,{headers})
      return response.data;
    } catch (error) {
      console.error("Error getting bookmarks:", error);
      return null;
    }
  };
  const handleRemoveFromBookMark = async (bookmark_id) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:5000/api/bookmarks/${bookmark_id}`, { headers });
    if (response.status === 200) {
      toast.success("Bookmark deleted!", {
        theme: "colored",
      })
    } 
  } catch (error) {
    toast.error("Failed to delete bookmark!", { theme: "colored",});
  }
};
  const handleAddRating = async (recipeId, ratingData) => {
    try {
      const response = await axios.post(`http://127.0.0.1:5000/api/recipes/${recipeId}/ratings`, ratingData, {headers});
      if (response.status !== 201) {
        throw new Error("Failed to add rating");
      }
      return response.data; 
    } catch (error) {
      console.error("Error adding rating:", error);
      throw error; 
    }
  };

  const handleUpdateRating = async (recipeId, ratingData, ratingId) => {
    try {
      const response = await axios.put(`http://127.0.0.1:5000/api/recipes/${recipeId}/ratings/${ratingId}`,ratingData, {headers});
      if(response.status !== 200) {
        throw new Error("Failed to update rating");
      }
      return response.data; 
    } catch (error) {
      console.error("Error updating rating:", error);
      throw error; 
    }
  };

  useEffect(() => {
    handleGetAllRecipes();
  }, [postSuccess]);

  useEffect(() => {
    if (_param) {
      handleGetSingleRecipe(_param);
    }
  }, [_param, postSuccess]);
const [hasFetchedUser, setHasFetchedUser] = useState(false);
  useEffect(() => {
const initialize = async () => {
      if (isLoaded && isSignedIn && !hasFetchedUser) {
        const token = await getToken();
        if (token) setIsClerk(true);

        const fetchedUser = await handleSetUser();
        if (fetchedUser) {
          setUser(fetchedUser);
          setIsLoggedIn(true);
          setHasFetchedUser(true);
        } else {
          console.log("Clerk User not found in DB, logging out...");
          toast.error("User not found in DB, logging out...", {
            theme: "colored",
            duration: 4000,
          });
          signOut({ redirectUrl: "/recipes" });
        }
      } else if (Cookies.get("access_token")) {
        const dbUser = await handleSetUser();
        if (dbUser) {
          setIsLoggedIn(true);
          setHasFetchedUser(true);
        } else {
          await handleLogout();
        }
      }
    };

    initialize();
  }, [
    isLoaded,
    isSignedIn,
    getToken,
    user,
    hasFetchedUser,
  ]);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isSearching,
        setIsSearching,
        headers,
        handleLogin,
        handleRegister,
        handleLogout,
        handlePostRecipe,
        handleGetAllRecipes,
        handleGetSingleRecipe,
        handleUpdateRecipe,
        handleDeleteRecipe,
        handleUserUpdate,
        handleAddComment,
        handleAddResponse,
        handleAddToBookmarks,
        handleRemoveFromBookMark,
        handleGetUserBookMarks,
        handleGetUserRecipes,
        fetchUserFromDb,
        handleAddRating,
        handleUpdateRating,
        formData,
        setFormData,
        postSuccess,
        setPostSuccess,
        isUpdate,
        setIsUpdate,
        recipeData,
        setRecipeData,
        recipes,
        recipe,
        setParam,
        _param,
        isClerk,
        user,
        _user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};