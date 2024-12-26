import React from 'react';
import { DailyGoals, MacroNutrients } from '../types';

interface ProgressTrackerProps {
  currentMacros: MacroNutrients;
  goals: DailyGoals;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ currentMacros, goals }) => {
  const calculateProgress = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Today's Progress</h2>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Calories</span>
            <span className="text-sm text-gray-600">{currentMacros.calories} / {goals.calories}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${calculateProgress(currentMacros.calories, goals.calories)}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Protein</span>
            <span className="text-sm text-gray-600">{currentMacros.protein}g / {goals.protein}g</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: `${calculateProgress(currentMacros.protein, goals.protein)}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Fat</span>
            <span className="text-sm text-gray-600">{currentMacros.fat}g / {goals.fat}g</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-yellow-600 h-2.5 rounded-full"
              style={{ width: `${calculateProgress(currentMacros.fat, goals.fat)}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Carbs</span>
            <span className="text-sm text-gray-600">{currentMacros.carbs}g / {goals.carbs}g</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-red-600 h-2.5 rounded-full"
              style={{ width: `${calculateProgress(currentMacros.carbs, goals.carbs)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};