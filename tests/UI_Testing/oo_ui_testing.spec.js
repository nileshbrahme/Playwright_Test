import{test,expect} from '@playwright/test';




    test('Verify wikipedia Title', async ({ page }) => {
        await page.goto('https://www.wikipedia.org/');
        await page.waitForTimeout(3000);  // wait to see the action (debug/ demo purpose)
        // Expect a title "to contain" a substring.
        await expect(page).toHaveTitle(/Wikipedia/);
    });

    //ui https://dd-demo-tau.vercel.app/web_elements.html

    test('Navigate to wikipedia', async ({ page }) => {
        await page.goto('https://dd-demo-tau.vercel.app/web_elements.html');
        // Validate page title
        await expect(page).toHaveTitle('Web Elements');

        //click button

    });