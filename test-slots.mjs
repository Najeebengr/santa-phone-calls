import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Load environment variables from .env.local
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '.env.local') });

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url, options, maxRetries = 3) {
  let lastResponse;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      lastResponse = response;
      
      if (response.status === 429) {
        if (attempt === maxRetries) {
          console.log('Max retries reached. Still getting rate limited.');
          return response;
        }
        console.log(`Rate limited on attempt ${attempt}/${maxRetries}. Waiting before retry...`);
        await delay(5000 * attempt); // Increased delay to 5 seconds * attempt
        continue;
      }
      
      return response;
    } catch (error) {
      console.log(`Attempt ${attempt} failed:`, error.message);
      if (attempt === maxRetries) {
        throw error;
      }
      await delay(2000 * attempt);
    }
  }
  
  return lastResponse; // Return the last response if all retries failed
}

async function testGetFreeSlots() {
  try {
    const calendarId = process.env.GHL_CALENDAR_ID;
    const token = process.env.GHL_API_KEY;
    
    if (!calendarId || !token) {
      throw new Error('Missing required environment variables: GHL_CALENDAR_ID or GHL_API_KEY');
    }
    
    // Calculate start date (today) and end date (7 days from now)
    const startDate = Date.now();
    const endDate = startDate + (7 * 24 * 60 * 60 * 1000);

    const url = `https://rest.gohighlevel.com/v1/appointments/slots?calendarId=${calendarId}&startDate=${startDate}&endDate=${endDate}&timezone=America/Chihuahua`;
    
    console.log('Sending request to check free slots...');
    console.log('URL:', url);
    console.log('Calendar ID:', calendarId);
    
    const response = await fetchWithRetry(
      url,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response) {
      throw new Error('No response received from the server');
    }

    if (!response.ok) {
      const text = await response.text();
      console.error('Error status:', response.status);
      console.error('Error response:', text);
      console.error('Response headers:', Object.fromEntries(response.headers.entries()));
      return;
    }

    const data = await response.json();
    // Count total slots across all dates
    const totalSlots = Object.values(data).reduce((total, day) => total + day.slots.length, 0);
    console.log('Success! Total available slots:', totalSlots);
    console.log('Full response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error details:');
    console.error('- Message:', error.message);
    console.error('- Stack:', error.stack);
    if (error.response) {
      console.error('- Response status:', error.response.status);
      console.error('- Response headers:', error.response.headers);
    }
  }
}

testGetFreeSlots();