
import { GoogleGenAI, Type } from "@google/genai";
import type { StoryGenerationResult } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const storyGenerationSchema = {
    type: Type.OBJECT,
    properties: {
        title: {
            type: Type.STRING,
            description: "A catchy and short title for the children's story."
        },
        characterDescription: {
            type: Type.STRING,
            description: "A detailed physical description of the main character(s). This description must be used to maintain visual consistency in illustrations. For example: 'A brave little fox named Felix, who has bright orange fur, a fluffy white-tipped tail, and big, curious green eyes.'"
        },
        pages: {
            type: Type.ARRAY,
            description: "An array of 10 story pages.",
            items: {
                type: Type.OBJECT,
                properties: {
                    pageNumber: {
                        type: Type.INTEGER,
                        description: "The page number, from 1 to 10."
                    },
                    text: {
                        type: Type.STRING,
                        description: "The story text for this page. Should be simple and suitable for a young child."
                    },
                    imagePrompt: {
                        type: Type.STRING,
                        description: "A detailed visual prompt for an illustrator for this specific page, describing the scene, character's actions, and emotions. This should NOT repeat the character's physical description."
                    }
                },
                required: ["pageNumber", "text", "imagePrompt"]
            }
        }
    },
    required: ["title", "characterDescription", "pages"]
};

export const generateStoryAndPrompts = async (topic: string): Promise<StoryGenerationResult> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Create a children's story about: ${topic}`,
            config: {
                systemInstruction: "You are a creative storyteller for children. Your task is to generate a complete picture book story based on a user's idea. First, create a detailed, consistent description of the main character(s). Then, write a title and a 10-page story. For each page, provide a short, simple story text (2-3 sentences) and a detailed visual prompt for an illustrator. The visual prompt should describe the scene, the character's actions, and emotions. Ensure the character description is detailed enough to be used for consistent image generation. Respond only in the requested JSON format.",
                responseMimeType: "application/json",
                responseSchema: storyGenerationSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const storyData = JSON.parse(jsonText) as StoryGenerationResult;
        
        if (!storyData.pages || storyData.pages.length !== 10) {
            throw new Error("AI did not generate the required 10 pages. Please try again.");
        }
        
        return storyData;

    } catch (error) {
        console.error("Error generating story:", error);
        throw new Error("Failed to generate the story. The AI may be experiencing issues. Please try a different topic or try again later.");
    }
};

export const generateImage = async (pagePrompt: string, stylePrompt: string, characterDescription: string): Promise<string> => {
    try {
        const fullPrompt = `${stylePrompt}. ${characterDescription}. ${pagePrompt}`;

        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: fullPrompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: '1:1',
            },
        });

        if (!response.generatedImages || response.generatedImages.length === 0) {
            throw new Error("No image was generated.");
        }

        const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
        return `data:image/jpeg;base64,${base64ImageBytes}`;

    } catch (error) {
        console.error("Error generating image:", error);
        throw new Error("Failed to generate an illustration. The AI may be experiencing issues. Please try again later.");
    }
};
