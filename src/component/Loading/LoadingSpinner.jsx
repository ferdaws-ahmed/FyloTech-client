'use client';

import React from 'react';

/**
 * Custom CSS for spinner animations
 */
const spinnerStyles = `
  @keyframes rotate-outer {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes rotate-inner {
    0% { transform: rotate(360deg); }
    100% { transform: rotate(0deg); }
  }

  @keyframes pulsate-dot {
    0%, 100% { transform: scale(0.8); opacity: 0.7; }
    50% { transform: scale(1.2); opacity: 1; }
  }
`;

/**
 * Dark Theme Loading Spinner with transparent card
 * @param {boolean} fullScreen - Full screen overlay
 * @param {string} message - Optional loading message
 */
const LoadingSpinner = ({ fullScreen = true, message = "Loading..." }) => {

  const containerClasses = fullScreen
    ? "fixed inset-0 flex justify-center items-center bg-gray-900/80 backdrop-blur-sm z-30"
    : "flex justify-center items-center w-full h-full min-h-[150px] bg-gray-800/70";

  const cardClasses = "flex flex-col items-center p-8 bg-transparent border-none rounded-3xl transform transition-all duration-500 sm:p-6 sm:px-8 max-w-sm w-full text-center";

  const messageClasses = "text-xl font-extrabold text-indigo-300 select-none tracking-wide animate-pulse sm:text-lg";
  const subMessageClasses = "text-sm text-gray-400 mt-2";

  return (
    <div className={containerClasses} aria-live="assertive" aria-busy="true">
      <style>{spinnerStyles}</style>

      <div className={cardClasses}>
        {/* Spinner */}
        <div className="relative w-24 h-24 mb-6">
          <div 
            className="absolute inset-0 border-4 border-gray-600 border-dashed rounded-full"
            style={{ animation: 'rotate-outer 3s linear infinite' }}
          ></div>
          <div 
            className="absolute inset-4 border-4 border-gray-500 border-dotted rounded-full"
            style={{ animation: 'rotate-inner 2s linear infinite' }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full shadow-lg"
            style={{ background: 'radial-gradient(circle, #4f46e5, #1e3a8a)', animation: 'pulsate-dot 1.5s ease-in-out infinite' }}
          ></div>
        </div>

        {/* Message */}
        {message && <p className={messageClasses}>{message}</p>}

        {/* Optional Sub-message */}
        {fullScreen && <p className={subMessageClasses}>Please wait while we prepare everything...</p>}
      </div>
    </div>
  );
};

export default LoadingSpinner;
