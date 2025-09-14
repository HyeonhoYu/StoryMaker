
import React from 'react';
import type { ImageStyle } from '../types';
import { StyleSelector } from './StyleSelector';

interface IdeaFormProps {
  topic: string;
  setTopic: (topic: string) => void;
  selectedStyle: ImageStyle;
  setSelectedStyle: (style: ImageStyle) => void;
  onSubmit: () => void;
  disabled: boolean;
}

const MagicWandIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M11.025 2.265a.75.75 0 011.132.617l.386 1.932a4.126 4.126 0 003.39 3.39l1.933.386a.75.75 0 01.617 1.132l-1.66 2.875a.75.75 0 01-1.074.319l-2.58-1.106a4.124 4.124 0 00-4.45 0l-2.58 1.106a.75.75 0 01-1.073-.319L2.43 9.722a.75.75 0 01.617-1.132l1.933-.386a4.126 4.126 0 003.39-3.39l.386-1.932a.75.75 0 01.81-.617zM15.75 12.75a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008a.75.75 0 01.75-.75h.008zM12 15a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008A.75.75 0 0112 15h.008zM12.75 17.25a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008a.75.75 0 01.75-.75h.008zM15 15.75a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008a.75.75 0 01.75-.75h.008zM17.25 12a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008a.75.75 0 01.75-.75h.008zM18 15a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008a.75.75 0 01.75-.75h.008zM8.25 12.75a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H8.25a.75.75 0 01-.75-.75v-.008a.75.75 0 01.75-.75h.008zM9 15.75a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v-.008a.75.75 0 01.75-.75h.008zM6.75 12a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75v-.008a.75.75 0 01.75-.75h.008zM6 15a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75v-.008a.75.75 0 01.75-.75h.008zM9.75 17.25a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008a.75.75 0 01.75-.75h.008zM11.25 19.5a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008a.75.75 0 01.75-.75h.008z" clipRule="evenodd" />
    </svg>
);


export const IdeaForm: React.FC<IdeaFormProps> = ({ topic, setTopic, selectedStyle, setSelectedStyle, onSubmit, disabled }) => {
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
      <div className="space-y-6">
        <div>
          <label htmlFor="topic" className="block text-lg font-semibold text-gray-700 mb-2">
            1. What's your story about?
          </label>
          <textarea
            id="topic"
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-shadow"
            placeholder="e.g., A curious squirrel who discovers a magical, glowing acorn"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={disabled}
          />
        </div>

        <div>
           <h2 className="block text-lg font-semibold text-gray-700 mb-3">
            2. Choose an illustration style
          </h2>
          <StyleSelector selectedStyle={selectedStyle} onSelectStyle={setSelectedStyle} disabled={disabled} />
        </div>

        <div className="text-center pt-4">
          <button
            onClick={onSubmit}
            disabled={disabled || !topic.trim()}
            className="inline-flex items-center justify-center px-8 py-4 bg-rose-500 text-white font-bold text-xl rounded-full shadow-lg hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-300 transition-all duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105"
          >
            <MagicWandIcon className="w-7 h-7 mr-3" />
            Create My Storybook
          </button>
        </div>
      </div>
    </div>
  );
};
