import React from "react";
import { userAuth } from "../../contexts/userContext";
import clsx from "clsx";

function Search() {
  const { isSearching } = userAuth();
  return (
    <div
      className={clsx(
        isSearching
          ? "absolute overflow-hidden h-[calc(100vh-5rem)] w-full left-0 right-0 top-[5rem] transform z-20 bg-gray-50 pt-32 mx-auto px-32 duration-700 ease-in-out"
          : "-translate-y-[100vh] duration-300 ease-in-out h-0"
      )}
    >
      <div className="flex flex-col items-center justify-center border-t border-b border-green-950">
        <h1 className="text-stroke text-[calc(12.3rem+5vw)] whitespace-nowrap">
          No Results
        </h1>
      </div>
    </div>
  );
}

export default Search;
