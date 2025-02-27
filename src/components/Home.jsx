import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaBriefcase, FaSearch, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 px-4">
      <div className="w-full max-w-[1200px] flex flex-col items-center text-center py-10">
        {/* Header Section */}
        <header className="mb-8 px-4">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 tracking-tight hover:tracking-wide transition-all duration-300">
            Welcome to Job Finder
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 font-light tracking-wide">
            Find the best remote jobs for your career.
          </p>
        </header>

        {/* Call to Action Button */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center group">
          <Link to="/jobs">View Job Listings</Link>
          <AiOutlineArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300 text-xl sm:text-2xl" />
        </button>

        {/* Icons at the Bottom */}
        <div className="mt-10 flex gap-4 sm:gap-6">
          <FaBriefcase className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors duration-300 text-2xl sm:text-3xl" />
          <FaSearch className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors duration-300 text-2xl sm:text-3xl" />
          <FaUser className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors duration-300 text-2xl sm:text-3xl" />
        </div>
      </div>
    </div>
  );
};

export default Home;
