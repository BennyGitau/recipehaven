import React from "react";
import { BiLink } from "react-icons/bi";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full bg-gray-300 text-gray-800 py-12">
      <div className="w-full max-w-4xl xl:max-w-[73rem] mx-auto flex flex-col md:flex-row md:justify-between items-center">
        {/* About Us and Contact Us Links */}
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <Link to="/about_us" className="text-gray-800 hover:text-orange-600 font-semibold transition duration-300">
            About Us
          </Link>
          <Link to="/contact_us" className="text-gray-800 hover:text-orange-600 font-semibold transition duration-300">
            Contact Us
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-6 mt-6 md:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-500 transition duration-300"
          >
            <FaFacebookF size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition duration-300"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:text-pink-500 transition duration-300"
          >
            <FaInstagram size={24} />
          </a>
        </div>
        {/* Footer Bottom */}
        <div className="text-center md:text-right mt-8">
          <p className="font-semibold text-lg">
            All rights reserved &copy; 1900 - {new Date().getFullYear()} (RecipeHaven)
          </p>
          <p className="font-semibold inline-flex items-center justify-center space-x-1 underline underline-offset-4 mt-2 text-gray-800">
            <span>Terms & Conditions</span> <BiLink />
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
