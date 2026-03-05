const{test,expect} = require('@playwright/test');

test.only("Calendar Handling",async({page})=>{
    const year = "2027"
    const month = "6"
    const date = "15"
    const expectedDate =[month,date,year]

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator('.react-date-picker__inputGroup').click();
    
    await page.locator('.react-calendar__navigation__label__labelText--from').click();
    await page.locator('.react-calendar__navigation__label__labelText--from').click();
    await page.getByText(year).click();
    await page.locator('.react-calendar__year-view__months__month').nth(Number(month)-1).click();
    await page.locator('//abbr[text()="'+date+'"]').click();
    await page.pause();
    

    const datevalidation = page.locator('.react-date-picker__inputGroup input');
    const initilValue = await datevalidation.first().getAttribute('value');
    console.log(initilValue);

    for(let i=0;i<expectedDate.length;i++){
        const value = await datevalidation.nth(i+1).inputValue();
        await expect(value).toEqual(expectedDate[i]);
    }



    await page.pause();

})


