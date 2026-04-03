import{test,expect} from '@playwright/test';
import dotenv from 'dotenv';


test.describe('Authentication Test Cases', () => {
    const GITHUB_BASE_URL = process.env.GITHub_Base_Url;
    const GITHUB_TOKEN = process.env.GITHUB_Token;

    test.skip('Get user details with valid token', async ({ request }) => {
        const response = await request.get(`${GITHUB_BASE_URL}/user`, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('login', 'nileshbrahme');
        expect(responseBody).toHaveProperty('id', 62586796);
        console.log('Response Body:', responseBody);
    });
});

test.skip('Authentication Invalid Token',  async ({ request }) => {
    const GITHUB_BASE_URL = process.env.GITHub_Base_Url;
    const invalidToken = process.env.Invalid_GITHUB_Token;

            const response = await request.get(`${GITHUB_BASE_URL}/user`, {
            headers: {
                'Authorization': `token ${invalidToken}`,
                'Accept': 'application/vnd.github.v3+json'
            }   
        });
        expect(response.status()).toBe(401);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('message', 'Bad credentials');
        console.log('Response Body:', responseBody);
    });


test('Authentication Invalid URL',  async ({ request }) => {
    const GITHUB_BASE_URL = process.env.GITHub_Base_Url;
    const invalidUrl = `${GITHUB_BASE_URL}/invalid-endpoint`;

    const response = await request.get(invalidUrl, {
        headers: {
            'Authorization': `token ${process.env.GITHUB_Token}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    });
    expect(response.status()).toBe(404);


    
});




