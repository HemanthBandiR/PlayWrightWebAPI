const { test, expect, request } = require('@playwright/test');

const loginPayLoad = { userEmail: 'hemanthreddybandi@gmail.com', userPassword: 'Ashu@_235' };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6581ca399fd99c85e8ee7f45" }] }
let orderId;
let refreshToken;
let token;

// Helper function to refresh the token
async function refreshAuthToken(apiContext) {
    const refreshResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/refresh-token", {
        data: { refreshToken },  // Send refresh token to get a new access token
    });

    const jsonResponse = await refreshResponse.json();
    token = jsonResponse.token; // Update the token
    refreshToken = jsonResponse.refreshToken; // Update refresh token in case it has changed
    console.log('New token generated:', token);
}

// Helper function to make API requests and handle token expiration
async function executeApiRequest(apiContext, requestFunc) {
    const response = await requestFunc();

    if (response.status() === 401) {  // Token has expired, need to refresh
        console.log("Token expired, refreshing...");
        await refreshAuthToken(apiContext);  // Refresh the token
        // Retry the request with the new token
        return await requestFunc();
    }

    return response;
}

test.beforeAll(async () => {
    const apiContext = await request.newContext();

    // Login to get the token and refresh token
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        data: loginPayLoad
    });
    expect(loginResponse.ok()).toBeTruthy();

    const jsonResponse = await loginResponse.json();
    token = jsonResponse.token;
    refreshToken = jsonResponse.refreshToken; // Store the refresh token
    console.log('Token:', token);
    console.log('Refresh Token:', refreshToken);

    // Create Order
    const orderResponse = await executeApiRequest(apiContext, () => apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        data: orderPayLoad,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
    }));

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

    console.log(`Order ID value captured before is ${orderId}`);
    const cleanedOrderId = orderId.replace(/[^a-zA-Z0-9]/g, '');
    expect(orderdetails).toHaveText(cleanedOrderId);
});

test.afterAll(async () => {
    console.log(orderId);
    console.log(token);
    const apiContext = await request.newContext();
    const deleteUrl = `https://rahulshettyacademy.com/api/ecom/order/delete-order/${orderId}`;

    if (orderId) {
        const deleteResponse = await executeApiRequest(apiContext, () => apiContext.delete(deleteUrl, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
        }));

        console.log('Delete response status:', deleteResponse.status());
        expect(deleteResponse.status()).toBe(200);
        const responseBody = await deleteResponse.json();
        console.log(`Delete Response:`, responseBody);
    } else {
        console.log('Order ID not available for deletion');
    }
});





