import {test, expect} from '@playwright/test';

test('Check CheckBox Functionality', async ({ page }) => {
    await page.goto('https://dd-demo-tau.vercel.app/web_elements.html#6-checkbox');
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(3000);
    const selectCheckBox = page.locator('#subscribeChk').check();
    await page.waitForTimeout(2000);

    await expect(page.locator('#checkboxMsg')).toHaveText('Checked: Subscribe');

    const agreeCheckBox = page.locator('#agreeChk'); 
    await expect(agreeCheckBox).not.toBeChecked();
    await page.waitForTimeout(3000);

    await page.close();
});
