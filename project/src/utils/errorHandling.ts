import { GeminiError } from '../types/api';

export const getErrorMessage = (error: unknown): string => {
  if ((error as GeminiError).message) {
    return (error as GeminiError).message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
};