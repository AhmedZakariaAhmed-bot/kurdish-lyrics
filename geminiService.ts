
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Ensure API_KEY is available in the environment.
const apiKey = process.env.API_KEY;
if (!apiKey) {
  // This error should ideally be caught and displayed in the UI.
  // For now, it will prevent the service from initializing.
  console.error("API_KEY environment variable is not set.");
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey });
const modelName = 'gemini-2.5-flash-preview-04-17';

export const generateLyricsFromText = async (userInput: string, language: string): Promise<string> => {
  const systemInstruction = `You are a world-class lyricist and songwriter.
Your task is to generate compelling and creative song lyrics in ${language} based on the user's input.
The user's input could be a theme, a story, keywords, a feeling, or a partial idea.
Structure the lyrics with common song elements:
- Verse(s)
- Chorus (often repeated)
- Bridge (optional, but good for variation)
- Outro (optional)
Clearly label each section (e.g., "[Verse 1]", "[Chorus]", "[Bridge]", "[Outro]"). If the target language has its own conventions for such labels (e.g., "بەندی یەکەم", "کۆرس" in Kurdish), use those. Otherwise, use English labels.
The lyrics should be imaginative, emotionally resonant, and maintain a consistent tone or narrative related to the input, all in ${language}.
Avoid generic phrases and strive for vivid imagery and unique expressions in ${language}.
If the input is very short or abstract, use your creativity to expand on it meaningfully in ${language}.
The output should be formatted as plain text with newlines separating lines and sections.
Ensure the entire lyrical output, including section labels if translated, is in ${language}.
Do not add any introductory or concluding remarks outside of the lyrics themselves. Output only the lyrics.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: [{ role: "user", parts: [{text: userInput}] }],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.75, 
        topP: 0.95,
        topK: 40,
      },
    });
    
    const text = response.text;
    if (text) {
      return text.trim();
    } else {
      // Attempt to get more details from the response if available
      const finishReason = response?.candidates?.[0]?.finishReason;
      const safetyRatings = response?.candidates?.[0]?.safetyRatings;
      if (finishReason && finishReason !== "STOP") {
         throw new Error(`Generation stopped due to: ${finishReason}. ${ safetyRatings ? 'Safety ratings: ' + JSON.stringify(safetyRatings) : '' }`);
      }
      throw new Error("Received an empty or incomplete response from the API.");
    }
  } catch (error) {
    console.error("Error generating lyrics with Gemini API:", error);
    if (error instanceof Error) {
      throw new Error(`Gemini API request failed: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the Gemini API.");
  }
};