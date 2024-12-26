import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useImageUpload = () => {
  const [uploadCount, setUploadCount] = useState(0);
  const { user } = useAuth();
  const MAX_FREE_UPLOADS = 3;

  const canUpload = () => {
    return user !== null || uploadCount < MAX_FREE_UPLOADS;
  };

  const incrementUpload = () => {
    setUploadCount(prev => prev + 1);
  };

  return {
    uploadCount,
    canUpload,
    incrementUpload,
    remainingUploads: MAX_FREE_UPLOADS - uploadCount
  };
};