const { test, expect } = require('@playwright/test');


test('Extract error message from invalid user', async ({ page }) => {

    // const context = await browser.newContext();
    //const page = await context.newPage();
    const email = page.locator('#userEmail');
    const password = page.locator("[type*='password']");
    const pageTitle = page.locator(" //p[normalize-space()='Automation Practice']");
    const cardTitles = page.locator(".card-body");

    await page.goto("https://rahulshettyacademy.com/client");

    /// await page.locator('#usename').type("rahulshetty");
    await email.fill("hemanthreddybandi@gmail.com");
    await password.fill("Ashu@_235");
    await page.locator("input#login").click();
    //await page.waitForLoadState('networkidle');// discouraged by playwright asking not to use for testing
    await cardTitles.first().waitFor();
    // waitFor works only for single WebElement locator
    // await pageTitle.textContent();
    //await expect(page).toHaveTitle("Let's Shop");


    const allTitles = await cardTitles.allTextContents();

    console.log(allTitles);
    await expect(cardTitles).toHaveCount(4);
    for (let i = 0; i < allTitles.length; i++) {
        if (allTitles[i] === 'IPHONE 13 PRO');
        {
            console.log("Iphone 13 pro value is found");
            console.log("break loop is going to end");
            break;
            console.log("break loop");
        }

        console.log("test completed");
    }
});
