import React from 'react';
import { PostMealTip } from '../../types/analysis';
import { Lightbulb } from 'lucide-react';

interface PostMealTipsCardProps {
  tips: PostMealTip[];
}

export const PostMealTipsCard: React.FC<PostMealTipsCardProps> = ({ tips }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg">
    <div className="flex items-center gap-2 mb-4">
      <Lightbulb className="w-5 h-5 text-yellow-500" />
      <h3 className="text-lg font-semibold">Post-Meal Tips</h3>
    </div>
    <div className="space-y-4">
      {tips.map((tip, index) => (
        <div
          key={index}
          className="flex items-start gap-3 border-b border-gray-100 pb-4 last:border-0"
        >
          <div
            className={`p-2 rounded-full ${
              tip.type === 'exercise'
                ? 'bg-green-100'
                : tip.type === 'hydration'
                ? 'bg-blue-100'
                : 'bg-purple-100'
            }`}
          >
            <span className="text-xs font-medium capitalize">{tip.type}</span>
          </div>
          <div>
            <p className="text-gray-700">{tip.recommendation}</p>
            {tip.duration && (
              <p className="text-sm text-gray-500 mt-1">
                Duration: {tip.duration}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);