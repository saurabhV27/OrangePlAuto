const base = require('@playwright/test');


exports.customTest = base.test.extend({

testDataFix :{
    productName : "ZARA COAT 3",
    nameCountry : " India",
    userEmail : "testEmail@user.automation",
    pass : "Testthissite@123"
}

})