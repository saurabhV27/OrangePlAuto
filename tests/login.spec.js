const{test,expect} = require("@playwright/test");
//const { networkInterfaces } = require("node:os");


test("Navigate to OrangeHRM", async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const login = page.locator('#login');
    const products = page.locator('.card-body');
    const productName = 'ZARA COAT 3'
    const paymentForm = page.locator(".field .input.txt");
    const listCountry = page.locator('.ta-results.list-group.ng-star-inserted span');
    const nameCountry = " India";

    
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
    await products.first().waitFor();
    const allElements = await products.allInnerTexts();
    console.log(allElements);

    const count = await products.count();
    for(let i=0; i<count ; ++i)
        {
        if(await products.nth(i).locator('b').textContent() === productName)
            {
                //click on add to cart 
                console.log("Clicking the add to cart button !!");
                await products.nth(i).locator("text= Add To Cart").click();
                break;
    }
    }

    await page.locator('button[routerlink*="cart"]').click();
    await page.locator('.cartSection').first().waitFor();
    const bool = await page.locator('h3:has-text("ZARA COAT 3")').isVisible();
    expect(bool).toBeTruthy();
    await page.locator("button[type='button']").last().click();

    //Payment page

    await page.locator(".field .input.txt.text-validated").fill("1234123412341234");
    await page.locator(".input.ddl").first().selectOption("03");
    await page.locator(".input.ddl").last().selectOption("27");

    await page.locator(".field.small .input.txt").first().pressSequentially("098");
    await paymentForm.nth(2).fill("Test User");
    await paymentForm.last().fill("rahulshettyacademy");
    await page.locator(".btn.btn-primary.mt-1").click();
    expect(page.locator(".mt-1.ng-star-inserted")).toContainText("Applied");

    await page.locator('input[placeholder="Select Country"]').pressSequentially("ind");
    await listCountry.first().waitFor();
    const countryCount = await listCountry.count();
    console.log(countryCount);

    for(let i=0; i<countryCount;++i){
        if(await listCountry.nth(i).textContent() === nameCountry){
            console.log ("Entering the country condition")
            await listCountry.nth(i).click();
            break;

        }
   }
    



    await page.pause();

    
});

