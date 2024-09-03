import React from 'react';

interface PlanRendererProps {
  planText: string;
}

const PlanRenderer: React.FC<PlanRendererProps> = ({ planText }) => {
  const renderPlan = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
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

  return <>{renderPlan(planText)}</>;
};

export default PlanRenderer;