const{test,expect} = require("@playwright/test");
const {POManager} = require('../PageLocators/POManager');
const dataTest = JSON.parse(JSON.stringify(require('../testData.json')));


test("Navigate to OrangeHRM", async({page})=>{
    
    /*Data below is driven from external JSON*/ 
    
    // const productName = 'ZARA COAT 3'
    // const nameCountry = " India";
    // const userEmail = "testEmail@user.automation";
    // const pass = "Testthissite@123";

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

