import React from 'react';
import { GlycemicInfo } from '../../types/analysis';
import { Activity } from 'lucide-react';

interface GlycemicInfoCardProps {
  glycemicInfo: GlycemicInfo;
}

export const GlycemicInfoCard: React.FC<GlycemicInfoCardProps> = ({
  glycemicInfo,
}) => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Low':
        return 'text-green-600 bg-green-50';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'High':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold">Glycemic Impact</h3>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-sm text-gray-600">Glycemic Index</p>
            <p className="text-xl font-bold text-blue-600">{glycemicInfo.index}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Glycemic Load</p>
            <p className="text-xl font-bold text-blue-600">{glycemicInfo.load}</p>
          </div>
          <div
            className={`px-3 py-1 rounded-full ${getImpactColor(
              glycemicInfo.impact
            )}`}
          >
            {glycemicInfo.impact} Impact
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Better Alternatives:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {glycemicInfo.alternatives.map((alt, index) => (
              <li key={index}>{alt}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};