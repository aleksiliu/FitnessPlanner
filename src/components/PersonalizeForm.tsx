import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import type { UserProfile } from '../types/userProfile';
import NumberSelector from './NumberSelector';
import RangeSelector from './RangeSelector';
import DropdownSelector from './DropdownSelector';
import TextAreaInput from './TextAreaInput'; // You'll need to create this component

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
      case 'additionalNotes':
        return (
          <TextAreaInput
            label="Additional Notes"
            value={formData.additionalNotes}
            onChange={(value: string) => handleChange('additionalNotes', value)}
            placeholder="Any specific requirements or health conditions..."
          />
        );
      default:
        return null;
    }
  };

  const fieldIcons = {
/*   age: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
      </svg>
    ),
    weight: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    height: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 3v18M10 4v1m0 3v1m0 3v1m0 3v1m0 3v1M4 20h16M4 4h16" />
      </svg>
    ),
    fitnessGoal: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    timesPerWeek: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ), */
    additionalNotes: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  };

  return (
    <>
      <div className="text-white rounded-lg mb-6">
        <div className="space-y-0">
          {['age', 'weight', 'height', 'fitnessGoal', 'timesPerWeek', 'additionalNotes'].map((field) => (
            <button 
              key={field}
              className="w-full flex justify-between items-center py-4 border-b border-neutral-500"
              onClick={() => setSelectedField(field)}
            >
                 <span className="flex items-center">
                {fieldIcons[field as keyof typeof fieldIcons]}
                <span className="capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</span>
              </span>
            
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
        <div className="flex justify-center mb-2 md:m-0">
        <button
          type="submit"
          className="w-full bg-white text-black py-3 rounded-full hover:bg-gray-200 transition-colors"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? <LoadingSpinner text="Creating your plan..."/> : 'Create your fitness plan'}
        </button>
      </div>
      )}
    </>
  );
};

export default PersonalizeForm;