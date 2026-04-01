const {expect} = require('@playwright/test');
class orderStatusPage{

    constructor(page){

        this.page = page;
        this.msgVerify = page.locator('.hero-primary');
        this.orderID = page.locator("label.ng-star-inserted");

    }

   async orderVerify(){
        await this.msgVerify.waitFor();
        expect(this.msgVerify).toHaveText(" Thankyou for the order. ");
        const orderNo = await this.orderID.innerText();
        let orderId = orderNo.split("|")[1];
        orderId = orderId.trim();
        console.log(orderId);
        return orderId;
    }

}
module.exports = {orderStatusPage};