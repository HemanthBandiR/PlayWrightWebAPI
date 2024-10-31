const { test, expect, request } = require('@playwright/test');
const loginPayLoad = { userEmail: "hemanthreddybandi@gmail.com", userPassword: "Ashu@_235" };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6581ca399fd99c85e8ee7f45" }] }
let orderId;

let token;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayLoad
        }
    )
    expect(loginResponse.ok()).toBeTruthy();
    const jsonResponse = await loginResponse.json();
    token = jsonResponse.token
    console.log(token);

    //OrderDetails ApI

    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayLoad,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },

        })

    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    orderId = orderResponseJson.orders[0];

});


test('Place the Order', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor({ state: 'visible', timeout: 10000 });

    const rows = page.locator("tbody tr");



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

    console.log(`order id value captured before is ${orderId}`);
    const cleanedOrderId = orderId.replace(/[^a-zA-Z0-9]/g, '');
    expect(orderdetails).toHaveText(cleanedOrderId);

});