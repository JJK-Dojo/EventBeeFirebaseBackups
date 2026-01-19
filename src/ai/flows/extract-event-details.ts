'use server';
/**
 * @fileOverview An AI flow to extract event details from an image.
 *
 * - extractEventDetails - A function that extracts text from an image.
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

export const ExtractDetailsOutputSchema = z.string().describe("The extracted event description.");
export type ExtractDetailsOutput = z.infer<typeof ExtractDetailsOutputSchema>;

const extractDetailsPrompt = ai.definePrompt({
  name: 'extractDetailsPrompt',
  input: { schema: ExtractDetailsInputSchema },
  output: { schema: z.string() },
  prompt: `You are an expert event assistant. Your task is to analyze the provided image, which is an event poster or flyer. 
  Extract all relevant text from the image. 
  Based on the text and visual elements, write a compelling and concise one-paragraph description for the event. 
  Focus on creating a description that is ready to be used directly in an event listing. Do not include labels like "Description:". Only return the single paragraph of text.
  Image: {{media url=imageDataUri}}`
});

const extractEventDetailsFlow = ai.defineFlow(
  {
    name: 'extractEventDetailsFlow',
    inputSchema: ExtractDetailsInputSchema,
    outputSchema: ExtractDetailsOutputSchema,
  },
  async (input) => {
    const { output } = await extractDetailsPrompt(input);
    return output || '';
  }
);

export async function extractEventDetails(input: ExtractDetailsInput): Promise<ExtractDetailsOutput> {
  return extractEventDetailsFlow(input);
}
