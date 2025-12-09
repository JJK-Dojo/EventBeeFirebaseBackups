// src/ai/flows/event-recommendations.ts
'use server';

/**
 * @fileOverview Flow for generating event recommendations based on user search history and past attended events.
 *
 * - generateEventRecommendations - A function that generates event recommendations for a user.
 * - EventRecommendationsInput - The input type for the generateEventRecommendations function.
 * - EventRecommendationsOutput - The output type for the generateEventRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EventRecommendationsInputSchema = z.object({
  searchHistory: z.string().describe('The user\'s search history, as a comma-separated list of search terms.'),
  attendedEvents: z.string().describe('A comma-separated list of event names the user has attended.'),
  userLocation: z.string().describe('The current location of the user.'),
});
export type EventRecommendationsInput = z.infer<typeof EventRecommendationsInputSchema>;

const EventRecommendationsOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('A list of event recommendations based on the user\'s search history and attended events.'),
});
export type EventRecommendationsOutput = z.infer<typeof EventRecommendationsOutputSchema>;

export async function generateEventRecommendations(input: EventRecommendationsInput): Promise<EventRecommendationsOutput> {
  return eventRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'eventRecommendationsPrompt',
  input: {schema: EventRecommendationsInputSchema},
  output: {schema: EventRecommendationsOutputSchema},
  prompt: `You are an event recommendation expert. Given a user's search history, past attended events, and current location, you will recommend events that the user might be interested in.

Search History: {{{searchHistory}}}
Attended Events: {{{attendedEvents}}}
Current Location: {{{userLocation}}}

Based on this information, recommend a list of events the user might be interested in.`, 
});

const eventRecommendationsFlow = ai.defineFlow(
  {
    name: 'eventRecommendationsFlow',
    inputSchema: EventRecommendationsInputSchema,
    outputSchema: EventRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
