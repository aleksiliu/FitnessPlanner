import React, { useEffect, useRef, useState } from 'react';
import useFetchFitnessPlan from '../hooks/useFetchFitnessPlan';
import type { UserProfile } from '../types/userProfile';
import FitnessForm from './FitnessForm';
import { useTypingAnimation } from '../hooks/useTypingAnimation';
import PlanRenderer from './PlanRenderer';

const FitnessPlan: React.FC = () => {
  const { plan, loading, error, fetchFitnessPlan } = useFetchFitnessPlan();
  const { displayedText, isTyping } = useTypingAnimation(plan || '');
  const [formData, setFormData] = useState<UserProfile>({
    age: '',
    weight: '',
    height: '',
    fitnessGoal: '',
    timesPerWeek: '3',
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

  return (
    <div className="mx-auto text-gray-100">
      {!plan ? (
        <FitnessForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      ) : (
        <div className="mt-4 rounded text-gray-100">
          <PlanRenderer planText={displayedText} />
          {isTyping && <span className="inline-block w-2 h-4 ml-1 bg-gray-100 animate-blink"></span>}
        </div>
      )}
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

export default FitnessPlan;