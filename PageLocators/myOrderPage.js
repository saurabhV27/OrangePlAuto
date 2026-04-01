const {expect} = require('@playwright/test');
class myOrderPage{
    constructor(page){
        this.page = page;
        this.myOrderBtn = page.locator("button[routerlink='/dashboard/myorders']");
        this.orderList = page.locator('tbody tr');
        this.verifyText = page.locator('.tagline');
    }

    async verifyOrderId(orderId){
         await this.myOrderBtn.click();
         console.log("In the orders list");
         const listCount = await this.orderList.count();
         console.log(listCount);
         for(let i=0; i<listCount;++i){
         const actualOrderId = await this.orderList.nth(i).locator('th').textContent();
         console.log(actualOrderId);

         if( orderId.includes(actualOrderId)){
            await this.orderList.nth(i).locator('button.btn.btn-primary').click();
            break;
        }
    }
    }

    async verifyTagLine(){
        await expect(this.verifyText.first()).toHaveText("Thank you for Shopping With Us");
    }
}
module.exports = {myOrderPage};