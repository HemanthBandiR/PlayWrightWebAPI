const { test, expect } = require('@playwright/test');

test.only('Validate the order is placed or not', async ({ page }) => {
    //const context = await browser.newContext();
    //const page = await context.newPage();

    const email = "hemanthreddybandi@gmail.com";
    const productName = 'zara coat 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Ashu@_235");

    await page.getByRole("button", { name: 'Login' }).click();

    await page.waitForLoadState('networkidle');

    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);
    const countval = await products.count();
    await page.locator('.card-body').filter({ hasText: 'ZARA COAT 3' }).getByRole("button", { name: " Add To Cart" }).click();


    await page.getByRole("listitem").getByRole('button', { name: 'cart' }).click();
    await page.locator("div li").first().waitFor();



    await expect(page.getByText('zara coat 3')).toBeVisible();

    await page.getByRole('button', { name: 'Checkout' }).click();

    await page.getByPlaceholder("Select Country").pressSequentially("ind");

    await page.getByRole('button', { name: 'Ind' }).nth(1).click();

    await page.getByText("PLACE ORDER").click();

    await page.waitForLoadState('networkidle');
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
    await page.locator("h1").highlight();
    const orderIdElement = page.locator(".em-spacer-1 .ng-star-inserted");
    const orderId = await orderIdElement.textContent();
    console.log(`capturing order id first ${orderId}`);
    console.log(`order id value captured before is ${orderId}`);
    const cleanedOrderId = orderId.replace(/[^a-zA-Z0-9]/g, '');

    // await page.getByText('Orders History Page').click();
    await page.getByRole("button", { name: 'ORDERS' }).click();

    await page.waitForLoadState('networkidle');

    const viewButton = page.locator('tbody tr')
        .filter({ has: page.locator(`th:has-text("${cleanedOrderId}")`) })
        .locator("button:has-text('View')");
    await viewButton.waitFor({ state: 'visible', timeout: 10000 });
    await viewButton.click();

    await page.waitForLoadState('load');
    console.log(`Clicked the view button for order ID: ${cleanedOrderId}`);

    console.log(`Searching for order ID: ${cleanedOrderId}`);
    await page.pause(1000);
    // Wait for the selector to be visible
    //  await page.waitForSelector('.col-text', { state: 'visible' });
    // const elementExists = await page.locator('.col-text').filter({ hasText: cleanedOrderId }).count() > 0;
    // console.log(`Element with order ID found: ${elementExists}`);
    const validateid = await page.locator('.col-text').textContent();
    if (validateid === cleanedOrderId) {
        console.log(cleanedOrderId);
    }
    //expect(elementExists).toBeTruthy();
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
