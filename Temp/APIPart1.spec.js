const{test,expect,request} = require('@playwright/test');
const payloadData = {userEmail: "testEmail@user.automation" , userPassword: "Testthissite@123"};
let token;

test.beforeAll("API for Login",async()=>{
    const apiRequest = await request.newContext();
    const loginRequest = await apiRequest.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data : payloadData
        }
);
expect(loginRequest.ok()).toBeTruthy();
const loginResponseJson = await loginRequest.json();
token = await loginResponseJson.token;
console.log(token);

});


test("Navigate to OrangeHRM", async({page})=>{
    await page.addInitScript(value=>{

        window.localStorage.setItem('token',value);

    },token
    );
    
    const products = page.locator('.card-body');
    const productName = 'ZARA COAT 3'
    const paymentForm = page.locator(".field .input.txt");
    const listCountry = page.locator('.ta-results.list-group.ng-star-inserted span');
    const nameCountry = " India";
    const email = "testEmail@user.automation";

    
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    
   
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
    await page.locator(".mt-1.ng-star-inserted").waitFor();
    expect(page.locator(".mt-1.ng-star-inserted")).toContainText("Applied");

    await page.locator('input[placeholder="Select Country"]').pressSequentially("ind");
    await listCountry.first().waitFor();
    const countryCount = await listCountry.count();
    //console.log(countryCount);

    for(let i=0; i<countryCount;++i){
        if(await listCountry.nth(i).textContent() === nameCountry){
            await listCountry.nth(i).click();
            break;// come out of the loop after sekecting
            

        }
   }

   await expect(page.locator('.user__name.mt-5 label')).toHaveText(email);
   await page.locator('//a[text()="Place Order "]').waitFor();
   await page.locator('//a[text()="Place Order "]').click();

   //verifying the Thankyou message
   await page.locator('.hero-primary').waitFor();
   expect(page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ");
   const orderNo = await page.locator("label.ng-star-inserted").innerText();
   let orderId = orderNo.split("|")[1];
   orderId = orderId.trim();
   console.log(orderId);

   // verifying the order id

   await page.locator("button[routerlink='/dashboard/myorders']").click();
   console.log("In the orders list")
   const orderList =  page.locator('tbody tr');
   const listCount = await orderList.count();
   console.log(listCount);
    for(let i=0; i<listCount;++i){
        const actualOrderId = await orderList.nth(i).locator('th').textContent();
        console.log(actualOrderId);

        if( orderId.includes(actualOrderId)){
            await orderList.nth(i).locator('button.btn.btn-primary').click();
            break;
        }
    }

    //Verification of product order summary

    await expect(page.locator('.tagline').first()).toHaveText("Thank you for Shopping With Us");
  
   await page.pause();
    
});

