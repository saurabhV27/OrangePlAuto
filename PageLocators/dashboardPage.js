class dashboardPage{

constructor(page){

    this.page = page;
    this.products = page.locator('.card-body');
    this.cartBtn = page.locator('button[routerlink*="cart"]');
}


async productSelect(productName){

        console.log(await this.products.first().textContent());
        await this.products.first().waitFor();
        const allElements = await this.products.allInnerTexts();
        console.log(allElements);
    
        const count = await this.products.count();
        for(let i=0; i<count ; ++i)
            {
            if(await this.products.nth(i).locator('b').textContent() === productName)
                {
                    //click on add to cart 
                    console.log("Clicking the add to cart button !!");
                    await this.products.nth(i).locator("text= Add To Cart").click();
                    break;
        }
        }
    
}

async navigateToCart(){
    await this.cartBtn.click();
}

}
module.exports={dashboardPage};