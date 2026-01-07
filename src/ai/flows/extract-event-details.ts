// src/ai/flows/extract-event-details.ts
'use server';

/**
 * @fileOverview A flow for extracting event details from an image.
 * 
 * - extractEventDetailsFromImage - A function that uses AI to extract event information from an image.
 * - ExtractEventDetailsInput - The input type for the flow.
 * - ExtractEventDetailsOutput - The output type for the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractEventDetailsInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A photo of an event flyer, poster, or screenshot, as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ExtractEventDetailsInput = z.infer<typeof ExtractEventDetailsInputSchema>;

const ExtractEventDetailsOutputSchema = z.object({
  title: z.string().describe('The extracted title of the event. Should be concise.'),
  description: z.string().describe('A detailed description extracted from the event flyer. It can be multi-paragraph.'),
  date: z.string().optional().describe('The suggested date of the event in ISO 8601 format (YYYY-MM-DD), if found.'),
});
export type ExtractEventDetailsOutput = z.infer<typeof ExtractEventDetailsOutputSchema>;


export async function extractEventDetailsFromImage(
  input: ExtractEventDetailsInput
): Promise<ExtractEventDetailsOutput> {
  return extractEventDetailsFlow(input);
}


const prompt = ai.definePrompt({
    name: 'extractEventDetailsPrompt',
    input: { schema: ExtractEventDetailsInputSchema },
    output: { schema: ExtractEventDetailsOutputSchema },
    prompt: `You are an expert event coordinator. Your task is to extract event information from the provided image. The image could be a poster, a flyer, or a digital screenshot. The text might be in any language.

    Analyze the image and extract the following details:
    1.  **Event Title**: The main title of the event.
    2.  **Description**: The full descriptive text about the event.
    3.  **Date**: The date of the event. If you find a date, please format it as YYYY-MM-DD. If the year is not specified, assume the current year.

    Return the information in the structured output format.

    Image: {{media url=imageDataUri}}`,
});


const extractEventDetailsFlow = ai.defineFlow(
  {
    name: 'extractEventDetailsFlow',
    inputSchema: ExtractEventDetailsInputSchema,
    outputSchema: ExtractEventDetailsOutputSchema,
  },
  async (input: ExtractEventDetailsInput) => {
    const { output } = await prompt(input);
    return output!;
  }
);
