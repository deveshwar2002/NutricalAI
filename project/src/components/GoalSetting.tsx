import React, { useState } from 'react';
import { DailyGoals } from '../types';

interface GoalSettingProps {
  onSaveGoals: (goals: DailyGoals) => void;
  currentGoals: DailyGoals | null;
}

export const GoalSetting: React.FC<GoalSettingProps> = ({ onSaveGoals, currentGoals }) => {
  const [goals, setGoals] = useState<DailyGoals>(currentGoals || {
    calories: 2000,
    protein: 150,
    fat: 65,
    carbs: 250
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveGoals(goals);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Set Daily Macro Goals</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Daily Calories
            </label>
            <input
              type="number"
              value={goals.calories}
              onChange={(e) => setGoals(prev => ({ ...prev, calories: Number(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Protein (g)
            </label>
            <input
              type="number"
              value={goals.protein}
              onChange={(e) => setGoals(prev => ({ ...prev, protein: Number(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fat (g)
            </label>
            <input
              type="number"
              value={goals.fat}
              onChange={(e) => setGoals(prev => ({ ...prev, fat: Number(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Carbs (g)
            </label>
            <input
              type="number"
              value={goals.carbs}
              onChange={(e) => setGoals(prev => ({ ...prev, carbs: Number(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="0"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Save Goals
        </button>
      </form>
    </div>
  );
};