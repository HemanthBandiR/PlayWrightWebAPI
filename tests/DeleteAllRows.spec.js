const { test, expect } = require('@playwright/test');

test.only('Delete all the orders', async ({ page }) => {
    const email = "hemanthreddybandi@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill('Ashu@_235');
    await page.locator("[value='Login']").click();

    // Wait for the page to load after login
    await page.waitForLoadState('networkidle');

    // Navigate to "My Orders"
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForLoadState('networkidle'); // Wait for all orders to load

    // Wait for the orders table to be visible
    /*
 
     const rows = page.locator("tbody tr");
 
     // Check if any rows are visible
     if (await rows.count() > 0) {
 
         // Iterate over the rows and delete one by one
         for (let i = 0; i < await rows.count(); i++) {
             // Click the delete button for the first row
             await rows.nth(0).locator("button").last().click();
 
             // Wait for network to stabilize before continuing
             await page.waitForLoadState('networkidle');
 
             // Wait for rows to update after each deletion
             await rows.waitFor({ state: 'visible' });
         }
     } else {
         // If no rows are visible, check for and click on "Go Back to Shop"
         if (await page.locator("text=Go Back to Shop").isVisible()) {
             await page.locator("text=Go Back to Shop").click();
         }
     }*/
    await page.waitForTimeout(2000);

    if (await page.locator("tbody").isVisible()) {
        const rows = page.locator("tbody tr");
        if (await rows.count() > 0) {
            // Delete rows one by one
            while (await rows.count() > 0) {
                console.log(`Deleting row, remaining rows: ${await rows.count()}`); // Debugging log

                // Click the delete button in the first row
                await rows.nth(0).locator("button").last().click();

                // Wait for network to stabilize after deletion
                await page.waitForLoadState('networkidle');

                // Wait for the rows to update
                //await rows.waitFor({ state: 'visible' });
                await page.waitForTimeout(2000); // Add a short timeout to let the UI reflect changes

                // Re-check the row count
                if (await rows.count() === 0) {
                    console.log("All rows deleted");
                    break;
                }
            }
        }
    } else {
        // If the tbody is not visible, check for and click on "Go Back to Shop"
        if (await page.locator("text=Go Back to Shop").isVisible()) {
            await page.locator("text=Go Back to Shop").click();
        }
    }
});




