const {expect} = require('@playwright/test');

class paymentPage{

    constructor(page){
        this.page = page;
        this.cardNo = page.locator(".field .input.txt.text-validated");
        this.month = page.locator(".input.ddl");
        this.date = page.locator(".input.ddl");
        this.cvv = page.locator(".field.small .input.txt");
        this.paymentForm = page.locator(".field .input.txt");
        this.applyCoupon = page.locator(".btn.btn-primary.mt-1");
        this.verifyCoupon = page.locator(".mt-1.ng-star-inserted");
        this.country = page.locator('input[placeholder="Select Country"]');
        this.listCountry = page.locator('.ta-results.list-group.ng-star-inserted span');
        this.userEmail = page.locator('.user__name.mt-5 label');
        this.placeOrder = page.locator('//a[text()="Place Order "]');
    }

    async makePayment(nameCountry,userEmail){
            await this.cardNo.fill("1234123412341234");
            await this.month.first().selectOption("03");
            await this.date.last().selectOption("27");
        
            await this.cvv.first().pressSequentially("098");
            await this.paymentForm.nth(2).fill("Test User");
            await this.paymentForm.last().fill("rahulshettyacademy");
            await this.applyCoupon.click();
            await this.verifyCoupon.waitFor();
            expect(this.verifyCoupon).toContainText("Applied");
        
            await this.country.pressSequentially("ind");
            await this.listCountry.first().waitFor();
            const countryCount = await this.listCountry.count();
            //console.log(countryCount);
        
            for(let i=0; i<countryCount;++i){
                if(await this.listCountry.nth(i).textContent() === nameCountry){
                    await this.listCountry.nth(i).click();
                    break;// come out of the loop after sekecting
                    
        
                }
           }
        
           await expect(this.userEmail).toHaveText(userEmail);
           await this.placeOrder.waitFor();
           await this.placeOrder.click();
    }

}
module.exports={paymentPage}