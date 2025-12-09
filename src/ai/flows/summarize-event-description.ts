'use server';
/**
 * @fileOverview Summarizes an event description to provide a quick overview.
 *
 * - summarizeEventDescription - A function that summarizes the event description.
 * - SummarizeEventDescriptionInput - The input type for the summarizeEventDescription function.
 * - SummarizeEventDescriptionOutput - The return type for the summarizeEventDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeEventDescriptionInputSchema = z.object({
  description: z.string().describe('The event description to summarize.'),
});
export type SummarizeEventDescriptionInput = z.infer<
  typeof SummarizeEventDescriptionInputSchema
>;

const SummarizeEventDescriptionOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the event description.'),
});
export type SummarizeEventDescriptionOutput = z.infer<
  typeof SummarizeEventDescriptionOutputSchema
>;

export async function summarizeEventDescription(
  input: SummarizeEventDescriptionInput
): Promise<SummarizeEventDescriptionOutput> {
  return summarizeEventDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeEventDescriptionPrompt',
  input: {schema: SummarizeEventDescriptionInputSchema},
  output: {schema: SummarizeEventDescriptionOutputSchema},
  prompt: `Summarize the following event description in a concise manner:

{{{description}}}`,
});

const summarizeEventDescriptionFlow = ai.defineFlow(
  {
    name: 'summarizeEventDescriptionFlow',
    inputSchema: SummarizeEventDescriptionInputSchema,
    outputSchema: SummarizeEventDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
