import React, { useEffect } from "react";
import {
  BiLock,
  BiLockOpenAlt,
  BiLogOut,
  BiSearch,
  BiSolidDashboard,
  BiUser,
  BiUserCircle,
} from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { SignedIn, useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { userAuth } from "../../contexts/userContext";
import clsx from "clsx";

const Header = () => {
  const { isSignedIn, isLoaded, loggedInUser } = useUser();
  const {
    isLoggedIn,
    handleLogout,
    isSearching,
    setIsSearching,
    isClerk,
    _user,
  } = userAuth();
  const { signOut } = useClerk();

  const renderNavLink = (to, label, Icon) => (
    <NavLink
      onClick={() => setIsSearching(false)}
      to={to}
      className={({ isActive }) =>
        clsx(
          isActive ? "nav-link-active" : "nav-link",
          Icon && "flex items-center justify-center"
        )
      }
    >
      {Icon && <Icon className="inline-block mr-1" />}
      <span>{label}</span>
    </NavLink>
  );

  const renderDbLogoutButton = () => (
    <NavLink
      to="/"
      onClick={() => {
        setIsSearching(false);
        handleLogout();
      }}
      className="inline-flex group space-x-1 cursor-pointer justify-center items-center border border-cyan-300 hover:border-green-600 duration-300 ease-in-out px-4 py-1.5 rounded-2xl"
    >
      <span className="font-semibold text-sm">logout</span>
      <BiLogOut className="hidden group-hover:block" />
    </NavLink>
  );

  const renderClerkUserButton = () => (
    <SignedIn>
      <div className="flex items-center space-x-1">
        <span className="text-sm font-semibold text-gray-700">
          {_user?.username}
        </span>
        <UserButton
          appearance={{
            elements: {
              userButtonPopoverCard: "mt-2.5 max-w-[15rem]",
              userPreview: "hidden",
              userButtonPopoverFooter: "hidden",
            },
          }}
          className="inline-flex absolute z-20 mr-2"
        />
      </div>
    </SignedIn>
  );

  const renderAuthButton = () => {
    if (isLoggedIn && !isClerk) {
      return renderDbLogoutButton();
    }
    if (isSignedIn && isClerk && isLoggedIn) {
      return renderClerkUserButton();
    }
    return null;
  };

  return (
    <header className="bg-white shadow-md h-[4rem] sticky top-0 z-50 grid items-center">
      <div
        className={clsx(
          "max-w-4xl xl:max-w-[73rem] w-full mx-auto py-3 flex justify-between items-center",
          isSearching ? "" : "overflow-y-hidden"
        )}
      >
        <div className="flex items-center">
          <NavLink
            onClick={() => setIsSearching(false)}
            to="/"
            className="text-[16px] xl:text-[18px] font-bold text-green-600 rounded-full border border-green-600 px-4 py-1 xl:py-1.5"
          >
            RecipeHaven
          </NavLink>
        </div>
        <div className="relative group flex items-center w-[35%] xl:w-[40%]">
          <div
            className={clsx(
              "search absolute overflow-x-hidden top-[calc(100%+6px)] rounded-lg w-full bg-red-300 will-change-auto duration-300 ease-out",
              isSearching ? "h-fit" : "h-0"
            )}
          >
            <div className="content text-sm w-full h-full flex items-center font-semibold p-4 bg-slate-50">
              Enter search Text...
            </div>
          </div>
          <input
            type="text"
            className={clsx(
              "w-full px-4 py-2.5 border rounded-lg text-sm",
              isSearching &&
                "focus:outline-none focus:ring focus:ring-green-400"
            )}
            placeholder="Search..."
            onClick={() => setIsSearching(true)}
          />
          {!isSearching ? (
            <BiSearch
              onClick={() => setIsSearching(true)}
              className="absolute z-20 right-4 text-xl xl:text-2xl group-hover:text-green-600 cursor-pointer"
            />
          ) : (
            <span
              onClick={() => setIsSearching(false)}
              className="absolute z-20 right-4 text-sm xl:text-xl group-hover:text-red-600 cursor-pointer"
            >
              ❌
            </span>
          )}
        </div>
        <nav className="flex items-center space-x-4 [&_a]:text-[13px] xl:[&_a]:text-sm [&_a]:font-semibold capitalize">
          {renderNavLink("/recipes", "Recipes")}
          {renderNavLink("/cooking_tips", "Cooking Tips")}

          {isLoggedIn && (
            <>
              {_user?.isAdmin && (
                <>
                  {renderNavLink("/dashboard", "Dashboard", BiSolidDashboard)}
                </>
              )}
              {renderNavLink("/profile",  _user? _user.username : "Profile", BiUserCircle)}
            </>
          )}

          {!isLoggedIn && (
            <>
              {renderNavLink("/about_us", "About Us")}
              {renderNavLink("/contact_us", "Contact Us")}
              <NavLink
                onClick={() => {
                  setIsSearching(false);
                }}
                to="/auth/login"
                className="inline-flex group space-x-1 cursor-pointer justify-center items-center border border-cyan-300 hover:border-green-600 duration-300 ease-in-out px-4 py-1.5 rounded-2xl"
              >
                <span className="font-semibold text-sm">Sign In</span>
                <BiLock className="group-hover:hidden" />
                <BiLockOpenAlt className="hidden group-hover:flex" />
              </NavLink>
            </>
          )}
          {renderAuthButton()}
        </nav>
      </div>
    </header>
  );
};

export default Header;