import { test, expect } from '@playwright/test';


//Fetch weather data for a specific city using OpenWeatherMap API for url https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API key} create path parameter for lat and lon and query parameter for appid

test.describe('OpenWeatherMap API Testing', () => {

  const BASE_URL = process.env.OWM_BASE_URL;
  const appid = process.env.appid;
  
    test('Fetch weather data for a specific city using lat and lon', async ({ request }) => {
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
    });

     //negative test case for missing lat as it is mandatory field
        test('Fetch weather data with missing lat parameter - Negative Test', async ({ request }) => {
            const lon = process.env.lon;
            const url = `${BASE_URL}?lon=${lon}&appid=${appid}`;
            console.log('Request URL:', url);
            const response = await request.get(url, { ignoreHTTPSErrors: true });
            expect(response.status()).toBe(400); // Expecting a bad request error
            console.log('Response Status:', response.status());
            const responseData = await response.json();
            console.log('Response Data:', responseData);
            expect(responseData.cod).toBe("400");
            expect(responseData.message).toBe('Nothing to geocode');
        });

        //negative test case for invalid lat as it is mandatory field
        test('Fetch weather data with invalid lat parameter - Negative Test', async ({ request }) => {
            const lat = '123.45'; // Invalid latitude
            const lon = process.env.lon;
            const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${appid}`;
            console.log('Request URL:', url);
            const response = await request.get(url, { ignoreHTTPSErrors: true });
            expect(response.status()).toBe(400);
            console.log('Response Status:', response.status());
            const responseData = await response.json();
            console.log('Response Data:', responseData);
            expect(responseData.cod).toBe("400");
            expect(responseData.message).toBe('wrong latitude');
        });
        
    })
