const{test,expect} = require("@playwright/test");
const {POManager} = require('../PageLocators/POManager');


test("Navigate to OrangeHRM", async({page})=>{
    
    const username = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const login = page.locator('#login');
    const productName = 'ZARA COAT 3'
    const nameCountry = " India";
    const userEmail = "testEmail@user.automation";
    const pass = "Testthissite@123";

    const manager = new POManager(page);


    const lp = manager.getLogin();

    await lp.goTo();
    await lp.invalidCreds();
    await lp.validCreds(userEmail,pass);


    const dp = manager.getDashboard();
    await dp.productSelect(productName);
    await dp.navigateToCart();

    const cp = manager.getCart();
    await cp.productVerify();

    const pp = manager.getPayment();
    await pp.makePayment(nameCountry,userEmail);
 
    const osp = manager.getOrderStatus();
    const orderID = await osp.orderVerify();

    const mop = manager.getMyOrders();
    await mop.verifyOrderId(orderID);
    await mop.verifyTagLine();

    
});

