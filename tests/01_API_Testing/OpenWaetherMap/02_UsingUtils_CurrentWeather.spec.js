import{test, expect} from '@playwright/test'
import { appIdOpenWeather } from '../../../utils/appIDOWM'; 


test.describe("OpenWeatherMap API - Current Weather Data", () => {

  const BASE_URL = process.env.OWM_BASE_URL;
  const { appid } = appIdOpenWeather();
    test.skip('Fetch current weather data for a specific location using lat and lon', async ({ request }) => {
        const lat = 44.34;
        const lon = 10.99;

        const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${appid}`;
        console.log('Request URL:', url);
        const response = await request.get(url, { ignoreHTTPSErrors: true });
        expect(response.status()).toBe(200);

        const responseData = await response.json();
        console.log('Response Data:', responseData);
        expect(responseData).toHaveProperty('weather');
        expect(responseData).toHaveProperty('main');
        expect(responseData).toHaveProperty('name');
    }
    );

    //using queryparametr for lat,loc and appid
    test('Fetch current weather data using query parameters', async ({ request }) => {
        
        const lat = process.env.lat;
        const lon = process.env.lon;

        const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${appid}`;
        console.log('Request URL:', url);
        const response = await request.get(url, { ignoreHTTPSErrors: true });
        expect(response.status()).toBe(200);

        const responseData = await response.json();
        console.log('Response Data:', responseData);
        expect(responseData).toHaveProperty('weather');
        expect(responseData).toHaveProperty('main');
        expect(responseData).toHaveProperty('name');
})
})
