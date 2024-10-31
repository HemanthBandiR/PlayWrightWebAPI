const { request, test, expect } = require('@playwright/test')
const loginPayLoad = { userEmail: "hemanthreddybandi@gmail.com", userPassword: "Ashu@_235" };
let token;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayLoad
        })




    expect(loginResponse.ok()).toBeTruthy();
    const jsonLoginResponse = await loginResponse.json();
    token = jsonLoginResponse.token;
    console.log(token);

});

test('Place the Order', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem(value, 'token');

    }, token);
});