import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import type { UserProfile } from '../types/userProfile';
import NumberSelector from './NumberSelector';
import RangeSelector from './RangeSelector';
import DropdownSelector from './DropdownSelector';

interface PersonalizeFormProps {
  formData: UserProfile;
  handleChange: (field: string, value: number | string) => void;
  handleSubmit: () => void;
  loading: boolean;
}

const PersonalizeForm: React.FC<PersonalizeFormProps> = ({ formData, handleChange, handleSubmit, loading }) => {
  const [selectedField, setSelectedField] = useState<string | null>(null);

  const renderSelector = () => {
    switch (selectedField) {
      case 'age':
        return (
          <NumberSelector
            label="Age"
            value={Number(formData.age)}
            onChange={(value: number) => handleChange('age', value)}
            min={1}
            max={120}
          />
        );
      case 'weight':
        return (
          <NumberSelector
            label="Weight"
            value={Number(formData.weight)}
            onChange={(value: number) => handleChange('weight', value)}
            min={1}
            max={300}
            unit="kg"
          />
        );
      case 'height':
        return (
          <NumberSelector
            label="Height"
            value={Number(formData.height)}
            onChange={(value: number) => handleChange('height', value)}
            min={1}
            max={300}
            unit="cm"
          />
        );
      case 'fitnessGoal':
        return (
          <DropdownSelector
            label="Fitness Goal"
            value={formData.fitnessGoal}
            onChange={(value: string) => handleChange('fitnessGoal', value)}
            options={[
              { value: 'Lose weight', label: 'Lose weight' },
              { value: 'Gain muscle', label: 'Gain muscle' },
              { value: 'Improve fitness', label: 'Improve fitness' },
              { value: 'Maintain health', label: 'Maintain health' },
            ]}
          />
        );
      case 'timesPerWeek':
        return (
          <RangeSelector
            label="Times Per Week"
            value={Number(formData.timesPerWeek)}
            onChange={(value: number) => handleChange('timesPerWeek', value)}
            min={1}
            max={7}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="text-white rounded-lg mb-6">
        <div className="space-y-0">
          {['age', 'weight', 'height', 'fitnessGoal', 'timesPerWeek'].map((field) => (
            <button 
              key={field}
              className="w-full flex justify-between items-center py-4 border-b border-neutral-500"
              onClick={() => setSelectedField(field)}
            >
              <span className="capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</span>
              <span className="flex items-center opacity-70">
                {formData[field as keyof UserProfile]} {field === 'weight' ? 'kg' : field === 'height' ? 'cm' : ''}
                {selectedField === field ? (
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </span>
            </button>
          ))}
        </div>

        {renderSelector()}

        {selectedField && (
          <>
            <button 
              className="bg-white text-black w-full py-2 rounded-full mt-4"
              onClick={() => setSelectedField(null)}
            >
              Confirm
            </button>
            <button 
              className="text-white border border-neutral-500 w-full py-2 rounded-full mt-4"
              onClick={() => setSelectedField(null)}
            >
              Cancel
            </button>
          </>
        )}
      </div>
      {!selectedField && (
        <button
          type="submit"
          className="bg-white text-black px-6 py-4 rounded-full hover:bg-gray-200 transition-colors"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? <LoadingSpinner /> : 'Get Your Fitness Plan'}
        </button>
      )}
    </>
  );
};

export default PersonalizeForm;