const { test, expect } = require('@playwright/test');

test.only('Validate the order is placed or not', async ({ page }) => {
    //const context = await browser.newContext();
    //const page = await context.newPage();

    const email = "hemanthreddybandi@gmail.com";
    const productName = 'zara coat 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill('Ashu@_235');
    await page.locator("[value='Login']").click();

    await page.waitForLoadState('networkidle');

    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);
    const countval = await products.count();

    for (let i = 0; i < countval; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName.toUpperCase()) {
            //add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }


    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();

    const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();

    expect(bool).toBeTruthy();
    await page.locator("text =Checkout").click();
    await page.locator("[placeholder*='Country']").type("ind");

    const dropdownval = page.locator(".ta-results");
    await dropdownval.waitFor();

    const optionsCount = await dropdownval.locator("button").count();

    for (let j = 0; j < optionsCount; j++) {
        /*if (dropdownval.locator("button").nth(j).textContent === 'India') {
            await dropdownval.locator("button").nth(j).click();
            break;*/
        const text = await dropdownval.locator("button").nth(j).textContent();
        if (text === " India") {
            await dropdownval.locator("button").nth(j).click();
            break;
        }
    }
    console.log("Test Reached step2");
    await expect(page.locator(".user__name [type ='text']").first()).toHaveText(email);

    await page.locator(".btnn.action__submit").click();

    //await expect(page.locator(".hero-primary")).toHaveText(' Thankyou for the order. ');
    // const orderId = page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    const orderIdElement = page.locator(".em-spacer-1 .ng-star-inserted");
    const orderId = await orderIdElement.textContent();
    console.log(`capturing order id first ${orderId}`);

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor({ state: 'visible', timeout: 10000 });

    const rows = page.locator("tbody tr");

    //this code is only for displaying the rows and columns from a table
    /*for (let i = 0; i < await rows.count(); i++) {
        const rowlocator = page.locator("tbody tr ").nth(i);
        const columns = rowlocator.locator('td'); // Locate all cells (columns) in the current row
        const columnCount = await columns.count(); // Get the count of columns in the current row

        // Loop through each cell in the row
        for (let j = 0; j < columnCount; j++) {
            const cellValue = await columns.nth(j).textContent(); // Get text content of each cell
            console.log(`Row ${i + 1}, Column ${j + 1}: ${cellValue}`);
        }
    }
*/
    for (let k = 0; k < await rows.count(); k++) {
        const rowOrderid = await rows.nth(k).locator('th').textContent();
        console.log(`Before clicking on view button ${rowOrderid} and orderId is ${orderId}`);
        if (orderId.includes(rowOrderid)) {
            // await rows.nth(k).locator("button").first().click();
            const viewButton = rows.nth(k).locator("button").first();
            await viewButton.waitFor({ state: 'visible', timeout: 10000 });
            await viewButton.click();
            console.log(`Clicked the view button for order ID: ${orderId}`);
            break;
        }

    }
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    const orderdetails = await page.locator(".col-text");

    //console.log(`order details captured is ${orderdetails}`);
    console.log(`order id value captured before is ${orderId}`);
    const cleanedOrderId = orderId.replace(/[^a-zA-Z0-9]/g, '');
    expect(orderdetails).toHaveText(cleanedOrderId)//.toBeTruthy();

    /* this code worked for author*/
    //const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

});

//order id validations can be done as below 
/*
await page.waitForTimeout(2000);
    const orderDetailsLocator = page.locator(".col-text");
    const orderdetails = await orderDetailsLocator.textContent(); // Get the text content
    console.log(`Order Details: ${orderdetails}`); // Debugging log
    const cleanedOrderDetails = orderdetails.replace(/[^a-zA-Z0-9]/g, '');
    const cleanedOrderId = orderId.replace(/[^a-zA-Z0-9]/g, '');
    // Expectation on order ID based on order details
    // expect(orderId).includes(orderdetails);
    expect(cleanedOrderDetails).toContain(cleanedOrderId);*/
