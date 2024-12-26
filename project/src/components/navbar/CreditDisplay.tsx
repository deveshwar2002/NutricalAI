import React from 'react';
import { useCredits } from '../../hooks/useCredits';
import { Clock } from 'lucide-react';
import { CreditTimer } from './CreditTimer'; // Ensure this path is correct

export const CreditDisplay: React.FC = () => {
  const { credits, loading } = useCredits();

  // Handle loading state
  if (loading) {
    return (
      <div className="text-sm text-gray-600">
        Loading credits...
      </div>
    );
  }

  // Handle when credits are not available
  if (!credits) {
    return (
      <div className="text-sm text-red-600">
        Unable to load credit information.
      </div>
    );
  }

  // Render premium membership badge
  if (credits.isPremium) {
    return (
      <div className="flex items-center gap-2">
        <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-sm font-medium">
          Premium Member
        </span>
      </div>
    );
  }

  // Render daily and weekly credits, including the CreditTimer
  return (
    <div className="flex flex-col gap-2 text-sm">
      <div>
        <span className="font-medium">Daily Credits:</span>{' '}
        <span className="text-blue-600">{credits.dailyCredits}</span>
      </div>
      <div>
        <span className="font-medium">Weekly Credits:</span>{' '}
        <span className="text-blue-600">{credits.weeklyCredits}</span>
      </div>
      {(credits.dailyCredits === 0 || credits.weeklyCredits === 0) && (
        <div className="flex items-center gap-1 text-gray-600">
          <Clock className="w-4 h-4" />
          <CreditTimer type={credits.dailyCredits === 0 ? 'daily' : 'weekly'} />
        </div>
      )}
    </div>
  );
};
