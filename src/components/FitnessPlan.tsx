import React from 'react';
import useFetchFitnessPlan from '../hooks/useFetchFitnessPlan';
import type { UserProfile } from '../types/userProfile';

const FitnessPlan: React.FC = () => {
  const { plan, loading, error, fetchFitnessPlan } = useFetchFitnessPlan();

  const formData: UserProfile = {
    age: 25,
    weight: 70,
    height: 175,
    fitnessGoal: 'building muscle',
    timesPerWeek: 4,
  };

  return (
    <div>
      <button
        onClick={() => fetchFitnessPlan(formData)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            Loading...
          </div>
        ) : (
          'Get Fitness Plan'
        )}
      </button>
      {error && <div className="mt-4 text-red-500">{error}</div>}
      {plan && <div className="mt-4 p-4 rounded">{plan}</div>}
    </div>
  );
};

export default FitnessPlan;