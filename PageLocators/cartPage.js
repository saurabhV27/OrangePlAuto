const {expect} = require('@playwright/test');

class cartPage{

    constructor(page){
        this.page = page;
        this.cartSection = page.locator('.cartSection');
        this.product = page.locator('h3:has-text("ZARA COAT 3")');
        this.checkoutBtn = page.locator("button[type='button']");
 }


 async productVerify(){
     await this.cartSection.first().waitFor();
     const bool = await this.product.isVisible();
     expect(bool).toBeTruthy();
     await this.checkoutBtn.last().click();
 }
}
module.exports={cartPage}