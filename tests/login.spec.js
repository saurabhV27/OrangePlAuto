const{test,expect} = require("@playwright/test")


test("Navigate to OrangeHRM", async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await expect(page).toHaveTitle('OrangeHRM');

    await page.locator("input[name='username']").fill('Admin123');
    await page.locator("input[name='password']").fill('admin123565');
    await page.locator("button[type='submit']").click();
    const errorMsg = await page.locator(".oxd-text.oxd-text--p.oxd-alert-content-text").textContent();
    await expect(page.locator(".oxd-text.oxd-text--p.oxd-alert-content-text")).toContainText('Invalid');
    await page.pause();

    //loggin in to the web url
});

