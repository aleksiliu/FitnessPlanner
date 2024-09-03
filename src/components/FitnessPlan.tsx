import React, { useEffect, useRef, useState } from 'react';
import useFetchFitnessPlan from '../hooks/useFetchFitnessPlan';
import type { UserProfile } from '../types/userProfile';
import { useTypingAnimation } from '../hooks/useTypingAnimation';
import PlanRenderer from './PlanRenderer';
import PersonalizeForm from './PersonalizeForm';

const FitnessPlan: React.FC = () => {
  const { plan, loading, error, fetchFitnessPlan } = useFetchFitnessPlan();
  const { displayedText, isTyping } = useTypingAnimation(plan || '');
  const [formData, setFormData] = useState<UserProfile>({
    age: 30,
    weight: 70,
    height: 170,
    fitnessGoal: 'Select your goal',
    timesPerWeek: 3,
  });


  return (
    <div className="mx-auto text-gray-100">
      {!plan ? (
        <>
          <PersonalizeForm
          formData={formData}
          handleChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
          handleSubmit={() => fetchFitnessPlan(formData)}
          loading={loading}
        />
      </>
      ) : (
        <div className="mt-4 rounded text-gray-100">
          <PlanRenderer planText={displayedText} isTyping={isTyping} />
        </div>
      )}
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

export default FitnessPlan;