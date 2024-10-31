const { test, expect } = require('@playwright/test');

test.only('Rewriting for my knowledge', async ({ page }) => {

    const product = page.locator(".card-body");
    const email = "hemanthreddybandi@gmail.com";
    const productName = "ZARA COAT 3"

    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByLabel("Email").isVisible();
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Ashu@_235");
    await page.locator("#login").click();
    await page.locator(".m-2.blink_me").waitFor({ state: 'visible' })

    //Iterating the forloop by getting all the elements text
    const productItems = await product.locator("b").allTextContents();
    for (let i = 0; i < productItems.length; i++) {
        if (productItems[i] === productName) {
            product.nth(i).locator("text= Add To Cart").click();
        }
    }




});