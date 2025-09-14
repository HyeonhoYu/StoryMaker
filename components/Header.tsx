
import React from 'react';

const SparkleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.84 2.84l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.84 2.84l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.84-2.84l-2.846-.813a.75.75 0 010-1.442l2.846-.813a3.75 3.75 0 002.84-2.84l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036a6 6 0 004.355 4.355l1.036.258a.75.75 0 010 1.456l-1.036.258a6 6 0 00-4.355 4.355l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a6 6 0 00-4.355-4.355l-1.036-.258a.75.75 0 010-1.456l1.036-.258a6 6 0 004.355-4.355l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183a4.5 4.5 0 003.424 3.424l1.183.394a.75.75 0 010 1.424l-1.183.394a4.5 4.5 0 00-3.424 3.424l-.394 1.183a.75.75 0 01-1.424 0l-.394-1.183a4.5 4.5 0 00-3.424-3.424l-1.183-.394a.75.75 0 010-1.424l1.183-.394a4.5 4.5 0 003.424-3.424l.394-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" />
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-white/70 backdrop-blur-lg shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <SparkleIcon className="w-8 h-8 text-amber-400 mr-3" />
        <h1 className="text-3xl md:text-4xl font-pacifico text-rose-500">
          Storybook AI Generator
        </h1>
      </div>
    </header>
  );
};
