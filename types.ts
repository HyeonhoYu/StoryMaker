
export interface ImageStyle {
  id: string;
  name: string;
  previewUrl: string;
  prompt: string;
}

export interface StoryPage {
  pageNumber: number;
  text: string;
  imagePrompt: string;
}

export interface StoryGenerationResult {
  title: string;
  characterDescription: string;
  pages: StoryPage[];
}

export interface BookPage {
  pageNumber: number;
  text: string;
  imageUrl: string;
  isCover: boolean;
}

export interface Book {
  title: string;
  pages: BookPage[];
}
