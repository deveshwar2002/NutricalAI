import React from 'react';
import { MealPairing } from '../../types/analysis';
import { UtensilsCrossed } from 'lucide-react';

interface MealPairingsCardProps {
  pairings: MealPairing[];
}

export const MealPairingsCard: React.FC<MealPairingsCardProps> = ({
  pairings,
}) => (
  <div className="bg-white rounded-xl p-6 shadow-lg">
    <div className="flex items-center gap-2 mb-4">
      <UtensilsCrossed className="w-5 h-5 text-purple-500" />
      <h3 className="text-lg font-semibold">Recommended Pairings</h3>
    </div>
    <div className="space-y-4">
      {pairings.map((pairing, index) => (
        <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
          <h4 className="font-medium text-purple-600">{pairing.item}</h4>
          <p className="text-sm text-gray-600 mt-1">{pairing.reason}</p>
          <p className="text-xs text-gray-500 mt-1">
            {pairing.nutritionalBenefits}
          </p>
        </div>
      ))}
    </div>
  </div>
);