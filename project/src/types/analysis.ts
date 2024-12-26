export interface HealthierSubstitution {
  original: string;
  substitution: string;
  benefits: string;
}

export interface MealPairing {
  item: string;
  reason: string;
  nutritionalBenefits: string;
}

export interface GlycemicInfo {
  index: number;
  load: number;
  impact: 'Low' | 'Medium' | 'High';
  alternatives: string[];
}

export interface PostMealTip {
  type: 'exercise' | 'hydration' | 'timing';
  recommendation: string;
  duration?: string;
}

export interface NutritionalWarning {
  type: 'calories' | 'carbs' | 'fat' | 'protein';
  severity: 'low' | 'moderate' | 'high';
  message: string;
  suggestion: string;
}

export interface EnhancedFoodAnalysis extends FoodAnalysis {
  portionSize: {
    amount: number;
    unit: string;
    isEstimated: boolean;
  };
  substitutions: HealthierSubstitution[];
  pairings: MealPairing[];
  glycemicInfo: GlycemicInfo;
  postMealTips: PostMealTip[];
  warnings: NutritionalWarning[];
  culturalInfo?: string;
  healthTips: string[];
}