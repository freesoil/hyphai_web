
import { GoogleGenAI } from "@google/genai";
import { Configuration } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getExpertOpinion = async (config: Configuration): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `As a high-end agricultural engineer specializing in Chinese-manufactured precision equipment, provide a brief (3-4 sentences) technical summary for this configuration:
      Crop: ${config.crop}
      Operation: ${config.operation}
      Power: ${config.power}
      Scale: ${config.scale}
      Soil Type: ${config.soil}
      Special Requirements: ${config.specialRequirements}
      
      Requirements:
      1. Mention why this setup works for ${config.crop}.
      2. Briefly mention a maintenance focus (e.g. grease points, hydraulic seals).
      3. Provide a rough price estimate range (e.g. "$4,500 - $6,200 USD FOB").
      4. End with a consultative tone about the 2-month build window.`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      },
    });

    return response.text || "Your custom configuration is ready for review. This setup is highly optimized for your specified crop and soil conditions.";
  } catch (error) {
    console.error("Error fetching Gemini summary:", error);
    return "Your configuration suggests a robust high-performance setup. We recommend a 15-minute engineering call to finalize the hydraulic specs for your tractor.";
  }
};
