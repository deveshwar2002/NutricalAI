import React from 'react';
import { NutritionalWarning } from '../../types/analysis';
import { AlertTriangle } from 'lucide-react';

interface WarningsCardProps {
  warnings: NutritionalWarning[];
}

export const WarningsCard: React.FC<WarningsCardProps> = ({ warnings }) => {
  if (warnings.length === 0) return null;

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-semibold">Nutritional Warnings</h3>
      </div>
      <div className="space-y-4">
        {warnings.map((warning, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              warning.severity === 'high'
                ? 'bg-red-50'
                : warning.severity === 'moderate'
                ? 'bg-yellow-50'
                : 'bg-blue-50'
            }`}
          >
            <h4
              className={`font-medium ${
                warning.severity === 'high'
                  ? 'text-red-700'
                  : warning.severity === 'moderate'
                  ? 'text-yellow-700'
                  : 'text-blue-700'
              }`}
            >
              {warning.type.charAt(0).toUpperCase() + warning.type.slice(1)}
            </h4>
            <p className="text-gray-700 mt-1">{warning.message}</p>
            <p className="text-sm text-gray-600 mt-2">{warning.suggestion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};