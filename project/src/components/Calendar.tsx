import React from 'react';
import { DayProgress } from '../types';

interface CalendarProps {
  month: number;
  year: number;
  progress: Record<string, DayProgress>;
}

export const Calendar: React.FC<CalendarProps> = ({ month, year, progress }) => {
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year);
  const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const getDateString = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">{monthName} {year}</h2>
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-medium text-gray-600 py-2">
            {day}
          </div>
        ))}
        
        {blanks.map(blank => (
          <div key={`blank-${blank}`} className="h-20" />
        ))}
        
        {days.map(day => {
          const dateString = getDateString(day);
          const dayProgress = progress[dateString];
          
          return (
            <div
              key={day}
              className={`h-20 border rounded-lg p-2 ${
                dayProgress
                  ? dayProgress.achieved
                    ? 'bg-green-100 border-green-200'
                    : 'bg-red-100 border-red-200'
                  : 'border-gray-200'
              }`}
            >
              <div className="font-medium">{day}</div>
              {dayProgress && (
                <div className="text-xs mt-1">
                  {dayProgress.meals.length} meals
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};