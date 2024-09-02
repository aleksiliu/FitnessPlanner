import React, { useState } from 'react';
import useFetchFitnessPlan from '../hooks/useFetchFitnessPlan';
import type { UserProfile } from '../types/userProfile';
import FitnessForm from './FitnessForm';
import LoadingSpinner from './LoadingSpinner';

const FitnessPlan: React.FC = () => {
  const { plan, loading, error, fetchFitnessPlan } = useFetchFitnessPlan();
  const [formData, setFormData] = useState<UserProfile>({
    age: '',
    weight: '',
    height: '',
    fitnessGoal: '',
    timesPerWeek: '',
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
      line = line.replace(/\*\*/g, '');
      if (line.toLowerCase().includes('week')) {
        line = line.replace(/week/gi, 'week ');
      }
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
    <div className="p-4 mx-auto text-gray-100">
      {!plan ? (
        <FitnessForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      ) : (
        <div className="mt-4 p-4 rounded bg-slate-800 text-gray-100">
          {renderPlan(plan)}
        </div>
      )}
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

export default FitnessPlan;