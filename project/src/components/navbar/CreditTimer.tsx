import React, { useState, useEffect } from 'react';
import { useCredits } from '../../hooks/useCredits';

interface CreditTimerProps {
  type: 'daily' | 'weekly';
}

export const CreditTimer: React.FC<CreditTimerProps> = ({ type }) => {
  const { getTimeUntilReset } = useCredits();
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateTimer = () => {
      const { daily, weekly } = getTimeUntilReset();
      const ms = type === 'daily' ? daily : weekly;
      
      const hours = Math.floor(ms / (1000 * 60 * 60));
      const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeLeft(`${hours}h ${minutes}m`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [type, getTimeUntilReset]);

  return (
    <span>
      Credits reset in: {timeLeft}
    </span>
  );
};