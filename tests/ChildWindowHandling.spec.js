'use strict'
const { test, expect } = require('@playwright/test');


test('Child window handling', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    // const documentsLink = page.locator("[href*='documents-request']");
    const documentsLink = page.locator(".blinkingText");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const [newPage] = await Promise.all([context.waitForEvent('page'),
    documentsLink.click(),
    ]);


    // Get the title of the newly opened page
    const newPageTitle = await newPage.title();
    console.log(`New page title: ${newPageTitle}`);

    const text = await newPage.locator(".red").textContent();
    console.log(text);

    //for pulling and splitting specific text as below
    const splittext = text.split("@");
    const domainname = splittext[1].split(" ")[0];
    await newPage.close();

    await page.waitForLoadState("networkidle");
    await page.locator("#username").fill(domainname);

    await page.pause();
    console.log(await (page.locator("#username").inputValue()));
    await page.pause();
});




