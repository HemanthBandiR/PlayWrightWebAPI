const { test, expect } = require('@playwright/test');


test('UI Controls', async ({ page }) => {

    // const context = await browser.newContext();
    // const page = await context.newPage();
    const username = page.locator('#username');
    const password = page.locator("[type='password']");
    const cardTitles = page.locator(".card-body a");
    const dropdown = page.locator("//form[@id='login-form']//following::div[6]//select");
    const documentsLink = page.locator("[href*='documents-request']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");



    await username.fill("rahulshettyacademy");
    await password.fill("learning");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    // await page.locator("#signInBtn").click();
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();

    await page.locator("#terms").uncheck();
    //reason for giving await inside expect asssertion function because await will be given 
    //to when an action is performed
    expect(await page.locator("#terms").isChecked()).toBeFalsy();


    await expect(documentsLink).toHaveAttribute("class", "blinkingText");
    await page.pause();
});


