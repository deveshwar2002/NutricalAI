import React from 'react';
import { BookOpen } from 'lucide-react';

interface EducationalCardProps {
  culturalInfo?: string;
  healthTips: string[];
}

export const EducationalCard: React.FC<EducationalCardProps> = ({
  culturalInfo,
  healthTips,
}) => (
  <div className="bg-white rounded-xl p-6 shadow-lg">
    <div className="flex items-center gap-2 mb-4">
      <BookOpen className="w-5 h-5 text-indigo-500" />
      <h3 className="text-lg font-semibold">Food Facts & Tips</h3>
    </div>
    {culturalInfo && (
      <div className="mb-4">
        <h4 className="font-medium text-gray-700 mb-2">Cultural Significance</h4>
        <p className="text-gray-600">{culturalInfo}</p>
      </div>
    )}
    <div>
      <h4 className="font-medium text-gray-700 mb-2">Health Tips</h4>
      <ul className="list-disc list-inside space-y-2">
        {healthTips.map((tip, index) => (
          <li key={index} className="text-gray-600">
            {tip}
          </li>
        ))}
      </ul>
    </div>
  </div>
);