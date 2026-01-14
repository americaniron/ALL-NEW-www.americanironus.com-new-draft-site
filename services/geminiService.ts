
import { GoogleGenAI, Type } from "@google/genai";

// Strictly follow Google GenAI SDK initialization guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getEquipmentRecommendation = async (userPrompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert heavy machinery consultant for American Iron LLC. 
      Recommend specific construction equipment (Excavators, Dozers, Loaders, etc.) for the following job description: 
      "${userPrompt}". 
      Provide your reasoning and suggest 1-2 types of machines. Keep it professional and concise.`,
      config: {
          temperature: 0.7,
          // Removed redundant maxOutputTokens as per guidelines to prevent blocking
      }
    });
    // Property access .text instead of method .text()
    return response.text || "I'm sorry, I couldn't generate a recommendation at this time. Please contact our support team.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm currently undergoing maintenance. Please check our inventory manually or call (850) 777-3797.";
  }
};

export const getShippingQuoteSimulation = async (origin: string, destination: string, weight: number): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Simulate a shipping logistics summary for a heavy equipment part. 
      Origin: ${origin}. Destination: ${destination}. Weight: ${weight}kg. 
      Estimate costs for UPS and DHL. Return a JSON summary of estimated costs and delivery times.`,
      config: {
          responseMimeType: "application/json",
          // Configured responseSchema for reliable structured output
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              ups: {
                type: Type.OBJECT,
                properties: {
                  service: { type: Type.STRING },
                  cost: { type: Type.NUMBER },
                  time: { type: Type.STRING }
                },
                required: ['service', 'cost', 'time']
              },
              dhl: {
                type: Type.OBJECT,
                properties: {
                  service: { type: Type.STRING },
                  cost: { type: Type.NUMBER },
                  time: { type: Type.STRING }
                },
                required: ['service', 'cost', 'time']
              }
            },
            required: ['ups', 'dhl']
          }
      }
    });
    return response.text || "{}";
  } catch (error) {
    console.error("Gemini Shipping Simulation Error:", error);
    return "{}";
  }
};
