
import React from 'react';

interface LoadingIndicatorProps {
  message: string;
}

const BookIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A9.735 9.735 0 006 21a9.707 9.707 0 005.25-1.533.75.75 0 000-1.329v-3.839a.75.75 0 00-.34-.644c-1.21-.81-1.91-2.126-1.91-3.511V6.75a.75.75 0 00-.75-.75 2.25 2.25 0 00-2.25 2.25v.193a.75.75 0 001.5 0V8.25a.75.75 0 01.75-.75.75.75 0 01.75.75v3.193c0 1.254.558 2.39 1.474 3.167.24.16.466.347.666.552V5.24a.75.75 0 00-.71-.707z" />
        <path d="M12.75 4.533A9.707 9.707 0 0118 3a9.735 9.735 0 013.25.555.75.75 0 01.5.707v14.25a.75.75 0 01-1 .707A9.735 9.735 0 0118 21a9.707 9.707 0 01-5.25-1.533.75.75 0 010-1.329v-3.839a.75.75 0 01.34-.644c1.21-.81 1.91-2.126 1.91-3.511V6.75a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25v.193a.75.75 0 01-1.5 0V8.25a.75.75 0 01-.75-.75.75.75 0 01-.75.75v3.193c0 1.254-.558 2.39-1.474 3.167a5.25 5.25 0 01-.666.552V5.24a.75.75 0 01.71-.707z" />
    </svg>
);


export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message }) => {
  return (
    <div className="text-center p-8 bg-white/50 rounded-lg">
      <div className="flex justify-center items-center mb-4">
        <BookIcon className="w-16 h-16 text-rose-400 animate-pulse" />
      </div>
      <h2 className="text-2xl font-bold text-rose-600 mb-2">Creating Magic...</h2>
      <p className="text-gray-600 font-semibold">{message}</p>
      <div className="w-full bg-rose-100 rounded-full h-2.5 mt-6">
        <div className="bg-rose-400 h-2.5 rounded-full animate-pulse" style={{ width: '100%' }}></div>
      </div>
    </div>
  );
};
