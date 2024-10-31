const { test, expect } = require('@playwright/test');

test('working with playwright special locators', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.selectOption("#exampleFormControlSelect1", 'Female');
    //We can check in the properties in console tab for all the properties related to the object 
    const selectedOption = await page.locator('#exampleFormControlSelect1 option:checked').textContent();
    console.log(selectedOption);
    expect(selectedOption).toBe('Female');
    await page.getByPlaceholder("Password").fill("xxxx");
    console.log(await page.getByPlaceholder("Password").inputValue());
    await page.getByRole("button", { name: 'Submit' }).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link", { name: 'Shop' }).click();
    const pagetitle = await page.title();
    console.log(pagetitle);

    //const text = await page.locator('.some-class').textContent();
    //console.log(text);
    //	The difference with page.title() is that page.title() directly returns a 
    //string representing the title of the page,
    //while textContent() is a method used to extract text from elements found by locators.

});