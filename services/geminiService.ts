
import { getAiClient } from '../api/clients';

/**
 * Fast AI response using Gemini Flash Lite
 */
export const getFastRecommendation = async (userPrompt: string): Promise<string> => {
  const ai = getAiClient();
  try {
    const response = await ai.models.generateContent({
      // Corrected alias to match coding guidelines
      model: 'gemini-flash-lite-latest',
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
 * Image Generation with specific aspect ratios and size using Gemini 3 Pro Image
 */
export const generateEquipmentVisual = async (prompt: string, aspectRatio: string, imageSize: string = "1K"): Promise<{imageUrl: string, text: string}> => {
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
          imageSize: imageSize as any
        }
      }
    });

    let imageUrl = "";
    let text = "";

    // Iterate through candidates and parts to find the image, as per image generation guidelines
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
 * Edit Image using Gemini 2.5 Flash Image
 */
export const editEquipmentImage = async (base64Image: string, prompt: string): Promise<{imageUrl: string, text: string}> => {
  const ai = getAiClient();
  try {
    // Extract base64 data and mime type
    const mimeType = base64Image.split(';')[0].split(':')[1];
    const data = base64Image.split(',')[1];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { mimeType, data } },
          { text: `Edit this image: ${prompt}` },
        ],
      },
    });

    let imageUrl = "";
    let text = "";

    // Iterate through candidates and parts to find the image part
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        imageUrl = `data:image/png;base64,${part.inlineData.data}`;
      } else if (part.text) {
        text = part.text;
      }
    }

    return { imageUrl, text };
  } catch (error) {
    console.error("Image Edit Error:", error);
    throw error;
  }
};

/**
 * Animate Image using Veo
 */
export const animateEquipmentImage = async (base64Image: string, aspectRatio: string): Promise<string> => {
  const ai = getAiClient();
  try {
    const mimeType = base64Image.split(';')[0].split(':')[1];
    const data = base64Image.split(',')[1];

    // Video generation using Veo model
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      image: {
        imageBytes: data,
        mimeType: mimeType,
      },
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: aspectRatio as any
      }
    });

    // Polling for video operation completion
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await ai.operations.getVideosOperation({operation: operation});
    }

    const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!videoUri) throw new Error("No video generated");

    // Fetching the generated video using API key
    const response = await fetch(`${videoUri}&key=${process.env.API_KEY}`);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Veo Error:", error);
    throw error;
  }
};

/**
 * Search Grounding using Gemini 3 Flash
 */
export const searchIndustryTrends = async (query: string): Promise<{text: string, sources: any[]}> => {
  const ai = getAiClient();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        tools: [{googleSearch: {}}],
      },
    });
    return {
      text: response.text || "No results found.",
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Search Grounding Error:", error);
    return { text: "Search currently unavailable.", sources: [] };
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

/**
 * Chat Session for the AI Bot
 */
export const createChatSession = () => {
  const ai = getAiClient();
  return ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: "You are the AI Concierge for American Iron LLC, a premier heavy equipment dealer. Your tone is professional, industrial, and authoritative. You assist with heavy equipment inquiries (Excavators, Dozers, Loaders), global shipping logistics, and parts procurement. You verify facts before stating them. Keep responses concise, business-focused, and helpful for enterprise clients. If asked to write or improve text, use high-end corporate industrial language.",
    }
  });
};
