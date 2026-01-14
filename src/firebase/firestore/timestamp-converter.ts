'use client';

import { Timestamp } from 'firebase/firestore';

/**
 * Recursively converts Firestore Timestamps to JavaScript Date objects.
 * Handles nested objects and arrays.
 * @param data The data object or array to convert.
 * @returns The data with Timestamps converted to Dates.
 */
export function convertTimestamps<T>(data: T): T {
  if (data === null || typeof data !== 'object') {
    return data;
  }

  // Handle Firestore Timestamp
  if (data instanceof Timestamp) {
    return data.toDate() as any;
  }

  // Handle Arrays
  if (Array.isArray(data)) {
    return data.map(item => convertTimestamps(item)) as any;
  }

  // Handle Objects
  const convertedObject: { [key: string]: any } = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      convertedObject[key] = convertTimestamps((data as any)[key]);
    }
  }

  return convertedObject as T;
}
