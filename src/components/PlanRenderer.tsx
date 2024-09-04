import React from 'react';

interface PlanRendererProps {
  planText: string;
  isTyping: boolean;
}

const PlanRenderer: React.FC<PlanRendererProps> = ({ planText, isTyping }) => {
  const renderPlan = (text: string) => {
    const sections = text.split('##').filter(section => section.trim() !== '');
    
    return sections.map((section, sectionIndex) => {
      const lines = section.split('\n').filter(line => line.trim() !== '');
      const title = lines.shift()?.trim().replace(/^#\s*/, '');
      
      return (
        <div key={sectionIndex} className="mb-8">
          {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
          <div className="bg-white shadow-md rounded-lg p-6">
            {lines.map((line, lineIndex) => {
              line = line.replace(/\*\*/g, '').trim();
              if (line.toLowerCase().includes('week')) {
                return <h3 key={lineIndex} className="text-xl font-semibold mt-4 mb-2 text-gray-800">{line.replace(/week/gi, 'Week ')}</h3>;
              } else if (line.startsWith('*')) {
                return <li key={lineIndex} className="ml-6 list-disc text-gray-700">{line.replace('*', '').trim()}</li>;
              } else {
                return <p key={lineIndex} className="mt-2 text-gray-600">{line}</p>;
              }
            })}
            {sectionIndex === sections.length - 1 && isTyping && (
              <span className="inline-block w-2 h-4 ml-1 bg-gray-300 animate-blink"></span>
            )}
          </div>
        </div>
      );
    });
  };

  return <div className="max-w-3xl mx-auto">{renderPlan(planText)}</div>;
};

export default PlanRenderer;