import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Search from "./Search";
import { ToastContainer } from "react-toastify";

function Layout({ children }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const root = document.querySelector("#root");

    root.setAttribute(
      "class",
      "flex flex-col justify-between min-h-screen smooth-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-slate-700"
    );
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <>
      <Header />
      {/* <Search /> */}
      <main className="h-full w-full">{children}</main>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />
    </>
  );
}

export default Layout;
