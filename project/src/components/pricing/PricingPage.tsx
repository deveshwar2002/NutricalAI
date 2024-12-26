import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Target, LineChart, Clock, Crown } from 'lucide-react';

export const PricingPage = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Unlock CalAI to Reach Your Goals Faster
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Take control of your fitness journey with personalized calorie tracking, insights, and reminders.
          </p>
        </div>

        {/* Features */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Feature
              icon={<Camera className="h-6 w-6" />}
              title="Easy Food Scanning"
              description="Track your calories instantly by snapping a picture"
            />
            <Feature
              icon={<Target className="h-6 w-6" />}
              title="Get Your Dream Body"
              description="Simplified tools to make achieving your fitness goals easier"
            />
            <Feature
              icon={<LineChart className="h-6 w-6" />}
              title="Track Your Progress"
              description="Personalized reminders and insights to help you stay on track"
            />
            <Feature
              icon={<Clock className="h-6 w-6" />}
              title="No Commitment"
              description="Flexible subscription plans with no long-term obligation"
            />
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Free Trial */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              <h3 className="text-2xl font-bold text-gray-900">Free Trial</h3>
              <div className="mt-4">
                <p className="text-gray-600">Start your 4-day FREE trial to test all app features.</p>
              </div>
              <Link
                to="/signup"
                className="mt-8 block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Start Free Trial
              </Link>
            </div>
          </div>

          {/* Monthly Plan */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              <h3 className="text-2xl font-bold text-gray-900">Monthly Plan</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-5xl font-extrabold text-gray-900">₹159</span>
                <span className="ml-1 text-xl text-gray-500">/month</span>
              </div>
              <p className="mt-4 text-gray-600">Pay as you go with full flexibility!</p>
              <Link
                to="/signup"
                className="mt-8 block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Choose Monthly
              </Link>
            </div>
          </div>

          {/* Yearly Plan */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-blue-500 relative">
            <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-bl-lg">
              Best Value
            </div>
            <div className="px-6 py-8">
              <h3 className="text-2xl font-bold text-gray-900">Yearly Plan</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-5xl font-extrabold text-gray-900">₹109</span>
                <span className="ml-1 text-xl text-gray-500">/month</span>
              </div>
              <p className="mt-4 text-gray-600">Save 30% with the yearly plan!</p>
              <p className="mt-1 text-sm text-gray-500">Billed as ₹1,308 annually</p>
              <Link
                to="/signup"
                className="mt-8 block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Choose Yearly
              </Link>
            </div>
          </div>
        </div>

        {/* Benefits of Yearly Plan */}
        <div className="mt-20 bg-blue-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Why Choose the Yearly Plan?
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Benefit
              icon={<Crown className="h-6 w-6 text-yellow-500" />}
              title="Save 30%"
              description="Get the best value with our yearly subscription"
            />
            <Benefit
              icon={<Target className="h-6 w-6 text-green-500" />}
              title="Stay Committed"
              description="Make a year-long commitment to your health goals"
            />
            <Benefit
              icon={<Clock className="h-6 w-6 text-blue-500" />}
              title="Peace of Mind"
              description="No monthly renewals to worry about"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Feature: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="text-center">
    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
      {icon}
    </div>
    <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
    <p className="mt-2 text-base text-gray-500">{description}</p>
  </div>
);

const Benefit: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="text-center">
    <div className="flex items-center justify-center mb-4">{icon}</div>
    <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
    <p className="mt-2 text-gray-600">{description}</p>
  </div>
);