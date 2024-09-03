import { useState } from 'react';
import type { UserProfile } from '../types/userProfile';

interface ApiResponse {
  candidates: {
    content: {
      parts: { text: string }[];
    };
  }[];
}

const useFetchFitnessPlan = () => {
  const [plan, setPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFitnessPlan = async (formData: UserProfile) => {
    setLoading(true);
    setError(null);

    const prompt = `Create a personalized fitness plan for a ${formData.age}-year-old with the goal of ${formData.fitnessGoal}. They weigh ${formData.weight}kg and are ${formData.height}cm tall. They plan to work out ${formData.timesPerWeek} times per week. Provide only the training plan.`;

    const apiKey = import.meta.env.PUBLIC_GOOGLEAPI_KEY;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      const planText = data.candidates[0].content.parts[0].text;
      setPlan(planText);
    } catch (error) {
      setError('Failed to fetch fitness plan. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return { plan, loading, error, fetchFitnessPlan };
};

export default useFetchFitnessPlan;