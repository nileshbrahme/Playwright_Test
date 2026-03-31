//Playwright GitHub API test cases with validation of response status code, response body and response headers      
import { test, expect } from '@playwright/test';

test.describe('GitHub API Tests', () => {   
    test('Get user details', async ({ request }) => {
        const response = await request.get('https://api.github.com/users/octocat');
        // Validate response status code
        expect(response.status()).toBe(200);
        // Validate response body
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('login', 'octocat');
        // Validate response headers
        expect(response.headers()).toHaveProperty('content-type', 'application/json; charset=utf-8');
        console.log('Response Body:', responseBody);
    });

    test('Get user repositories', async ({ request }) => {
        const response = await request.get('https://api.github.com/users/octocat/repos');
        // Validate response status code
        expect(response.status()).toBe(200);
        // Validate response body
        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBe(true);
        // Validate response headers
        expect(response.headers()).toHaveProperty('content-type', 'application/json; charset=utf-8');
    }
    );
});
//More GitHUb.com playwright APi tests   
test.describe('GitHub API Tests - Repository Details', () => {
    test('Get repository details', async ({ request }) => {
        const response = await request.get('https://api.github.com/repos/octocat/Hello-World');
        // Validate response status code
        expect(response.status()).toBe(200);
        // Validate response body
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('name', 'Hello-World');
        expect(responseBody).toHaveProperty('owner.login', 'octocat');
        // Validate response headers
        expect(response.headers()).toHaveProperty('content-type', 'application/json; charset=utf-8');
    }
    );
    test('Get repository issues', async ({ request }) => {
        const response = await request.get('https://api.github.com/repos/octocat/Hello-World/issues');
        // Validate response status code
        expect(response.status()).toBe(200);
        // Validate response body
        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBe(true);
        // Validate response headers
        expect(response.headers()).toHaveProperty('content-type', 'application/json; charset=utf-8');
    }
    );
});
//  more GitHub.com playwright API tests for commits and branches


test.describe('GitHub API Tests - Commits and Branches', () => {
    test('Get repository commits', async ({ request }) => {
        const response = await request.get('https://api.github.com/repos/octocat/Hello-World/commits');

        // Validate response status code
        expect(response.status()).toBe(200);
        // Validate response body

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBe(true);
        // Validate response headers

        expect(response.headers()).toHaveProperty('content-type', 'application/json; charset=utf-8');
    });


    test('Get repository branches', async ({ request }) => {
        const response = await request.get('https://api.github.com/repos/octocat/Hello-World/branches');
        // Validate response status code
        expect(response.status()).toBe(200);
        // Validate response body
        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBe(true);

        // Validate response headers

        expect(response.headers()).toHaveProperty('content-type', 'application/json; charset=utf-8');
    });
});







