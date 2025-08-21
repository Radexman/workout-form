import type { Holidays } from '../types';

const API_URL = import.meta.env.VITE_API_NINJAS_URL;
const API_KEY = import.meta.env.VITE_API_NINJAS_KEY;

export const fetchHolidays = async (country: string = 'PL'): Promise<Holidays[]> => {
  try {
    const response = await fetch(`${API_URL}?country=${country}`, {
      headers: { 'X-Api-Key': API_KEY },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data: Holidays[] = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Unexpected response format');
    }

    return data;
  } catch (error) {
    console.error('[fetchHolidays] Failed: ', error);
    return [];
  }
};
