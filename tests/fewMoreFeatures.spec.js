const {test,expect} = require('@playwright/test');

test('few more features',async({page})=>{

    page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    await expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeHidden();
    await page.pause();

    page.on('dialog',dialog=>dialog.accept());
    await page.locator('#confirmbtn').click();
    await page.locator('#mousehover').hover();

    //Playing with iFrames

    const iFrames =  page.frameLocator('#courses-iframe');
    await iFrames.locator("li a[href*='lifetime-access']:visible").click();
    const innerText = await iFrames.locator("div.text h2").textContent();
    console.log(innerText);
    console.log(innerText.split(" ")[1]);



})