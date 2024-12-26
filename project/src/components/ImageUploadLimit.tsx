import React from 'react';
import { Link } from 'react-router-dom';

interface ImageUploadLimitProps {
  remainingUploads: number;
}

export const ImageUploadLimit: React.FC<ImageUploadLimitProps> = ({ remainingUploads }) => {
  if (remainingUploads > 0) {
    return (
      <p className="text-sm text-gray-600">
        You have {remainingUploads} free {remainingUploads === 1 ? 'upload' : 'uploads'} remaining
      </p>
    );
  }

  return (
    <div className="text-sm text-gray-600">
      <p>You've reached the limit for free uploads.</p>
      <p>
        Please <Link to="/signup" className="text-blue-600 hover:text-blue-500">sign up</Link> or{' '}
        <Link to="/login" className="text-blue-600 hover:text-blue-500">log in</Link> to continue uploading.
      </p>
    </div>
  );
};