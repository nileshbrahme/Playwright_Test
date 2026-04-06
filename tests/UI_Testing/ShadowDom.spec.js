import{test, expect} from '@playwright/test';

test('Check Shadow DOM Element', async ({ page }) => {
    await page.goto('https://dd-demo-tau.vercel.app/web_elements.html#7-shadow');
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(3000);
    // Locate the shadow host element
    // // Playwright automatically pierces shadow roots when chaining locators.

    const shadowButton = page.locator('#shadowHost').locator('#shadowBtn');

    // Click the button inside the shadow DOM
    await shadowButton.click();
    await page.waitForTimeout(2000);

    // Validate the result of the button click
    const shadowmsg = page.locator('#shadowMsg');
    await expect(shadowmsg).toHaveText('Shadow DOM button clicked');
    await page.waitForTimeout(3000);
    await page.close();
});