const{test,expect} = require("@playwright/test")


test("Login to OrangeHRM", async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await expect(page).toHaveTitle('OrangeHRM');

    //loggin in to the web url

    await page.locator("input[name='username']").fill('Admin');
    await page.locator("input[name='password']").fill('admin123');
    await page.locator("button[type='submit']").click();

    await page.pause();





});