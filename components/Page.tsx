
import React from 'react';
import type { BookPage } from '../types';

interface PageProps {
  page: BookPage;
  isPdfMode?: boolean;
}

export const Page: React.FC<PageProps> = ({ page, isPdfMode = false }) => {
  if (isPdfMode) {
    return (
        <div className="w-full h-full flex flex-col p-[15mm]">
            <div className="flex-grow flex items-center justify-center mb-4">
                <img src={page.imageUrl} alt={page.isCover ? `Cover for ${page.text}` : `Illustration for page ${page.pageNumber}`} className="max-w-full max-h-full object-contain rounded-lg shadow-lg" />
            </div>
            <p className={`text-center text-gray-800 ${page.isCover ? 'text-4xl font-bold font-pacifico' : 'text-xl'}`}>
                {page.text}
            </p>
            {!page.isCover && (
                <div className="text-center text-lg mt-auto pt-4">{page.pageNumber}</div>
            )}
        </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl w-full h-full flex flex-col">
        <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img 
                src={page.imageUrl} 
                alt={page.isCover ? `Cover for ${page.text}` : `Illustration for page ${page.pageNumber}`}
                className="w-full h-full object-cover"
            />
        </div>
        <div className="text-center flex-grow flex items-center justify-center">
            <p className={`text-gray-800 ${page.isCover ? 'text-2xl sm:text-3xl font-bold font-pacifico' : 'text-base sm:text-lg'}`}>
                {page.text}
            </p>
        </div>
    </div>
  );
};
