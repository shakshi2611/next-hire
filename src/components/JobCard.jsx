// src/components/JobCard.js
import React from "react";
import { 
  BriefcaseIcon,
  BookmarkIcon,
  BookmarkSlashIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  TagIcon,
  LinkIcon,
  CalendarIcon,
  BuildingOfficeIcon
} from "@heroicons/react/24/outline";

const JobCard = ({ job, isSaved, onSave }) => {
  const { 
    title,
    company_name,
    company_logo,
    url,
    salary,
    category,
    tags,
    publication_date,
    candidate_required_location,
    job_type
  } = job;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="group border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out hover:border-blue-100 flex flex-col h-full bg-white">
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <BriefcaseIcon className="h-5 w-5 text-blue-500" />
            <span className="font-semibold text-sm text-gray-700 capitalize">{job_type.replace(/_/g, ' ')}</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
            <TagIcon className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600 text-xs font-medium">{category}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          {/* {company_logo && (
            <img 
              src={company_logo} 
              alt={company_name} 
              className="h-12 w-12 object-contain rounded-lg border p-1"
            />
          )} */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1 hover:text-blue-600 transition-colors">
              {title}
            </h3>
            <p className="text-lg font-semibold text-gray-700">{company_name}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-5 w-5 text-gray-500" />
            <p className="text-gray-600 text-base">{candidate_required_location}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-gray-500" />
            <p className="text-gray-600 text-base">{formatDate(publication_date)}</p>
          </div>
        </div>

        {salary && (
          <div className="flex items-center gap-2 mb-4">
            <CurrencyDollarIcon className="h-5 w-5 text-green-500" />
            <p className="text-gray-800 font-medium">
              Salary: <span className="text-green-600">{salary}</span>
            </p>
          </div>
        )}

        {/* {tags?.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <TagIcon className="h-5 w-5 text-gray-500" />
              <span className="text-gray-600 font-medium">Tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full capitalize"
                >
                  {tag.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          </div>
        )} */}
      </div>

      <div className="mt-6 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
        <button
          onClick={onSave}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
            isSaved 
              ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
        >
          {isSaved ? (
            <>
              <BookmarkSlashIcon className="h-5 w-5" />
              <span>Saved</span>
            </>
          ) : (
            <>
              <BookmarkIcon className="h-5 w-5" />
              <span>Save Job</span>
            </>
          )}
        </button>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          <LinkIcon className="h-5 w-5" />
          <span>Apply Now</span>
        </a>
      </div>
    </div>
  );
};

export default JobCard;