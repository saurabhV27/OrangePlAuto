const { expect,test } = require("@playwright/test")

test("UI Automation",async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    const usernName = page.locator('#username');
    const password = page.locator('#password');
    const submit = page.locator('#signInBtn');
    const documentLink = page.locator('[href*="documents-request"]');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    //Invalid credentials

    await usernName.fill('something');
    await password.fill('other@123');
    await submit.click();
    const errorMsg = await page.locator("div[style*='block']").textContent();
    console.log(errorMsg);
    await expect(page.locator("div[style*='block']")).toContainText("Incorrect");

    //Valid credentials with radio button

    await usernName.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');
    await page.locator('span.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    await expect(page.locator('span.radiotextsty').last()).toBeChecked();
    await page.locator('select.form-control').selectOption('Consultant');
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");


    await page.pause();
})

test.only("Handling child window", async({browser})=>{
const context = await browser.newContext();
const page = await context.newPage();
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
const documentLink = page.locator('[href*="documents-request"]');
const usernName = page.locator('#username');

//Handling child window
const [newpage] = await Promise.all ([
context.waitForEvent('page'),
documentLink.click(),
])
const textCon = await newpage.locator("div p.im-para.red").textContent();
 console.log(textCon);

 const splitsent = textCon.split("@");
 const finalreq = splitsent[1].split(" ")[0];
 //console.log(finalreq);

 await usernName.fill(finalreq);
 console.log(await usernName.inputValue());
 await page.pause();

})
