import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { MacroNutrients } from '../types';

interface MacroChartProps {
  macros: MacroNutrients;
}

export const MacroChart: React.FC<MacroChartProps> = ({ macros }) => {
  const data = [
    { name: 'Protein', value: macros.protein * 4, color: '#FF8042' }, // 4 calories per gram
    { name: 'Carbs', value: macros.carbs * 4, color: '#00C49F' }, // 4 calories per gram
    { name: 'Fat', value: macros.fat * 9, color: '#FFBB28' }, // 9 calories per gram
  ];

  return (
    <div className="w-full h-[300px] mt-4">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value} cal`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};