
import React, { useState } from 'react';
import type { Book } from '../types';
import { Page } from './Page';

interface BookViewerProps {
  book: Book;
  onDownload: () => void;
  onStartOver: () => void;
}

const DownloadIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
    </svg>
);
const RefreshIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-4.5a.75.75 0 00-.75.75v4.5l1.903-1.903a.75.75 0 00-1.06-1.06l-1.903 1.903a4.5 4.5 0 00-6.364-6.364l-1.903-1.903A.75.75 0 004.755 10.06zm9.245 3.89a.75.75 0 00-1.06-1.06l-1.903 1.903a4.5 4.5 0 006.364 6.364l1.903 1.903A.75.75 0 0019.245 19.5l-1.903-1.903a7.5 7.5 0 01-12.548 3.364l-1.903-1.903h4.5a.75.75 0 00.75-.75v-4.5l-1.903 1.903a.75.75 0 001.06 1.06l1.903-1.903z" clipRule="evenodd" />
  </svg>
);

export const BookViewer: React.FC<BookViewerProps> = ({ book, onDownload, onStartOver }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const goToNextPage = () => {
    setCurrentPageIndex((prev) => Math.min(prev + 1, book.pages.length - 1));
  };

  const goToPrevPage = () => {
    setCurrentPageIndex((prev) => Math.max(prev - 1, 0));
  };
  
  const currentPage = book.pages[currentPageIndex];

  return (
    <div className="w-full">
        <h2 className="text-center text-4xl font-pacifico text-rose-500 mb-2">{book.title}</h2>
        <p className="text-center text-gray-500 mb-6">Your magical storybook is ready!</p>
        
        <div className="relative max-w-xl mx-auto">
            <div className="aspect-square">
                <Page page={currentPage} />
            </div>

            {/* Navigation Buttons */}
            {currentPageIndex > 0 && (
                <button 
                    onClick={goToPrevPage}
                    className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-rose-100 transition"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            )}
            {currentPageIndex < book.pages.length - 1 && (
                <button 
                    onClick={goToNextPage}
                    className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-rose-100 transition"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            )}
        </div>
        
        <div className="text-center mt-4 text-gray-600 font-semibold">
            Page {currentPageIndex === 0 ? 'Cover' : `${currentPageIndex} / ${book.pages.length - 1}`}
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button
                onClick={onDownload}
                className="inline-flex items-center justify-center px-6 py-3 bg-teal-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
                <DownloadIcon className="w-6 h-6 mr-2" />
                Download PDF
            </button>
            <button
                onClick={onStartOver}
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
                <RefreshIcon className="w-6 h-6 mr-2" />
                Start Over
            </button>
        </div>

        {/* Hidden element for PDF generation */}
        <div id="book-content-for-pdf" className="fixed -left-[9999px] top-0 opacity-0 pointer-events-none" aria-hidden="true">
            <div style={{ width: '210mm', height: '297mm', position: 'relative' }}>
                {book.pages.map(page => (
                    <div key={`pdf-${page.pageNumber}`} className="pdf-page bg-rose-50 w-full h-full">
                        <Page page={page} isPdfMode={true} />
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};
