// src/components/Navbar.js
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX, FiBookmark, FiSearch, FiUser } from "react-icons/fi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Jobs", path: "/jobs" },
    { name: "Saved Jobs", path: "/savedjobs" },
  ];

  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left section */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">NextHire</span>
            </Link>
            
            {/* Desktop navigation */}
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => 
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            {/* Search icon (mobile) */}
            <button className="md:hidden p-2 text-gray-600 hover:text-blue-600">
              <FiSearch className="w-5 h-5" />
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-blue-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>

            {/* Desktop right items */}
            <div className="hidden md:flex md:items-center md:gap-4">
              <button className="p-2 text-gray-600 hover:text-blue-600">
                <FiSearch className="w-5 h-5" />
              </button>
              <Link
                to="/savedjobs"
                className="flex items-center gap-1 p-2 text-gray-600 hover:text-blue-600"
              >
                <FiBookmark className="w-5 h-5" />
                <span className="text-sm">Saved</span>
              </Link>
              <button className="flex items-center gap-1 p-2 text-gray-600 hover:text-blue-600">
                <FiUser className="w-5 h-5" />
                <span className="text-sm">Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-white shadow-lg">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium
                  ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            <div className="border-t pt-2 mt-2">
              <Link
                to="/savedjobs"
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiBookmark className="w-5 h-5" />
                Saved Jobs
              </Link>
              <button className="w-full flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50">
                <FiUser className="w-5 h-5" />
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;