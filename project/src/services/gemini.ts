import { GoogleGenerativeAI } from '@google/generative-ai';
import { API_CONFIG } from '../config/constants';
import { EnhancedFoodAnalysis } from '../types/analysis';
import { getErrorMessage } from '../utils/errorHandling';

const genAI = new GoogleGenerativeAI(API_CONFIG.GEMINI_API_KEY);

export const analyzeImage = async (imageData: string): Promise<EnhancedFoodAnalysis> => {
  try {
    const base64Image = imageData.split(',')[1];
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
      Analyze this food image taken from exactly 1 foot away from the plate.
      Consider the perspective and distance when estimating portions.
      Provide a comprehensive analysis including:
      1. Basic nutritional information
      2. Portion size estimation
      3. Healthier substitutions
      4. Meal pairing suggestions
      5. Glycemic impact
      6. Post-meal recommendations
      7. Nutritional warnings
      8. Cultural or educational insights

      Return a JSON object with these exact keys:
      {
        "description": "brief description of the food",
        "calories": number,
        "protein": number (in grams),
        "fat": number (in grams),
        "carbs": number (in grams),
        "portionSize": {
          "amount": number,
          "unit": string,
          "isEstimated": boolean
        },
        "substitutions": [
          {
            "original": string,
            "substitution": string,
            "benefits": string
          }
        ],
        "pairings": [
          {
            "item": string,
            "reason": string,
            "nutritionalBenefits": string
          }
        ],
        "glycemicInfo": {
          "index": number,
          "load": number,
          "impact": "Low" | "Medium" | "High",
          "alternatives": string[]
        },
        "postMealTips": [
          {
            "type": "exercise" | "hydration" | "timing",
            "recommendation": string,
            "duration": string
          }
        ],
        "warnings": [
          {
            "type": "calories" | "carbs" | "fat" | "protein",
            "severity": "low" | "moderate" | "high",
            "message": string,
            "suggestion": string
          }
        ],
        "culturalInfo": string,
        "healthTips": string[]
      }
      Only return the JSON object, no additional text.
    `.trim();

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image
        }
      },
      prompt
    ]);

    const response = await result.response;
    const content = response.text();
    
    try {
      const parsedContent = JSON.parse(content.replace(/```json|```/g, '').trim());
      
      return {
        description: parsedContent.description,
        macros: {
          calories: Number(parsedContent.calories) || 0,
          protein: Number(parsedContent.protein) || 0,
          fat: Number(parsedContent.fat) || 0,
          carbs: Number(parsedContent.carbs) || 0
        },
        portionSize: parsedContent.portionSize,
        substitutions: parsedContent.substitutions,
        pairings: parsedContent.pairings,
        glycemicInfo: parsedContent.glycemicInfo,
        postMealTips: parsedContent.postMealTips,
        warnings: parsedContent.warnings,
        culturalInfo: parsedContent.culturalInfo,
        healthTips: parsedContent.healthTips
      };
    } catch (parseError) {
      console.error('API Response:', content);
      throw new Error('Failed to parse API response');
    }
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};