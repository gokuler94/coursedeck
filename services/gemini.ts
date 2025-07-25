
import { GoogleGenAI, Type } from "@google/genai";
import type { RoadmapStep } from "../types";

// Response schema for validation
const schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING, description: "A concise title for this milestone." },
      description: { type: Type.STRING, description: "A detailed one-paragraph summary of what to learn in this step." },
      resources: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "The title of the recommended learning resource." },
            url: { type: Type.STRING, description: "A valid, full URL to the resource." }
          },
          required: ["title", "url"]
        },
        description: "A list of 2-3 recommended learning resources."
      }
    },
    required: ["title", "description", "resources"]
  }
};

// Initialize API client
const api = new GoogleGenAI({ 
  apiKey: import.meta.env.VITE_GEMINI_API_KEY 
});

// Log configuration
console.log('Gemini API:', {
  mode: import.meta.env.MODE,
  hasKey: !!import.meta.env.VITE_GEMINI_API_KEY,
  isProd: import.meta.env.PROD
});

/**
 * Generates a learning roadmap for a given career goal using the Gemini API.
 * @param careerGoal - The career or skill target to generate a roadmap for
 * @returns A promise resolving to an array of roadmap steps
 */
export const generateRoadmap = async (careerGoal: string): Promise<RoadmapStep[]> => {
  try {
    // Validate environment
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      throw new Error('Missing Gemini API key. Please check your environment configuration.');
    }

    // Generate content
    const prompt = `Generate a comprehensive learning roadmap for becoming a "${careerGoal}" with 5-7 milestones from fundamentals to advanced topics. Each milestone should include a title, detailed description, and 2-3 recommended learning resources with valid URLs.`;

    const response = await api.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    // Parse and validate
    const text = response?.text?.trim();
    if (!text) throw new Error("Empty API response");

    const data = JSON.parse(text);
    if (!Array.isArray(data)) throw new Error("Invalid response format");

    return data as RoadmapStep[];

  } catch (err: unknown) {
    console.error("Roadmap generation error:", err);

    if (err instanceof Error) {
      // Check for API key issues
      if (err.message.includes('API key')) {
        throw new Error('API key configuration error');
      }
      throw new Error(`Generation failed: ${err.message}`);
    }

    throw new Error("Unexpected error during roadmap generation");
  }
};
