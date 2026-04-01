const {expect} = require('@playwright/test');

class loginPage{

    constructor(page){

        this.page=page;
        this.userName = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.loginBtn = page.locator('#login');

        this.error = page.locator('#toast-container');

 }

 async goTo(){
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
 }

 async invalidCreds(){
     await this.userName.fill("justnothing@nothing.com");
    await this.password.fill("wateroverhead");
    await this.loginBtn.click();
    const errorMsg = await this.error.textContent();
    console.log(errorMsg);
    //Error message Validation
    expect(this.error).toContainText('Incorrect');
 }

 async validCreds(userName,password){
     await this.userName.fill(userName);
    await this.password.fill(password);
    await this.loginBtn.click();
    console.log(await this.page.title());
    expect(this.page).toHaveTitle("Let's Shop");
 }

}
module.exports= {loginPage};