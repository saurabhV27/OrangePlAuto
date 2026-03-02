const{expect,test} = require("@playwright/test");

test('Get By Locators',async ({page})=>{

    await page.goto('https://rahulshettyacademy.com/angularpractice/');

    await page.pause();


})