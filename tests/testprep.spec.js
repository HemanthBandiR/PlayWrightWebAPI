const { test, expect, request } = require('@playwright/test');

let token;

const loginPayLoad = { userEmail: 'hemanthreddybandi@gmail.com', userPassword: 'Ashu@_235' };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6581ca399fd99c85e8ee7f45" }] }

async function refreshToken(apiContext) {
    const refreshResponse = apiContext.post(" ", {
        data: { refreshToken }
    });

}

async function executeApiRequest(apiContext, requestFunc) {
    const response = await requestFunc();
    if (response.status() === 401) {
        await refreshToken(apiContext);
        return await requestFunc();
    }
}

test.beforeAll(async () => {
    const apiContext = request.newContext();

    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayLoad
        })
    expect(loginResponse.toBe(ok)).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    refreshToken = loginResponseJson.refreshToken;
    console.log(refreshToken);

    const orderResponse = await executeApiRequest(apiContext, () => apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayLoad,
            Headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }));

    const orderResponseJson = orderResponse.json();
    console.log(orderResponseJson.Object[0]);
    const orderId = orderResponseJson.Object[0];
});

test('place order', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, token);

});