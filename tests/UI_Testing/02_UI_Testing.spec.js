import{test, expect} from '@playwright/test';

 
  await page.goto('https://dd-demo-tau.vercel.app/web_elements.html');
  // await page.waitForTimeout(1000);
 
  await expect(page).toHaveTitle(/Playwright/);
 
  // Scroll to the button section
  // const locLink = page.getByRole("link", { name: 'Go to Text Input'});
  // const locLink = page.getByRole('link', { name: 'Go to Text Input'});
  // const locLink = page.getByText('Go to Text Input'); // entire text
  // const locLink = page.getByText('Go to Text'); // partial text also works
  // const locLink = page.getByText('Go to Text', { exact: false }); // partial text also works
  // const locLink = page.getByText('Go to Text', { exact: true }); // partial text will not work
 
    // const locLink = page.locator('#internalLink'); // locate using id selector (css selector)
 
  // chaining
  const locLink = page.locator("#mainContent").locator("section[id='13-links']").getByRole('link', { name: 'Go to Text Input'});
   
  await locLink.scrollIntoViewIfNeeded(); // scroll to the element if needed
  await page.waitForTimeout(3000);
 
  await locLink.click();
 
 
 
  await page.waitForTimeout(2000);
 
  await page.close();
 
