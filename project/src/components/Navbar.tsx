import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CreditCounter } from './navbar/CreditCounter';

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-blue-600">NutricalAI</span>
          </Link>

          <div className="flex items-center space-x-6">
            {user && <CreditCounter />}
            
            <Link
              to="/pricing"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Pricing
            </Link>

            {user ? (
              <button
                onClick={() => logout()}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Logout
              </button>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};