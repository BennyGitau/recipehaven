import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

import "./index.css";

/* PAGES */
// CMS
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import ContactusPage from "./pages/ContactUsPage";
import AboutusPage from "./pages/AboutUsPage";
// Auth
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
// Recipes
import RecipesPage from "./pages/RecipesPage";
import RecipePage from "./pages/RecipePage";
import CookingTips from "./pages/CookingTips";
import GetRecipe from "./pages/GetRecipe";
// Dashboard
import DashboardPage from "./pages/dashboard/Index";
import ProfilePage from "./pages/ProfilePage";
import { UserProvider } from "./contexts/userContext";

// Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "auth/register",
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "auth/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth/reset_password",
    element: <ResetPasswordPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cooking_tips",
    element: <CookingTips />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/contact_us",
    element: <ContactusPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about_us",
    element: <AboutusPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/recipes",
    element: <RecipesPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/recipes/:recipe",
    element: <RecipePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/get_recipe",
    element: <GetRecipe />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    errorElement: <ErrorPage />,
  },
]);

// Clerk private key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/" >
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
    </ClerkProvider>
  </React.StrictMode>
);
