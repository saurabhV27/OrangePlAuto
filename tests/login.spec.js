const{test,expect} = require("@playwright/test")


test("Navigate to OrangeHRM", async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const login = page.locator('#login');
    const products = page.locator('.card-body h5 b');
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    
    //Invalid creds
    await username.fill("justnothing@nothing.com");
    await password.fill("wateroverhead");
    await login.click();
    const errorMsg = await page.locator('#toast-container').textContent();
    console.log(errorMsg);
    //Error message Validation
    expect(page.locator('#toast-container')).toContainText('Incorrect');

    //Valid creds

    await username.fill("testEmail@user.automation");
    await password.fill("Testthissite@123");
    await login.click();
    console.log(await page.title());
    expect(page).toHaveTitle("Let's Shop");

    //Get the name of the first product

    console.log(await products.first().textContent());
    const allElements = await products.allInnerTexts();
    console.log(allElements);



    
    await page.pause();

    
});

