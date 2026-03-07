const{test,expect} = require("@playwright/test");

test("Event Booking",async({page})=>{
   
    const emailId = 'testEmail@user.automation'
    const password = 'Testthissite@123'
    const description = 'This is a Description for test'
    const city = 'Banglore'
    const venue = 'Test area 123 at automation road'
    const price = '300'
    const seats = '5'
   



    await page.goto('https://eventhub.rahulshettyacademy.com');
   

//Login 

    await page.getByPlaceholder('you@email.com').fill(emailId);
    await page.getByLabel('Password').fill(password);
    await page.locator('#login-btn').click();
    await expect(page.locator('span.inline-flex ').first()).toBeVisible();


    //Create a new Event

    await page.goto('https://eventhub.rahulshettyacademy.com/admin/events');
    const title = `Test Event ${Date.now()}`;
    await page.locator('#event-title-input').fill("Savs"+title);
    await page.locator('#admin-event-form textarea').fill(description);
    await page.getByLabel('City').fill(city);
    await page.getByLabel('Venue').fill(venue);

    const date = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days ahead
    const isoValue = date.toISOString().slice(0, 16); // for input
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const humanValue = `${String(date.getDate()).padStart(2,'0')}/` +
                     `${String(date.getMonth()+1).padStart(2,'0')}/` +
                     `${date.getFullYear()},${String(hours).padStart(2,'0')}:${minutes} ${ampm}`;

  await page.getByLabel('Event Date & Time').fill(isoValue);
  console.log('Event scheduled for:', humanValue);


    await page.getByLabel('Price ($)').fill(price);
    await page.getByLabel('Total Seats').fill(seats);
    
    await page.locator('#add-event-btn').click();


    await page.pause();

    
})

