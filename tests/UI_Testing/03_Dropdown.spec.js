

import { test, expect } from '@playwright/test';


test('Dropdown Selection Example', async ({ page }) => {
 
    // Set URL and navigate
    const url = "https://dd-demo-tau.vercel.app/web_elements.html#7-dropdown";
    await page.goto(url);
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(3000);
 
    // Validate page title
    await expect(page).toHaveTitle(/Playwright/i);
 
    await page.waitForTimeout(2000);
    // ------------------------------------
 
    // Locate dropdown
    const dropdown = page.locator('#dropdownField');
 
    // Select option by value
    await dropdown.selectOption({ value: 'Audi' });
    console.log('Selected option by value: Audi');
 
    await page.waitForTimeout(2000);
 
    // Select option by label
    await dropdown.selectOption({ label: 'Tesla' });
    console.log('Selected option by label: Tesla');
 
    await page.waitForTimeout(2000);
 
    // Validate selected option
    const selectedValue = await dropdown.inputValue();
    console.log('Currently selected value:', selectedValue);
    expect(selectedValue).toBe('Tesla');
 
    // -------------------------------------
    await page.waitForTimeout(3000);
 
    await page.close();
});