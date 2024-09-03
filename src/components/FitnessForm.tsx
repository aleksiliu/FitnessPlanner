import React from 'react';
import type { UserProfile } from '../types/userProfile';
import FormField from './FormField';
import LoadingSpinner from './LoadingSpinner';

interface FitnessFormProps {
  formData: UserProfile;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

const FitnessForm: React.FC<FitnessFormProps> = ({ formData, handleChange, handleSubmit, loading }) => (
  <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-opacity-80 rounded-lg p-6 space-y-5">

    <FormField label="Age" name="age" type="number" value={formData.age} handleChange={handleChange} />
    <FormField label="Weight (kg)" name="weight" type="number" value={formData.weight} handleChange={handleChange} />
    <FormField label="Height (cm)" name="height" type="number" value={formData.height} handleChange={handleChange} />
    <FormField label="Fitness Goal" name="fitnessGoal" type="select" value={formData.fitnessGoal} handleChange={handleChange} />
    <FormField label="Times Per Week" name="timesPerWeek" type="range" value={formData.timesPerWeek} handleChange={handleChange} min={1} max={7} />
    
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 text-lg font-semibold mt-6"
      disabled={loading}
    >
      {loading ? <LoadingSpinner /> : 'Get Your Fitness Plan'}
    </button>
  </form>
);

export default FitnessForm;