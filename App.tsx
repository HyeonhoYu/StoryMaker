
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { IdeaForm } from './components/IdeaForm';
import { LoadingIndicator } from './components/LoadingIndicator';
import { BookViewer } from './components/BookViewer';
import { generateStoryAndPrompts, generateImage } from './services/geminiService';
import { downloadBookAsPDF } from './services/pdfService';
import type { Book, ImageStyle, StoryGenerationResult } from './types';
import { IMAGE_STYLES } from './constants';

const ApiConfigWarning: React.FC = () => (
  <div className="max-w-3xl mx-auto bg-amber-50 border-l-4 border-amber-400 p-6 sm:p-8 rounded-r-lg shadow-lg mb-8" role="alert">
    <div className="flex">
      <div className="py-1">
        <svg className="h-6 w-6 text-amber-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.257 3.099c.636-1.1 2.15-1.1 2.786 0l5.45 9.439c.636 1.1-.124 2.461-1.393 2.461H4.2c-1.269 0-2.029-1.361-1.393-2.461l5.45-9.439zM10 14a1 1 0 110-2 1 1 0 010 2zm-1-4a1 1 0 011-1h.008a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      </div>
      <div>
        <h2 className="font-bold text-amber-800">Configuration Required</h2>
        <p className="text-sm text-amber-700 mt-1">
          The Google Gemini API key is not configured for this application. Story generation is disabled. If you are the developer, please ensure the <code>API_KEY</code> environment variable is available during deployment.
        </p>
      </div>
    </div>
  </div>
);


const App: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<ImageStyle>(IMAGE_STYLES[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [generatedBook, setGeneratedBook] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isApiConfigured, setIsApiConfigured] = useState<boolean>(true);

  useEffect(() => {
    // This check prevents a ReferenceError in browser environments where 'process' is not defined.
    const apiKey = typeof process !== 'undefined' && process.env && process.env.API_KEY;
    if (!apiKey) {
      console.warn("API_KEY environment variable is not set. The application will be in a disabled state.");
      setIsApiConfigured(false);
    }
  }, []);


  const handleGeneration = useCallback(async () => {
    if (!isApiConfigured) {
        setError('API Key is not configured. Please set up the environment.');
        return;
    }
    if (!topic.trim()) {
      setError('Please enter a topic for your story.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedBook(null);

    try {
      // Step 1: Generate Story and Image Prompts
      setLoadingMessage('Brewing up a fantastic story...');
      const storyResult: StoryGenerationResult = await generateStoryAndPrompts(topic);
      
      const pagesWithImages: Book['pages'] = [];

      // Step 2: Generate Cover Image
      setLoadingMessage(`Painting the cover for "${storyResult.title}"...`);
      const coverImagePrompt = `Book cover for a story titled "${storyResult.title}". ${storyResult.characterDescription}`;
      const coverImageUrl = await generateImage(coverImagePrompt, selectedStyle.prompt, storyResult.characterDescription);
      pagesWithImages.push({
        pageNumber: 0, // Cover page
        text: storyResult.title,
        imageUrl: coverImageUrl,
        isCover: true,
      });

      // Step 3: Generate Images for each page
      for (const page of storyResult.pages) {
        setLoadingMessage(`Illustrating page ${page.pageNumber} of 10...`);
        const imageUrl = await generateImage(page.imagePrompt, selectedStyle.prompt, storyResult.characterDescription);
        pagesWithImages.push({
          pageNumber: page.pageNumber,
          text: page.text,
          imageUrl: imageUrl,
          isCover: false,
        });
      }

      setGeneratedBook({
        title: storyResult.title,
        pages: pagesWithImages,
      });

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [topic, selectedStyle, isApiConfigured]);

  const handleDownload = () => {
    if (generatedBook) {
      downloadBookAsPDF(generatedBook.title);
    }
  };

  const handleStartOver = () => {
    setTopic('');
    setGeneratedBook(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-rose-50 text-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {!isApiConfigured && <ApiConfigWarning />}

        {!generatedBook && !isLoading && (
          <IdeaForm
            topic={topic}
            setTopic={setTopic}
            selectedStyle={selectedStyle}
            setSelectedStyle={setSelectedStyle}
            onSubmit={handleGeneration}
            disabled={isLoading || !isApiConfigured}
          />
        )}
        
        {isLoading && <LoadingIndicator message={loadingMessage} />}

        {error && !isLoading && (
          <div className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mt-6" role="alert">
            <strong className="font-bold">Oh no! </strong>
            <span className="block sm:inline">{error}</span>
            <button onClick={() => setError(null)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </button>
          </div>
        )}

        {generatedBook && !isLoading && (
          <BookViewer 
            book={generatedBook} 
            onDownload={handleDownload}
            onStartOver={handleStartOver}
          />
        )}
      </main>
    </div>
  );
};

export default App;
