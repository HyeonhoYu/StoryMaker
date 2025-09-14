
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { IdeaForm } from './components/IdeaForm';
import { LoadingIndicator } from './components/LoadingIndicator';
import { BookViewer } from './components/BookViewer';
import { generateStoryAndPrompts, generateImage } from './services/geminiService';
import { downloadBookAsPDF } from './services/pdfService';
import type { Book, ImageStyle, StoryGenerationResult } from './types';
import { IMAGE_STYLES } from './constants';

const App: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<ImageStyle>(IMAGE_STYLES[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [generatedBook, setGeneratedBook] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGeneration = useCallback(async () => {
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
  }, [topic, selectedStyle]);

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
        {!generatedBook && !isLoading && (
          <IdeaForm
            topic={topic}
            setTopic={setTopic}
            selectedStyle={selectedStyle}
            setSelectedStyle={setSelectedStyle}
            onSubmit={handleGeneration}
            disabled={isLoading}
          />
        )}
        
        {isLoading && <LoadingIndicator message={loadingMessage} />}

        {error && !isLoading && (
          <div className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
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
