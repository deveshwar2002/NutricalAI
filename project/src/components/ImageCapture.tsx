import React, { useRef, useState } from 'react';
import { Camera, Upload } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCredits } from '../hooks/useCredits';
import { Link } from 'react-router-dom';

interface ImageCaptureProps {
  onImageCapture: (imageData: string) => void;
}

export const ImageCapture: React.FC<ImageCaptureProps> = ({ onImageCapture }) => {
  const { user } = useAuth();
  const { credits, useCredit } = useCredits();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCapture = async (imageData: string) => {
    if (!user) {
      setError('Please sign in to analyze food images');
      return;
    }

    const canUseCredit = await useCredit();
    if (!canUseCredit && !credits?.isPremium) {
      setError('No credits remaining. Please wait for reset or upgrade to premium.');
      return;
    }

    setError(null);
    onImageCapture(imageData);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleCapture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setShowCamera(true);
      }
    } catch (err) {
      console.error('Error accessing the camera:', err);
      setError('Unable to access the camera. Please check your permissions.');
    }
  };

  const handleCaptureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/png');
        handleCapture(imageData);
        setShowCamera(false);

        // Stop the camera stream
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  };

  if (!user) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-lg">
        <p className="text-gray-600 mb-4">
          Please sign in to start analyzing food images
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="inline-block px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
          >
            Sign Up
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="flex gap-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Upload size={20} />
          Upload Image
        </button>
        <button
          onClick={handleStartCamera}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          <Camera size={20} />
          Take Picture
        </button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {showCamera && (
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full max-w-md rounded-lg"
          />
          <button
            onClick={handleCaptureImage}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Capture
          </button>
        </div>
      )}
    </div>
  );
};