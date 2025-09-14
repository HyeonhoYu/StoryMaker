
import React from 'react';
import type { ImageStyle } from '../types';
import { IMAGE_STYLES } from '../constants';

interface StyleSelectorProps {
  selectedStyle: ImageStyle;
  onSelectStyle: (style: ImageStyle) => void;
  disabled: boolean;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onSelectStyle, disabled }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      {IMAGE_STYLES.map((style) => (
        <div
          key={style.id}
          onClick={() => !disabled && onSelectStyle(style)}
          className={`
            p-2 border-2 rounded-lg text-center cursor-pointer transition-all duration-200
            ${selectedStyle.id === style.id ? 'border-rose-500 ring-2 ring-rose-300' : 'border-gray-200 hover:border-rose-400'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <img
            src={style.previewUrl}
            alt={style.name}
            className={`w-full h-24 object-cover rounded-md mb-2 ${selectedStyle.id === style.id ? '' : 'grayscale-[50%]'}`}
          />
          <span className="font-semibold text-sm text-gray-700">{style.name}</span>
        </div>
      ))}
    </div>
  );
};
