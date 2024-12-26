import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ImageCapture } from './components/ImageCapture';
import { GoalSetting } from './components/GoalSetting';
import { ProgressTracker } from './components/ProgressTracker';
import { Calendar } from './components/Calendar';
import { DayTimer } from './components/DayTimer';
import { EnhancedAnalysisResult } from './components/analysis/EnhancedAnalysisResult';
import { PricingPage } from './components/pricing/PricingPage';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { analyzeImage } from './services/gemini';
import { EnhancedFoodAnalysis } from './types/analysis';
import { DayProgress } from './types';

function App() {
  const [analysis, setAnalysis] = useState<EnhancedFoodAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState<Record<string, DayProgress>>({});

  const handleImageCapture = async (imageData: string) => {
    try {
      setIsAnalyzing(true);
      const result = await analyzeImage(imageData);
      setAnalysis(result);
      
      // Update progress for the current day
      const today = new Date().toISOString().split('T')[0];
      const currentProgress = progress[today] || {
        date: today,
        achieved: false,
        meals: [],
        totalMacros: { calories: 0, protein: 0, fat: 0, carbs: 0 }
      };

      const newMeal = {
        id: Date.now().toString(),
        date: today,
        timestamp: Date.now(),
        description: result.description,
        macros: result.macros
      };

      const updatedProgress = {
        ...currentProgress,
        meals: [...currentProgress.meals, newMeal],
        totalMacros: {
          calories: currentProgress.totalMacros.calories + result.macros.calories,
          protein: currentProgress.totalMacros.protein + result.macros.protein,
          fat: currentProgress.totalMacros.fat + result.macros.fat,
          carbs: currentProgress.totalMacros.carbs + result.macros.carbs
        }
      };

      setProgress(prev => ({
        ...prev,
        [today]: updatedProgress
      }));
    } catch (error) {
      console.error('Error analyzing image:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route
          path="/"
          element={
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-8">
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Track Your Progress</h2>
                    <DayTimer />
                    <div className="mt-6">
                      <ImageCapture onImageCapture={handleImageCapture} />
                      <EnhancedAnalysisResult analysis={analysis} isLoading={isAnalyzing} />
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <Calendar
                      month={new Date().getMonth()}
                      year={new Date().getFullYear()}
                      progress={progress}
                    />
                  </div>
                </div>
                <div className="space-y-8">
                  <GoalSetting
                    onSaveGoals={() => {}}
                    currentGoals={null}
                  />
                  <ProgressTracker
                    currentMacros={analysis?.macros || {
                      calories: 0,
                      protein: 0,
                      fat: 0,
                      carbs: 0
                    }}
                    goals={{
                      calories: 2000,
                      protein: 150,
                      fat: 65,
                      carbs: 250
                    }}
                  />
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;