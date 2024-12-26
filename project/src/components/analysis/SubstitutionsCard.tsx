import React from 'react';
import { HealthierSubstitution } from '../../types/analysis';
import { Leaf } from 'lucide-react';

interface SubstitutionsCardProps {
  substitutions: HealthierSubstitution[];
}

export const SubstitutionsCard: React.FC<SubstitutionsCardProps> = ({
  substitutions,
}) => (
  <div className="bg-white rounded-xl p-6 shadow-lg">
    <div className="flex items-center gap-2 mb-4">
      <Leaf className="w-5 h-5 text-green-500" />
      <h3 className="text-lg font-semibold">Healthier Alternatives</h3>
    </div>
    <div className="space-y-4">
      {substitutions.map((sub, index) => (
        <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">{sub.original}</span>
            <span className="text-green-600">→</span>
            <span className="font-medium text-green-600">{sub.substitution}</span>
          </div>
          <p className="text-sm text-gray-500">{sub.benefits}</p>
        </div>
      ))}
    </div>
  </div>
);