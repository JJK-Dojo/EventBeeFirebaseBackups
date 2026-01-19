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
