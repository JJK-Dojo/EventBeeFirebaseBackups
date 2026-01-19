'use server';
/**
 * @fileOverview An AI flow to extract structured event details from an image.
 *
 * - extractEventDetails - A function that extracts structured text from an image.
 */

import { ai } from '../genkit';
import { 
    ExtractDetailsInput, 
    ExtractDetailsInputSchema, 
    ExtractDetailsOutput, 
    ExtractDetailsOutputSchema 
} from '@/ai/schemas';

const extractDetailsPrompt = ai.definePrompt({
    name: 'extractDetailsPrompt',
    model: 'googleai/gemini-pro-vision',
    input: { schema: ExtractDetailsInputSchema },
    // REMOVED: output schema to prevent forcing a mimeType.
    prompt: `You are an expert event assistant. Your task is to analyze the provided image of an event poster or flyer and extract its key details.

    Return ONLY a valid JSON object that conforms to the specified schema.
    
    - title: The main title of the event.
    - date: The date of the event. Extract it exactly as it is written on the flyer.
    - time: The start time of the event. Extract it exactly as it is written.
    - venue: The location or venue of the event.
    - description: Based on all the text and visual elements, write a compelling and concise one-paragraph description for the event. This should be ready to be used directly in an event listing.

    If a field is not present in the image, you must omit it from the JSON response. Do not invent details.

    Image: {{media url=imageDataUri}}`
});

const extractEventDetailsFlow = ai.defineFlow(
    {
      name: 'extractEventDetailsFlow',
      inputSchema: ExtractDetailsInputSchema,
      outputSchema: ExtractDetailsOutputSchema,
    },
    async (flowInput) => {
      try {
        const response = await extractDetailsPrompt(flowInput);
        const responseText = response.text;

        if (!responseText) {
          throw new Error("The AI model returned an empty response.");
        }

        // Models can sometimes wrap the JSON in markdown, so we strip it.
        const jsonText = responseText.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
        
        const parsedJson = JSON.parse(jsonText);

        // If the model returns an empty object, treat it as a failure.
        if (!parsedJson || Object.keys(parsedJson).length === 0) {
          throw new Error("Could not extract any structured details. The image may be unclear or lack event information.");
        }

        // Validate the data against our schema before returning
        return ExtractDetailsOutputSchema.parse(parsedJson);

      } catch (e: any) {
          console.error("Error during Genkit flow execution:", e);
          // Re-throw a more user-friendly error to be caught by the client, including the original error message.
          throw new Error(`The AI model failed to process the image. Reason: ${e.message}`);
      }
    }
);
  
export async function extractEventDetails(input: ExtractDetailsInput): Promise<ExtractDetailsOutput> {
  const result = await extractEventDetailsFlow(input);
  return result;
}
