import React, { useState } from 'react';
import { GoogleIcon } from '../icons/GoogleIcon';

interface GoogleAuthButtonProps {
  onAuth: () => Promise<void>;
}

export const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ onAuth }) => {
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      setError(null);
      await onAuth();
    } catch (err: any) {
      if (err.message?.includes('popup')) {
        setError('Popup blocked. Please enable popups or try a different browser.');
      } else {
        setError(err.message || 'Authentication failed');
      }
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
      >
        <GoogleIcon className="h-5 w-5" />
        Continue with Google
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};