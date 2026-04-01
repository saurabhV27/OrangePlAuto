const{expect,test} = require("@playwright/test");

test('Get By Locators',async ({page})=>{

    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("Password");
    await page.getByRole("button",{name: 'Submit'}).click();
    const bool = await page.getByText(" The Form has been submitted successfully!.").isVisible();
    console.log(bool);
    await page.getByRole("link",{name:"Shop"}).click();
    await page.locator('app-card').filter({hasText:'Blackberry'}).getByRole('button').click();
    await page.pause();



})