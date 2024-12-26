export interface MacroNutrients {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface FoodAnalysis {
  description: string;
  macros: MacroNutrients;
}

export interface DailyGoals {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface MealEntry {
  id: string;
  date: string;
  timestamp: number;
  description: string;
  macros: MacroNutrients;
}

export interface DayProgress {
  date: string;
  achieved: boolean;
  meals: MealEntry[];
  totalMacros: MacroNutrients;
}