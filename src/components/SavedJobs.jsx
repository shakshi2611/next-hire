// src/pages/SavedJobs.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiTrash2, FiArrowLeft, FiSearch, FiAlertTriangle,FiBookmark  } from "react-icons/fi";
import JobCard from "../components/JobCard";
import axios from "axios";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirm, setShowConfirm] = useState(null);

  // Load saved jobs and all jobs data
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("https://remotive.com/api/remote-jobs");
        setAllJobs(response.data.jobs);
        
        const savedJobIds = JSON.parse(localStorage.getItem("savedJobs")) || [];
        const savedJobsData = response.data.jobs.filter(job => 
          savedJobIds.includes(job.id)
        );
        
        setSavedJobs(savedJobsData);
      } catch (err) {
        setError("Failed to load saved jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Handle unsave job
  const handleUnsaveJob = (jobId) => {
    const updatedSavedJobs = savedJobs.filter(job => job.id !== jobId);
    setSavedJobs(updatedSavedJobs);
    localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs.map(job => job.id)));
  };

  // Handle clear all saved jobs
  const handleClearAll = () => {
    setSavedJobs([]);
    localStorage.setItem("savedJobs", JSON.stringify([]));
    setShowConfirm(null);
  };

  // Filter saved jobs
  const filteredJobs = savedJobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 flex items-center gap-2">
              <FiBookmark className="text-blue-500" />
              Saved Jobs
            </h1>
            <p className="text-gray-600 mt-2">
              {savedJobs.length} job{savedJobs.length !== 1 && 's'} saved
            </p>
          </div>

          <div className="w-full sm:w-96 relative">
            <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search saved jobs..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3 mb-6"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 p-6 rounded-xl flex items-center gap-4">
            <FiAlertTriangle className="text-red-500 text-2xl flex-shrink-0" />
            <div>
              <h3 className="text-red-800 font-semibold">{error}</h3>
              <p className="text-red-700">Please try refreshing the page</p>
            </div>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <div className="mb-6 text-gray-400 mx-auto">
              <FiBookmark className="text-6xl inline-block" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {searchTerm ? "No matching jobs found" : "No jobs saved yet"}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? "Try adjusting your search" : "Save jobs to view them here"}
            </p>
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <FiArrowLeft /> Browse Jobs
            </Link>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600">
                Showing {filteredJobs.length} of {savedJobs.length} jobs
              </span>
              <button
                onClick={() => setShowConfirm("clear-all")}
                className="flex items-center gap-2 text-red-500 hover:text-red-600"
              >
                <FiTrash2 /> Clear All
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <div key={job.id} className="relative group">
                  <JobCard job={job} isSaved={true} onSave={() => handleUnsaveJob(job.id)} />
                  <button
                    onClick={() => setShowConfirm(job.id)}
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-red-50 text-red-500 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Confirmation Modal */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <div className="text-center mb-4">
                <FiAlertTriangle className="text-red-500 text-4xl mx-auto mb-3" />
                <h3 className="text-xl font-semibold mb-2">
                  {showConfirm === "clear-all" 
                    ? "Clear all saved jobs?" 
                    : "Remove this job?"}
                </h3>
                <p className="text-gray-600">
                  {showConfirm === "clear-all"
                    ? "This will permanently remove all your saved jobs."
                    : "This job will be removed from your saved list."}
                </p>
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowConfirm(null)}
                  className="px-6 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (showConfirm === "clear-all") {
                      handleClearAll();
                    } else {
                      handleUnsaveJob(showConfirm);
                    }
                    setShowConfirm(null);
                  }}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;