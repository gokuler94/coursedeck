
import { GoogleGenAI, Type } from "@google/genai";
import type { RoadmapStep } from "../types";

// Use import.meta.env for Vite environment variables
const API_KEY = process.env.VITE_GEMINI_API_KEY;

console.log('Environment:', {
  isDev: import.meta.env.DEV,
  mode: import.meta.env.MODE,
  hasKey: !!API_KEY,
  keyPrefix: API_KEY?.substring(0, 4) || 'none'
});

if (!API_KEY) {
  throw new Error("Missing Gemini API key. Please check your environment variables.");
}

// Check for API key in the environment
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
console.log('API Key status:', {
  exists: !!apiKey,
  environment: import.meta.env.MODE || process.env.NODE_ENV,
  keyStart: apiKey?.substring(0, 4) || 'none',
  isProduction: import.meta.env.PROD
});

if (!apiKey) {
  throw new Error(
    `Missing Gemini API key in ${import.meta.env.MODE} environment. ` +
    'Please ensure VITE_GEMINI_API_KEY is set in Vercel environment variables.'
  );
}

// Initialize the API client
const ai = new GoogleGenAI({ apiKey });

// Schema for the roadmap generation
const roadmapSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
          description: "A concise title for this milestone (e.g., 'Mastering the Basics of Python')."
        },
        description: {
          type: Type.STRING,
          description: "A detailed one-paragraph summary of what to learn in this step."
        },
        resources: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: "The title of the recommended learning resource."
              },
              url: {
                type: Type.STRING,
                description: "A valid, full URL to the resource (e.g., article, tutorial, documentation)."
              }
            },
            required: ["title", "url"]
          },
          description: "A list of 2-3 recommended latest online learning resources which exists and no youtube links."
        }
      },
      required: ["title", "description", "resources"]
    }
};

export const generateRoadmap = async (careerGoal: string): Promise<RoadmapStep[]> => {
  try {
    // Check environment in production
    if (import.meta.env.PROD) {
      console.log('Production environment check:', {
        hasKey: !!import.meta.env.VITE_GEMINI_API_KEY,
        keyLength: import.meta.env.VITE_GEMINI_API_KEY?.length || 0,
        keyPrefix: import.meta.env.VITE_GEMINI_API_KEY?.substring(0, 4) || 'none'
      });
    }

    const prompt = `Generate a comprehensive, step-by-step learning roadmap for becoming a "${careerGoal}". The roadmap should consist of 5 to 7 distinct milestones, starting from fundamentals and progressing to advanced topics. For each milestone, provide a concise title, a detailed one-paragraph description of the key concepts to learn, and a list of 2-3 highly-rated, recommended online resources like articles, tutorials, or documentation. Ensure each resource includes a title and a valid, full URL.`;

    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      throw new Error('Gemini API key is not configured in environment variables');
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: roadmapSchema,
      }
    });
    
    const text = response.text.trim();
    if (!text) {
        throw new Error("API returned an empty response.");
    }

    const parsedResponse = JSON.parse(text);

    // Basic validation
    if (!Array.isArray(parsedResponse)) {
        throw new Error("API response is not an array.");
    }
    
    return parsedResponse as RoadmapStep[];

  } catch (error) {
    console.error("Error generating roadmap:", error);
    
    // Handle API key related errors
    if (typeof error === 'object' && error !== null) {
      const errorObj = error as any;
      if (errorObj.error?.message?.includes('API key expired')) {
        throw new Error('The API key has expired. Please update your Google Gemini API key in the environment variables.');
      }
      if (errorObj.error?.code === 400 && errorObj.error?.message?.includes('API key')) {
        throw new Error('Invalid API key. Please check your Google Gemini API key configuration.');
      }
    }
    
    // Handle other types of errors
    if (error instanceof Error) {
      throw new Error(`Failed to generate roadmap: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while generating the roadmap.");
  }
};