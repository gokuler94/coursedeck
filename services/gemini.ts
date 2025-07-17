
import { GoogleGenAI, Type } from "@google/genai";
import type { RoadmapStep } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("Missing Google Gemini API key.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

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
    const prompt = `Generate a comprehensive, step-by-step learning roadmap for becoming a "${careerGoal}". The roadmap should consist of 5 to 7 distinct milestones, starting from fundamentals and progressing to advanced topics. For each milestone, provide a concise title, a detailed one-paragraph description of the key concepts to learn, and a list of 2-3 highly-rated, recommended online resources like articles, tutorials, or documentation. Ensure each resource includes a title and a valid, full URL.`;

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
    if (error instanceof Error) {
        throw new Error(`Failed to generate roadmap: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the roadmap.");
  }
};