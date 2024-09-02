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
  <form onSubmit={handleSubmit} className="space-y-4">
    <FormField label="Age" name="age" type="number" value={formData.age} handleChange={handleChange} />
    <FormField label="Weight (kg)" name="weight" type="number" value={formData.weight} handleChange={handleChange} />
    <FormField label="Height (cm)" name="height" type="number" value={formData.height} handleChange={handleChange} />
    <FormField label="Fitness Goal" name="fitnessGoal" type="select" value={formData.fitnessGoal} handleChange={handleChange} />
    <FormField label="Times Per Week" name="timesPerWeek" type="number" value={formData.timesPerWeek} handleChange={handleChange} />
    <button
      type="submit"
      className="bg-blue-700 text-white px-4 py-2 rounded w-full hover:bg-blue-800"
      disabled={loading}
    >
      {loading ? <LoadingSpinner /> : 'Get Your Fitness Plan'}
    </button>
  </form>
);

export default FitnessForm;