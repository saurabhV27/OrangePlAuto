const{test,expect} = require("@playwright/test");
const {POManager} = require('../PageLocators/POManager');
const dataTest = JSON.parse(JSON.stringify(require('../testData.json')));
const {customTest} = require("../test-fixture");


test.only("Navigate to OrangeHRM", async({page})=>{
    
    const manager = new POManager(page);
    const lp = manager.getLogin();

    await lp.goTo();
    await lp.invalidCreds();
    await lp.validCreds(dataTest.userEmail,dataTest.pass);

    const dp = manager.getDashboard();
    await dp.productSelect(dataTest.productName);
    await dp.navigateToCart();

    const cp = manager.getCart();
    await cp.productVerify();

    const pp = manager.getPayment();
    await pp.makePayment(dataTest.nameCountry,dataTest.userEmail);
 
    const osp = manager.getOrderStatus();
    const orderID = await osp.orderVerify();

    const mop = manager.getMyOrders();
    await mop.verifyOrderId(orderID);
    await mop.verifyTagLine();
    
});


customTest('customer fixture',async({browser,testDataFix})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const login = page.locator('#login');
    const products = page.locator('.card-body');

    
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    

    await username.fill(testDataFix.userEmail);
    await password.fill(testDataFix.pass);
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
        if(await products.nth(i).locator('b').textContent() === testDataFix.productName)
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





})

