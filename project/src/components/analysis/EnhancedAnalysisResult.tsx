import React from 'react';
import { EnhancedFoodAnalysis } from '../../types/analysis';
import { MacroChart } from '../MacroChart';
import { SubstitutionsCard } from './SubstitutionsCard';
import { MealPairingsCard } from './MealPairingsCard';
import { GlycemicInfoCard } from './GlycemicInfoCard';
import { PostMealTipsCard } from './PostMealTipsCard';
import { WarningsCard } from './WarningsCard';
import { EducationalCard } from './EducationalCard';

interface EnhancedAnalysisResultProps {
  analysis: EnhancedFoodAnalysis | null;
  isLoading: boolean;
}

export const EnhancedAnalysisResult: React.FC<EnhancedAnalysisResultProps> = ({
  analysis,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="mt-4 space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-100 h-32 rounded-lg" />
        ))}
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div className="mt-4 space-y-6">
      {/* Original Analysis Results */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Nutritional Analysis</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Calories</p>
            <p className="text-2xl font-bold text-blue-600">
              {analysis.macros.calories}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Protein</p>
            <p className="text-2xl font-bold text-green-600">
              {analysis.macros.protein}g
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Carbs</p>
            <p className="text-2xl font-bold text-yellow-600">
              {analysis.macros.carbs}g
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Fat</p>
            <p className="text-2xl font-bold text-red-600">
              {analysis.macros.fat}g
            </p>
          </div>
        </div>
        <MacroChart macros={analysis.macros} />
      </div>

      {/* Portion Size */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Portion Size</h3>
        <p className="text-gray-600">
          {analysis.portionSize.amount} {analysis.portionSize.unit}
          {analysis.portionSize.isEstimated && ' (Estimated)'}
        </p>
      </div>

      {/* Enhanced Analysis Components */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SubstitutionsCard substitutions={analysis.substitutions} />
        <MealPairingsCard pairings={analysis.pairings} />
        <GlycemicInfoCard glycemicInfo={analysis.glycemicInfo} />
        <PostMealTipsCard tips={analysis.postMealTips} />
      </div>

      <WarningsCard warnings={analysis.warnings} />
      <EducationalCard
        culturalInfo={analysis.culturalInfo}
        healthTips={analysis.healthTips}
      />
    </div>
  );
}