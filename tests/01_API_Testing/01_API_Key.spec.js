import { test, expect } from '@playwright/test';
import { apiKeyHeader, apiKeyQuery } from '../../utils/apikey';



test.describe('API Key Authentication with Postman Echo', () => {

  const BASE_URL = process.env.ECHO_BASE_URL;
  const HEADER_NAME = process.env.API_KEY_HEADER;

    // ---------- Positive Case: API Key in Header ----------
    test('[API Key Auth - Header] Postman Echo with API key in header', async ({ request }) => {
        
        // 1) Build headers containing the API key (env or explicit)
    const headers = apiKeyHeader({ extra: { Accept: 'application/json' } });

    // 2) Send request
    const res = await request.get(`${BASE_URL}/get`, { headers });

    // 3) Validate success
    expect(res.ok()).toBeTruthy();
    const body = await res.json();

    // Postman Echo echoes incoming headers
    const echoedKey = body.headers?.[HEADER_NAME];
    expect(echoedKey, `Expected header ${HEADER_NAME} to be echoed`).toBe(process.env.API_KEY);
    expect(body.url).toContain('/get');

    });

    //using query parameter for API key);
    test('[API Key - Query] Postman Echo reflects query key', async ({ request }) => {
    const BASE_URL = process.env.ECHO_BASE_URL;
    const urlWithKey = apiKeyQuery(`${BASE_URL}/get`);
    // const url = "https://postman-echo.com/get?apikey=demo-api-key-123"
 
    const res = await request.get(urlWithKey);
    expect(res.ok()).toBeTruthy();
 
    const body = await res.json();
    // The full URL with query is echoed back
    expect(body.url, 'URL should contain the api key query param').toContain(process.env.API_KEY);
  });

  // negative case: Missing API key
    test('[API Key - Negative] Missing API key should not be reflected', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/get`);
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    // No API key should be present in headers or query
    const echoedKeyHeader = body.headers?.[HEADER_NAME];
    expect(echoedKeyHeader, 'Expected no API key in headers').toBeUndefined();
    expect(body.url, 'Expected URL to not contain API key').not.toContain(process.env.API_KEY);
  });

  //negative case: Invalid API key (if Echo had validation, but we can still check it's reflected)
    test('[API Key - Negative] Invalid API key should be reflected', async ({ request }) => {
    const invalidKey = 'invalid-api-key-456';
    const headers = apiKeyHeader({ extra: { Accept: 'application/json' }, overrideKey: invalidKey });
    const res = await request.get(`${BASE_URL}/get`, { headers });
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    const echoedKey = body.headers?.[HEADER_NAME];
    expect(echoedKey, 'Expected invalid API key to be echoed').toBe(invalidKey);
  });

}); 

