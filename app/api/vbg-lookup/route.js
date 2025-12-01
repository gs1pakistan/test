import { NextResponse } from 'next/server';

// Add your API key here from GS1 Developer Portal
const API_KEY = process.env.GS1_API_KEY || '7bbf3e3a2490411e89eefd07bea551fa';
const API_URL = 'https://grp.gs1.org/grp/v3.2/gtins/verified';

export async function POST(request) {
  try {
    const { gtin } = await request.json();

    // Validate GTIN
    if (!gtin || typeof gtin !== 'string') {
      return NextResponse.json(
        { error: 'GTIN is required' },
        { status: 400 }
      );
    }

    // Pad GTIN to 14 digits if needed
    const paddedGtin = gtin.padStart(14, '0');

    // Validate GTIN length
    if (paddedGtin.length !== 14 || !/^\d+$/.test(paddedGtin)) {
      return NextResponse.json(
        { error: 'GTIN must be 14 digits' },
        { status: 400 }
      );
    }

    // Call VbG API
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'APIKey': API_KEY,
      },
      body: JSON.stringify([paddedGtin]),
    });

    // Handle API errors
    if (!response.ok) {
      const errorText = await response.text();
      console.error('VbG API Error:', response.status, errorText);
      
      if (response.status === 401) {
        return NextResponse.json(
          { 
            error: 'API key is not authorized. Please check your GS1 API key and ensure you have Activate-grade certification.',
            details: 'Your API key may not have the required permissions to access the Verified by GS1 endpoint.'
          },
          { status: 401 }
        );
      }
      
      if (response.status === 403) {
        return NextResponse.json(
          { error: 'Access forbidden. Your API key may not have the required permissions.' },
          { status: 403 }
        );
      }

      return NextResponse.json(
        { error: `API request failed with status ${response.status}` },
        { status: response.status }
      );
    }

    // Parse and return the data
    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error in VbG lookup:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error.message 
      },
      { status: 500 }
    );
  }
}