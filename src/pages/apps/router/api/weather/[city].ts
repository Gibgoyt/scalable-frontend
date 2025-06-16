import type { APIRoute } from 'astro';

// Mock weather data for different cities
const weatherData = {
  'london': {
    city: 'London',
    country: 'UK',
    temperature: 12,
    condition: 'Cloudy',
    humidity: 78,
    windSpeed: 15,
    icon: '☁️'
  },
  'new-york': {
    city: 'New York',
    country: 'USA',
    temperature: 8,
    condition: 'Sunny',
    humidity: 45,
    windSpeed: 8,
    icon: '☀️'
  },
  'tokyo': {
    city: 'Tokyo',
    country: 'Japan',
    temperature: 18,
    condition: 'Partly Cloudy',
    humidity: 62,
    windSpeed: 12,
    icon: '⛅'
  },
  'san-francisco': {
    city: 'San Francisco',
    country: 'USA',
    temperature: 16,
    condition: 'Foggy',
    humidity: 85,
    windSpeed: 10,
    icon: '🌫️'
  },
  'berlin': {
    city: 'Berlin',
    country: 'Germany',
    temperature: 5,
    condition: 'Rainy',
    humidity: 90,
    windSpeed: 20,
    icon: '🌧️'
  }
};

export const GET: APIRoute = async ({ params, request }) => {
  const { city } = params;
  
  // Get client info for demonstration
  const userAgent = request.headers.get('user-agent') || 'Unknown';
  const clientIP = request.headers.get('cf-connecting-ip') || 
                   request.headers.get('x-forwarded-for') || 
                   'Unknown';

  // Check if city exists in our mock data
  if (!city || !weatherData[city.toLowerCase()]) {
    return new Response(
      JSON.stringify({
        error: 'City not found',
        message: `Weather data not available for "${city}"`,
        availableCities: Object.keys(weatherData),
        timestamp: new Date().toISOString()
      }),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }

  // Get weather data for the city
  const weather = weatherData[city.toLowerCase()];
  
  // Add some dynamic elements to make it feel real-time
  const currentTemp = weather.temperature + Math.floor(Math.random() * 6 - 3); // ±3 degrees
  const currentHumidity = Math.max(20, Math.min(100, weather.humidity + Math.floor(Math.random() * 20 - 10)));
  
  const response = {
    success: true,
    city: weather.city,
    country: weather.country,
    current: {
      temperature: currentTemp,
      condition: weather.condition,
      humidity: currentHumidity,
      windSpeed: weather.windSpeed,
      icon: weather.icon
    },
    forecast: [
      {
        day: 'Today',
        high: currentTemp + 3,
        low: currentTemp - 5,
        condition: weather.condition,
        icon: weather.icon
      },
      {
        day: 'Tomorrow',
        high: currentTemp + 1,
        low: currentTemp - 3,
        condition: 'Partly Cloudy',
        icon: '⛅'
      },
      {
        day: 'Day After',
        high: currentTemp - 2,
        low: currentTemp - 8,
        condition: 'Sunny',
        icon: '☀️'
      }
    ],
    metadata: {
      timestamp: new Date().toISOString(),
      requestInfo: {
        userAgent: userAgent.substring(0, 50) + '...',
        clientIP: clientIP,
        requestUrl: request.url
      },
      apiInfo: {
        endpoint: `/api/weather/${city}`,
        method: 'GET',
        version: '1.0',
        note: 'This is a demo API with mock data'
      }
    }
  };

  return new Response(
    JSON.stringify(response, null, 2),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
        'X-API-Version': '1.0',
        'X-Response-Time': Date.now().toString()
      }
    }
  );
};

export const POST: APIRoute = async ({ params, request }) => {
  const { city } = params;
  
  try {
    const body = await request.json();
    
    return new Response(
      JSON.stringify({
        message: `Weather update received for ${city}`,
        data: body,
        timestamp: new Date().toISOString(),
        note: 'This is a demo endpoint - no actual data is saved'
      }, null, 2),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Invalid JSON in request body',
        timestamp: new Date().toISOString()
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
};