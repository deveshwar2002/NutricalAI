import React from 'react';

interface AuthButtonProps {
  onClick: () => void;
  type?: 'submit' | 'button';
  children: React.ReactNode;
  className?: string;
}

export const AuthButton: React.FC<AuthButtonProps> = ({ 
  onClick, 
  type = 'button', 
  children,
  className = ''
}) => (
  <button
    type={type}
    onClick={onClick}
    className={`w-full flex justify-center items-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${className}`}
  >
    {children}
  </button>
);