import React, { useRef, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import type { UserProfile } from '../types/userProfile';

interface PersonalizeFormProps {
  formData: UserProfile;
  handleChange: (field: string, value: number | string) => void;
  handleSubmit: () => void;
  loading: boolean;
}

const PersonalizeForm: React.FC<PersonalizeFormProps> = ({ formData, handleChange, handleSubmit, loading }) => {
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);
  const weightInputRef = useRef<HTMLInputElement>(null);
  const heightInputRef = useRef<HTMLInputElement>(null);
  
  const handleFocus = (inputRef: React.RefObject<HTMLInputElement>) => {
    inputRef.current?.focus();
    inputRef.current?.click();
  };

  const renderSelector = () => {
    if (selectedField === 'age') {
      return (
        <div className="bg-white rounded-lg p-4 mt-6">
          <h2 className="text-black text-lg mb-4 text-center">Age</h2>
          <div className="flex items-center justify-center">
            <button 
              className="text-white text-3xl px-4 rounded-full bg-black text-center"
              onClick={() => handleChange('age', Math.max(1, Number(formData.age) - 1))}
            >
              -
            </button>
            <div className="relative">
              <span className="text-black text-5xl mx-4" onClick={() => handleFocus(ageInputRef)}>{formData.age}</span>
              <input
                ref={ageInputRef}
                type="number"
                value={formData.age}
                onChange={(e) => handleChange('age', Number(e.target.value))}
                min="1"
                max="120"
                step="1"
                pattern="\d*"
                inputMode="numeric"
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer focus:outline"
              />
            </div>
            <button 
              className="text-white text-3xl px-4 rounded-full bg-black text-center"
              onClick={() => handleChange('age', Number(formData.age) + 1)}
            >
              +
            </button>
          </div>

        </div>
      );
    }
  
    if (selectedField === 'weight') {
      return (
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-white text-lg mb-4">Weight</h2>
          <div className="flex items-center justify-center">
            <button 
              className="text-white text-3xl px-4"
              onClick={() => handleChange('weight', Math.max(1, Number(formData.weight) - 1))}
            >
              -
            </button>
            <div className="relative">
              <span className="text-white text-5xl mx-4" onClick={() => handleFocus(weightInputRef)}>{formData.weight}</span>
              <input
                ref={weightInputRef}
                type="number"
                value={formData.weight}
                onChange={(e) => handleChange('weight', Number(e.target.value))}
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              />
            </div>
            <button 
              className="text-white text-3xl px-4"
              onClick={() => handleChange('weight', Math.max(1, Number(formData.weight) + 1))}
            >
              +
            </button>
          </div>
          <div className="text-gray-400 text-center mt-2">kg</div>

        </div>
      );
    }
  
    if (selectedField === 'height') {
      return (
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-white text-lg mb-4">Height</h2>
          <div className="flex items-center justify-center">
            <button 
              className="text-white text-3xl px-4"
              onClick={() => handleChange('height', Math.max(1, Number(formData.height) - 1))}
            >
              -
            </button>
            <div className="relative">
              <span className="text-white text-5xl mx-4" onClick={() => handleFocus(heightInputRef)}>{formData.height}</span>
              <input
                ref={heightInputRef}
                type="number"
                value={formData.height}
                onChange={(e) => handleChange('height', Number(e.target.value))}
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              />
            </div>
            <button 
              className="text-white text-3xl px-4"
              onClick={() => handleChange('height', Math.max(1, Number(formData.height) + 1))}
            >
              +
            </button>
          </div>
          <div className="text-gray-400 text-center mt-2">cm</div>

        </div>
      );
    }
  
    if (selectedField === 'fitnessGoal') {
      return (
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-white text-lg mb-4">Fitness Goal</h2>
          <select
            className="w-full bg-gray-700 text-white p-2 rounded-lg"
            value={formData.fitnessGoal}
            onChange={(e) => handleChange('fitnessGoal', e.target.value)}
          >
            <option value="Select your goal">Select your goal</option>
            <option value="Lose weight">Lose weight</option>
            <option value="Gain muscle">Gain muscle</option>
            <option value="Improve fitness">Improve fitness</option>
            <option value="Maintain health">Maintain health</option>
          </select>

        </div>
      );
    }
  
    if (selectedField === 'timesPerWeek') {
      return (
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-white text-lg mb-4">Times Per Week</h2>
          <input
            type="range"
            min="1"
            max="7"
            value={formData.timesPerWeek}
            onChange={(e) => handleChange('timesPerWeek', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="text-white text-center mt-2">{formData.timesPerWeek}</div>
        </div>
      );
    }
  
    return null;
  };

  return (
    <>
    <div className="bg-text-white p-4 mb-6">
      <div className="space-y-4">
        <button 
          className="w-full flex justify-between items-center py-2 border-b border-gray-700"
          onClick={() => setSelectedField('age')}
        >
          <span>Age</span>
          <span>{formData.age}</span>
        </button>
        <button 
          className="w-full flex justify-between items-center py-2 border-b border-gray-700"
          onClick={() => setSelectedField('weight')}
        >
          <span>Weight</span>
          <span>{formData.weight} kg</span>
        </button>
        <button 
          className="w-full flex justify-between items-center py-2 border-b border-gray-700"
          onClick={() => setSelectedField('height')}
        >
          <span>Height</span>
          <span>{formData.height} cm</span>
        </button>
        <button 
          className="w-full flex justify-between items-center py-2 border-b border-gray-700"
          onClick={() => setSelectedField('fitnessGoal')}
        >
          <span>Fitness Goal</span>
          <span>{formData.fitnessGoal}</span>
        </button>
        <button 
          className="w-full flex justify-between items-center py-2 border-b border-gray-700"
          onClick={() => setSelectedField('timesPerWeek')}
        >
          <span>Times Per Week</span>
          <span>{formData.timesPerWeek}</span>
        </button>
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
          className="bg-gray-800 text-white w-full py-2 rounded-full mt-4"
          onClick={() => setSelectedField(null)}
        >
          Cancel
        </button>
        </>
      )}
    </div>
        <button
        type="submit"
        className="bg-white text-black px-6 py-4 rounded-full hover:bg-gray-200 transition-colors"
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? <LoadingSpinner /> : 'Get Your Fitness Plan'}
      </button>
     </>
  );
};

export default PersonalizeForm;