//Create 10 UI GITHUB.com test uisng playwright`
import {test, expect} from '@playwright/test';

test.describe('GitHub UI Tests', () => {
    test('Navigate to GitHub homepage', async ({ page }) => {
        await page.goto('https://github.com');


        // Validate page title
        await expect(page).toHaveTitle('GitHub · Change is constant. GitHub keeps you ahead. · GitHub');
    }   
    );  
    test('Search for a repository', async ({ page }) => {
        await page.goto('https://github.com');
        // Enter search query and submit    
        await page.fill('input[name="q"]', 'playwright');   
        await page.press('input[name="q"]', 'Enter');
        // Validate search results page
        await expect(page).toHaveURL(/search\?q=playwright/);
        await expect(page.locator('h3')).toContainText('playwright');
    }
    );
    test('Navigate to repository page', async ({ page }) => {
        await page.goto('https://github.com/microsoft/playwright');
        // Validate repository page title
        await expect(page).toHaveTitle('GitHub - microsoft/playwright: Playwright is a Node.js library to automate Chromium, Firefox and WebKit with a single API.');
        // Validate repository description
        await expect(page.locator('p.f4.my-3')).toHaveText('Playwright is a Node.js library to automate Chromium, Firefox and WebKit with a single API.');
    }
    );
    test('Check repository README', async ({ page }) => {
        await page.goto('https://github.com/microsoft/playwright');
        // Validate README section is visible   
        await expect(page.locator('#readme')).toBeVisible();
        // Validate README content contains "Getting Started"
        await expect(page.locator('#readme')).toContainText('Getting Started');
    }   
    );
    test('Check repository issues tab', async ({ page }) => {
        await page.goto('https://github.com/microsoft/playwright');
        // Click on the "Issues" tab
        await page.click('a[href="/microsoft/playwright/issues"]');
        // Validate issues page is displayed
        await expect(page).toHaveURL(/issues/);
    }
    );
    test('Check repository pull requests tab', async ({ page }) => {
        await page.goto('https://github.com/microsoft/playwright');
        // Click on the "Pull requests" tab
        await page.click('a[href="/microsoft/playwright/pulls"]');
        // Validate pull requests page is displayed
        await expect(page).toHaveURL(/pulls/);
    }
    );
    test('Check repository actions tab', async ({ page }) => {
        await page.goto('https://github.com/microsoft/playwright');
        // Click on the "Actions" tab
        await page.click('a[href="/microsoft/playwright/actions"]');
        // Validate actions page is displayed
        await expect(page).toHaveURL(/actions/);
    }
    );  
    test('Check repository projects tab', async ({ page }) => {
        await page.goto('https://github.com/microsoft/playwright');
        // Click on the "Projects" tab
        await page.click('a[href="/microsoft/playwright/projects"]');
        // Validate projects page is displayed
        await expect(page).toHaveURL(/projects/);
    }
    );
    test('Check repository wiki tab', async ({ page }) => {
        await page.goto('https://github.com/microsoft/playwright');
        // Click on the "Wiki" tab
        await page.click('a[href="/microsoft/playwright/wiki"]');
        // Validate wiki page is displayed
        await expect(page).toHaveURL(/wiki/);
    }
    );
    test('Check repository security tab', async ({ page }) => {
        await page.goto('https://github.com/microsoft/playwright');
        // Click on the "Security" tab
        await page.click('a[href="/microsoft/playwright/security"]');
        // Validate security page is displayed
        await expect(page).toHaveURL(/security/);
    }
    );  
});
//  more GitHub.com playwright UI tests for README content, issues, pull requests, actions, projects, wiki, and security tabs

test.describe('GitHub API Tests - Repository Details and Issues', () => {
    test('Get repository details', async ({ request }) => {
        const response = await request.get('https://api.github.com/repos/microsoft/playwright');        
        // Validate response status code
        expect(response.status()).toBe(200);
        // Validate response body
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('name', 'playwright');
        expect(responseBody).toHaveProperty('owner.login', 'microsoft');
        // Validate response headers
        expect(response.headers()).toHaveProperty('content-type', 'application/json; charset=utf-8');
    }
    );
    test('Get repository issues', async ({ request }) => {
        const response = await request.get('https://api.github.com/repos/microsoft/playwright/issues');
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