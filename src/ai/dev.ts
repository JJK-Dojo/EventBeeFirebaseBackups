import { config } from 'dotenv';
config();

import '@/ai/flows/event-recommendations.ts';
import '@/ai/flows/summarize-event-description.ts';
import '@/ai/flows/extract-event-details.ts';
