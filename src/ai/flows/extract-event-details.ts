'use server';
/**
 * @fileOverview An AI flow to extract structured event details from an image.
 *
 * - extractEventDetails - A function that extracts structured text from an image.
 * - ExtractDetailsInput - The input type for the extractEventDetails function.
 * - ExtractDetailsOutput - The return type for the extractEventDetails function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const ExtractDetailsInputSchema = z.object({
  imageDataUri: z.string().describe(
    "A photo of an event poster or flyer, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
  ),
});
export type ExtractDetailsInput = z.infer<typeof ExtractDetailsInputSchema>;

export const ExtractDetailsOutputSchema = z.object({
  title: z.string().optional().describe('The extracted title of the event.'),
  date: z.string().optional().describe('The extracted date of the event (e.g., "2024-12-25", "Tuesday, Nov 5th").'),
  time: z.string().optional().describe('The extracted time of the event (e.g., "8:00 PM", "14:00").'),
  venue: z.string().optional().describe('The extracted venue or location of the event.'),
  description: z.string().optional().describe('A compelling and concise one-paragraph description generated from the event flyer.'),
});
export type ExtractDetailsOutput = z.infer<typeof ExtractDetailsOutputSchema>;

const extractDetailsPrompt = ai.definePrompt({
  name: 'extractDetailsPrompt',
  input: { schema: ExtractDetailsInputSchema },
  output: { schema: ExtractDetailsOutputSchema },
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
  async (input) => {
    try {
      const { output } = await extractDetailsPrompt(input);
      // If the model returns nothing or an empty object, treat it as a failure.
      if (!output || Object.keys(output).length === 0) {
        throw new Error("Could not extract any structured details. The image may be unclear or lack event information.");
      }
      return output;
    } catch (e: any) {
        console.error("Error during Genkit prompt execution:", e);
        // Re-throw a more user-friendly error to be caught by the client.
        throw new Error("The AI model failed to process the image. Please try again.");
    }
  }
);

export async function extractEventDetails(input: ExtractDetailsInput): Promise<ExtractDetailsOutput> {
  // The flow now contains the try/catch logic, so we can call it directly.
  const result = await extractEventDetailsFlow(input);
  return result;
}
