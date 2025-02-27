import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./JobCard";
import SearchBar from "./Searchbar";  
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [industry, setIndustry] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(9);
  const [searchClicked, setSearchClicked] = useState(false); // New state

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://remotive.com/api/remote-jobs");
      setJobs(response.data.jobs);
      setSearchClicked(true); // Show jobs only after searching
    } catch (err) {
      setError("Failed to load job listings.");
    } finally {
      setLoading(false);
    }
  };

  // Filter Jobs based on Search & Filters
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (jobType ? job.job_type === jobType : true) &&
    (location ? job.candidate_required_location.toLowerCase().includes(location.toLowerCase()) : true) &&
    (minSalary ? job.salary && parseInt(job.salary) >= parseInt(minSalary) : true) &&
    (industry ? job.category.toLowerCase().includes(industry.toLowerCase()) : true)
  );

  // Pagination Logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 py-8 px-4 sm:px-6">
      <header className="text-center mt-28 mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Find Your <span className="text-blue-600">Next Hire</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover your perfect remote opportunity across thousands of companies
        </p>
      </header>

      {/* Search Bar Component */}
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        jobType={jobType}
        setJobType={setJobType}
        location={location}
        setLocation={setLocation}
        minSalary={minSalary}
        setMinSalary={setMinSalary}
        industry={industry}
        setIndustry={setIndustry}
        onSearch={fetchJobs} // Pass search function
      />

      {/* Show jobs only if search button is clicked */}
      {searchClicked ? (
        loading ? (
          <p className="text-center text-gray-600">Loading jobs...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            {/* Job Listings */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-8">
              <button
                className="p-2 mx-2 border rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <FiChevronLeft />
              </button>
              <span className="mx-4 text-gray-700">
                Page {currentPage} of {Math.ceil(filteredJobs.length / jobsPerPage)}
              </span>
              <button
                className="p-2 mx-2 border rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage >= Math.ceil(filteredJobs.length / jobsPerPage)}
              >
                <FiChevronRight />
              </button>
            </div>
          </>
        )
      ) : (
        <p className="text-center text-gray-500">Search for jobs to see results.</p>
      )}
    </div>
  );
};

export default JobList;
