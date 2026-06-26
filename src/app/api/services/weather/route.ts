import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const CACHE_TTL_MINUTES = 30;

async function fetchWeatherFromAPI(lat: number, lng: number) {
  if (!OPENWEATHER_API_KEY) {
    return null;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`OpenWeatherMap error: ${response.status}`);
    }

    const data = await response.json();
    return {
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      wind_speed: data.wind.speed,
      wind_deg: data.wind.deg,
      clouds: data.clouds.all,
      visibility: data.visibility,
      weather: data.weather.map((w: any) => ({
        main: w.main,
        description: w.description,
        icon: w.icon
      })),
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      timezone: data.timezone
    };
  } catch (error) {
    console.error('Weather API fetch error:', error);
    return null;
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const location = searchParams.get('location');

    if (!lat || !lng) {
      return NextResponse.json(
        { success: false, error: 'lat and lng are required' },
        { status: 400 }
      );
    }

    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);

    const cached = await sql`
      SELECT * FROM ibt_weather_cache
      WHERE lat = ${latNum} AND lng = ${lngNum}
      AND updated_at > NOW() - INTERVAL '${CACHE_TTL_MINUTES} minutes'
      ORDER BY updated_at DESC
      LIMIT 1
    `;

    if (cached.length > 0) {
      return NextResponse.json({
        success: true,
        source: 'cache',
        data: cached[0].forecast_data,
        cached_at: cached[0].updated_at
      });
    }

    const weatherData = await fetchWeatherFromAPI(latNum, lngNum);

    if (weatherData) {
      await sql`
        INSERT INTO ibt_weather_cache (lat, lng, forecast_data, updated_at)
        VALUES (${latNum}, ${lngNum}, ${JSON.stringify(weatherData)}, NOW())
        ON CONFLICT (lat, lng) DO UPDATE SET
          forecast_data = EXCLUDED.forecast_data,
          updated_at = NOW()
      `;

      return NextResponse.json({
        success: true,
        source: 'api',
        data: weatherData
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Weather data unavailable. Check OPENWEATHER_API_KEY environment variable.'
    }, { status: 503 });

  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { lat, lng, forecast_data } = body;

    if (!lat || !lng) {
      return NextResponse.json(
        { success: false, error: 'lat and lng are required' },
        { status: 400 }
      );
    }

    await sql`
      INSERT INTO ibt_weather_cache (lat, lng, forecast_data, updated_at)
      VALUES (${parseFloat(lat)}, ${parseFloat(lng)}, ${JSON.stringify(forecast_data)}, NOW())
      ON CONFLICT (lat, lng) DO UPDATE SET
        forecast_data = EXCLUDED.forecast_data,
        updated_at = NOW()
    `;

    return NextResponse.json({
      success: true,
      message: 'Weather data cached'
    });

  } catch (error) {
    console.error('Weather cache error:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}