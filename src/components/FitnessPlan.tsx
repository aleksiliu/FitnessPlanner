import React, { useState } from 'react';
import useFetchFitnessPlan from '../hooks/useFetchFitnessPlan';
import type { UserProfile } from '../types/userProfile';

const FitnessPlan: React.FC = () => {
  const { plan, loading, error, fetchFitnessPlan } = useFetchFitnessPlan();
  const [formData, setFormData] = useState<UserProfile>({
    age: 0,
    weight: 0,
    height: 0,
    fitnessGoal: '',
    timesPerWeek: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'age' || name === 'weight' || name === 'height' || name === 'timesPerWeek' ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFitnessPlan(formData);
  };


  const renderPlan = (planText: string) => {
    const lines = planText.split('\n').filter(line => line.trim() !== '');
    return lines.map((line, index) => {
      if (line.startsWith('##')) {
        return <h2 key={index} className="text-xl font-bold mt-4">{line.replace('##', '').trim()}</h2>;
      } else if (line.startsWith('*')) {
        return <li key={index} className="ml-4 list-disc">{line.replace('*', '').trim()}</li>;
      } else {
        return <p key={index} className="mt-2">{line}</p>;
      }
    });
  };

  return (
    <div className="p-4 max-w-md mx-auto text-gray-100">
      {!plan ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-100"
              placeholder="Enter your age"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-100"
              placeholder="Enter your weight"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-100"
              placeholder="Enter your height"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Fitness Goal</label>
            <select
              name="fitnessGoal"
              value={formData.fitnessGoal}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-100"
            >
              <option value="" disabled>Select your goal</option>
              <option value="building muscle">Building Muscle</option>
              <option value="losing weight">Losing Weight</option>
              <option value="improving endurance">Improving Endurance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Times Per Week</label>
            <input
              type="number"
              name="timesPerWeek"
              value={formData.timesPerWeek || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-100"
              placeholder="Enter times per week"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-700 text-white px-4 py-2 rounded w-full hover:bg-blue-800"
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
        </form>
      ) : (
        <div className="mt-4 p-4 rounded bg-gray-700 text-gray-100">
         {renderPlan(plan)}
        </div>
      )}
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

export default FitnessPlan;