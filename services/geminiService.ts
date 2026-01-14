
import { GoogleGenAI, Type } from "@google/genai";

// Initialize AI client
const getAiClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Fast AI response using Gemini 2.5 Flash Lite
 */
export const getFastRecommendation = async (userPrompt: string): Promise<string> => {
  const ai = getAiClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite-latest',
      contents: `You are a fast-response fleet assistant for American Iron LLC. 
      Briefly advise on: "${userPrompt}". 
      Keep it under 3 sentences.`,
    });
    return response.text || "No recommendation available.";
  } catch (error) {
    console.error("Flash Lite Error:", error);
    return "Quick analysis offline.";
  }
};

/**
 * Complex Strategic Thinking using Gemini 3 Pro Preview
 */
export const getStrategicAnalysis = async (userPrompt: string): Promise<string> => {
  const ai = getAiClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Analyze this complex heavy equipment fleet strategy or maintenance scenario for American Iron LLC: 
      "${userPrompt}". 
      Provide a detailed, multi-step technical analysis and strategic roadmap.`,
      config: {
        thinkingConfig: { thinkingBudget: 32768 }
      }
    });
    return response.text || "Strategic analysis failed.";
  } catch (error) {
    console.error("Pro Thinking Error:", error);
    return "Strategic brain is currently offline.";
  }
};

/**
 * Image Generation with specific aspect ratios using Gemini 3 Pro Image
 */
export const generateEquipmentVisual = async (prompt: string, aspectRatio: string): Promise<{imageUrl: string, text: string}> => {
  const ai = getAiClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: `High-quality industrial photography for American Iron LLC: ${prompt}. Professional, cinematic construction site lighting, realistic detail.` }]
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio as any,
          imageSize: "1K"
        }
      }
    });

    let imageUrl = "";
    let text = "";

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        imageUrl = `data:image/png;base64,${part.inlineData.data}`;
      } else if (part.text) {
        text = part.text;
      }
    }

    return { imageUrl, text };
  } catch (error) {
    console.error("Image Gen Error:", error);
    throw error;
  }
};

/**
 * Location-based search using Google Maps Grounding
 */
export const findLocalService = async (query: string, lat?: number, lng?: number): Promise<{text: string, sources: any[]}> => {
  const ai = getAiClient();
  try {
    const config: any = {
      tools: [{ googleMaps: {} }],
    };

    if (lat !== undefined && lng !== undefined) {
      config.toolConfig = {
        retrievalConfig: {
          latLng: { latitude: lat, longitude: lng }
        }
      };
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Find heavy equipment service centers, parts dealers, or rental yards related to: "${query}". 
      Provide contact info and location highlights.`,
      config
    });

    return {
      text: response.text || "No results found.",
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Maps Grounding Error:", error);
    return { text: "Location services unavailable.", sources: [] };
  }
};

// Existing parts recommendation updated to use Flash for speed
export const getPartsRecommendation = async (query: string): Promise<string> => {
  const ai = getAiClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Expert parts assistant search: "${query}". Provide technical application details.`,
    });
    return response.text || "Part lookup unavailable.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Database under maintenance.";
  }
};
