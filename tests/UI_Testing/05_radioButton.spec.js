import {test, expect} from '@playwright/test';


test('Check RadioButton Functionality', async ({ page }) => {
    await page.goto('https://dd-demo-tau.vercel.app/web_elements.html#5-radio');
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(3000);

    const maleRadioButton = page.locator('#maleRadio');
    await maleRadioButton.check();
    await page.waitForTimeout(2000);
    await expect(maleRadioButton).toBeChecked();
    await expect(page.locator('#radioMsg')).toHaveText('Selected Gender: Male');

    const femaleRadioButton = page.locator('#femaleRadio');
    await expect(femaleRadioButton).not.toBeChecked();

    await page.close();
});
