import React from 'react';
import { FoodAnalysis } from '../types';
import { MacroChart } from './MacroChart';

interface FoodAnalysisResultProps {
  analysis: FoodAnalysis | null;
  isLoading: boolean;
}

export const FoodAnalysisResult: React.FC<FoodAnalysisResultProps> = ({ analysis, isLoading }) => {
  if (isLoading) {
    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="animate-pulse flex space-y-4">
          <div className="space-y-3 w-full">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <h3 className="font-medium text-lg mb-2">Analysis Results</h3>
      <p className="text-gray-700 mb-3">{analysis.description}</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Calories</p>
          <p className="font-bold text-lg">{analysis.macros.calories}</p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Protein</p>
          <p className="font-bold text-lg">{analysis.macros.protein}g</p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Carbs</p>
          <p className="font-bold text-lg">{analysis.macros.carbs}g</p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Fat</p>
          <p className="font-bold text-lg">{analysis.macros.fat}g</p>
        </div>
      </div>
      <MacroChart macros={analysis.macros} />
    </div>
  );
};