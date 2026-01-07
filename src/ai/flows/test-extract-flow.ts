
'use server';
/**
 * @fileOverview A test flow for extracting event details from an image.
 * This flow is intended for debugging and testing purposes.
 * 
 * - testExtract - A function that returns the direct JSON output from the AI model.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { 
    ExtractEventDetailsInputSchema, 
    ExtractEventDetailsOutputSchema 
} from './extract-event-details';

const testPrompt = ai.definePrompt({
    name: 'testExtractPrompt',
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


export const testExtractFlow = ai.defineFlow(
  {
    name: 'testExtractFlow',
    inputSchema: ExtractEventDetailsInputSchema,
    outputSchema: z.any(),
  },
  async (input) => {
    // This flow will return the raw output from the prompt for debugging.
    const { raw } = await testPrompt(input);
    return raw.candidates[0].message.parts;
  }
);

export async function testExtract(input: z.infer<typeof ExtractEventDetailsInputSchema>) {
    return testExtractFlow(input);
}
