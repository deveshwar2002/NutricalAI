import axios from 'axios';
import { FoodAnalysis } from '../types';
import { OpenAIResponse } from '../types/api';
import { API_CONFIG } from '../config/constants';
import { getErrorMessage } from '../utils/errorHandling';

export const analyzeImage = async (imageUrl: string): Promise<FoodAnalysis> => {
  try {
    const response = await axios.post<OpenAIResponse>(
      API_CONFIG.OPENAI_API_URL,
      {
        model: API_CONFIG.OPENAI_MODEL,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analyze this food image and provide the following information in JSON format: description, calories, protein (g), fat (g), and carbs (g).'
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageUrl
                }
              }
            ]
          }
        ],
        max_tokens: 300
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_CONFIG.OPENAI_API_KEY}`
        }
      }
    );

    const content = response.data.choices[0]?.message?.content;
    if (!content) {
      throw new Error('Invalid API response format');
    }

    const parsedContent = JSON.parse(content);
    
    return {
      description: parsedContent.description || 'No description available',
      macros: {
        calories: Number(parsedContent.calories) || 0,
        protein: Number(parsedContent.protein) || 0,
        fat: Number(parsedContent.fat) || 0,
        carbs: Number(parsedContent.carbs) || 0
      }
    };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};