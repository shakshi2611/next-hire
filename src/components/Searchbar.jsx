import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  jobType,
  setJobType,
  location,
  setLocation,
  minSalary,
  setMinSalary,
  industry,
  setIndustry,
  onSearch,
}) => {
  const [searchClicked, setSearchClicked] = useState(false);

  const handleSearch = () => {
    setSearchClicked(true);
    onSearch();
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl lg:rounded-full shadow-lg p-8 mb-8 border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Search Input */}
          <div className="relative col-span-2 sm:col-span-1">
            <FiSearch className="absolute left-4 top-4 text-gray-500" size={18} />
            <input
              type="text"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
              placeholder="Job title or company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Job Type Dropdown */}
          <select
            className="py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 transition-all duration-200"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>

          {/* Location Input */}
          <input
            type="text"
            className="py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 transition-all duration-200"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          {/* Min Salary Input */}
          <input
            type="number"
            className="py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 transition-all duration-200"
            placeholder="Min Salary"
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
          />

          {/* Industry Input */}
          <input
            type="text"
            className="py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 transition-all duration-200"
            placeholder="Industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          />

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 sm:col-span-2 lg:col-span-1 w-full font-medium shadow-md"
          >
            Search
          </button>
        </div>
      </div>

      {/* Job Cards Section (Conditionally Rendered) */}
      {searchClicked && (
        <div className="mt-6">
          {/* Your job card components go here */}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
