const{test,expect} = require("@playwright/test");
//const { networkInterfaces } = require("node:os");
const {loginPage}=require('../PageLocators/loginPage');
const {dashboardPage} = require('../PageLocators/dashboardPage');
const {cartPage} = require('../PageLocators/cartPage');
const {paymentPage} = require('../PageLocators/paymentPage');
const {orderStatusPage} = require('../PageLocators/orderStatusPage');


test("Navigate to OrangeHRM", async({page})=>{
    
    const username = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const login = page.locator('#login');
    const productName = 'ZARA COAT 3'
    const nameCountry = " India";
    const userEmail = "testEmail@user.automation";
    const pass = "Testthissite@123";


    const lp = new loginPage(page);

    await lp.goTo();
    await lp.invalidCreds();
    await lp.validCreds(userEmail,pass);


    const dp = new dashboardPage(page);
    await dp.productSelect(productName);
    await dp.navigateToCart();

    const cp = new cartPage(page);
    cp.productVerify();

    const pp = new paymentPage(page)
    pp.makePayment(nameCountry,userEmail);
 
   const osp = new orderStatusPage(page);
   const orderID = osp.orderVerify();

   console.log(orderID);
   

   // verifying the order id

//    await page.locator("button[routerlink='/dashboard/myorders']").click();
//    console.log("In the orders list")
//    const orderList =  page.locator('tbody tr');
//    const listCount = await orderList.count();
//    console.log(listCount);
//     for(let i=0; i<listCount;++i){
//         const actualOrderId = await orderList.nth(i).locator('th').textContent();
//         console.log(actualOrderId);

//         if( orderId.includes(actualOrderId)){
//             await orderList.nth(i).locator('button.btn.btn-primary').click();
//             break;
//         }
//     }

//      //Verification of product order summary

//      await expect(page.locator('.tagline').first()).toHaveText("Thank you for Shopping With Us");
  
//      await page.pause();
    
});

