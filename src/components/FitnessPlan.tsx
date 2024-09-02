import React, { useState } from 'react';
import type { UserProfile } from '../types/userProfile';

const FitnessPlan: React.FC = () => {
  const [plan, setPlan] = useState<string | null>(null);

  const fetchFitnessPlan = async () => {
    const formData: UserProfile = {
      age: 25,
      weight: 70,
      height: 175,
      fitnessGoal: 'building muscle',
    };

    const apiKey = import.meta.env.PUBLIC_RAPIDAPI_KEY;
    console.log('API Key:', apiKey);

    try {
      const response = await fetch('https://exercisedb.p.rapidapi.com/exercises', {
        method: 'GET',
        headers: {
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
          'X-RapidAPI-Key': apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

       // Generate a simple fitness plan using the fetched exercises
       const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
       const weeklyPlan = daysOfWeek.map((day, dayIndex) => {
         const exercises = [];
         for (let i = 0; i < 5; i++) {
           const exercise = data[(dayIndex * 5 + i) % data.length];
           exercises.push(`${exercise.name} (${exercise.bodyPart}, ${exercise.equipment})`);
         }
         return `${day}:\n${exercises.join('\n')}`;
       }).join('\n\n');
 
       const fitnessPlan = `
         Fitness Plan for a ${formData.age}-year-old aiming to ${formData.fitnessGoal}:
         
         - Weight: ${formData.weight}kg
         - Height: ${formData.height}cm
         - Diet: Vegetarian
 
         Weekly Workout Routine:
         ${weeklyPlan}
 
       `;
 
       setPlan(fitnessPlan);
     } catch (error) {
       console.error('Error fetching fitness plan:', error);
     }
   };
 

  return (
    <div className="p-4">
      <button onClick={fetchFitnessPlan} className="bg-blue-500 text-white px-4 py-2 rounded">
        Get Fitness Plan
      </button>
      {plan && <div className="mt-4 p-4 rounded whitespace-pre-line">{plan}</div>}
    </div>
  );
};

export default FitnessPlan;