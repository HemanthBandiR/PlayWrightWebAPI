const { test, expect } = require('@playwright/test');

//test annotation is coming from playwright/test package
//In java script the code is not executed in sequentially means all the steps will execute parallely means
// the tests dont hold until the previous step completes so to overcome this situation
//before every step we need to put await

/*test('First playwright test', async function() {



});*/

//he above one can be written using anonymous function . means function that dont have any name so we can
//here the browser is global fixture comes from playwright test annotation

test('First playwright test', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    /// await page.locator('#usename').type("rahulshetty");
    await page.locator('#username').fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("learning");
    await page.locator("#signInBtn").click();
    //await page.locator().sc

});

//Browser context declaration
test('Page Playwright test', async ({ page }) => {

    await page.goto("https://google.com");
    console.log(await page.title());

    await expect(page).toHaveTitle("Google");
});


test('Extract error text from invalid user', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator('#username');
    const password = page.locator("[type='password']");
    const cardTitles = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    /// await page.locator('#usename').type("rahulshetty");
    await username.fill("rahulshetty");
    await password.fill("learning");
    await page.locator("#signInBtn").click();
    await page.locator("[style*='block']").textContent();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    await username.fill("rahulshettyacademy");
    await password.fill("learning");
    await page.locator("#signInBtn").click();
    // console.log(await cardTitles.first().textContent());
    //  console.log(await page.locator(".card-body a").nth(1).textContent());

    //if we uncomment above code as allTextContents method doesnt have wait time like textContent. We can check
    //in the below link "playwright.dev/docs/actionability"
    const allTitles = await cardTitles.allTextContents();

    console.log(allTitles);

    await page.locator().filter(({ hasText: '' })).toBeTruthy();



});
