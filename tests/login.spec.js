const{test,expect} = require("@playwright/test")


test("Login to OrangeHRM", async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    await page.pause();





});