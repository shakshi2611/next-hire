import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import JobList from "./components/jobList";
import SavedJobs from "./components/SavedJobs";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50 pt-16 ">
        <Routes>
          {/* Default Home Route */}
          <Route path="/" element={<Home />} />
          
          {/* Other Routes */}
          <Route path="/jobs" element={<JobList />} />
          <Route path="/savedjobs" element={<SavedJobs />} />
          
          {/* Catch-all route (Optional, redirects unknown paths to Home) */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
