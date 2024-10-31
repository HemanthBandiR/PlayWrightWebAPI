import { test, expect } from '@playwright/test';

test('CalenderSelection', async ({ page }) => {

    const year = "2023";
    const monthNumber = "06";
    const date = "15"
    const expectedList = [monthNumber, date, year];
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    await page.locator('.react-date-picker__inputGroup').click();

    await page.locator('.react-calendar__navigation__label').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.getByText(year).click();
    await page.locator('.react-calendar__year-view__months__month').nth(Number(monthNumber) - 1).click();
    await page.locator("//abbr[text() ='" + date + "']").click();

    console.log(val2);
    const inputs = page.locator(".react-date-picker__inputGroup input");
    for (let i = 0; i < inputs.length; i++) {
        const values = inputs[i].getAttribute("value");
        expect(values).toEqual(expectedList[i]);
    }
});

test('SampleTest', async({browser})=>
{
    const context = await browser.newContext();

    const page = await context.newPage();

    page.goto()


})