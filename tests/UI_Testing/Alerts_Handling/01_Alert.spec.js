import { test, expect } from '@playwright/test';

test('Alerts example1', async ({ page }) => {
 
const alert_URl = process.env.alert_URl;    
    await page.goto(alert_URl);
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(3000);
    await expect(page).toHaveTitle(/Wallchart/);
    await page.waitForTimeout(1000);

page.on('dialog', async dialogParam => {
    console.log("Dialog type:", dialogParam.type());
    console.log("Dialog message:", dialogParam.message());
    await dialogParam.accept(); 
});
 
page.dblclick('#salert');
console.log("Event handled for simple alert");
await page.waitForTimeout(2000);

page.dblclick('#calert');
console.log("Event handled for confirmation alert");
await page.waitForTimeout(2000);

page.dblclick('#palert');
console.log("Event handled for prompt alert");
await page.waitForTimeout(2000);

page.close();

});
 