import React from 'react';
import { useCredits } from '../../hooks/useCredits';

export const CreditCounter: React.FC = () => {
  const { credits, loading } = useCredits();
  const DAILY_LIMIT = 3;

  if (loading) return <div className="text-sm text-gray-500">Loading...</div>;
  if (!credits) return null;
  if (credits.isPremium) return null;

  const used = DAILY_LIMIT - credits.count;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Credits:</span>
      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
        {used}/{DAILY_LIMIT}
      </span>
    </div>
  );
};