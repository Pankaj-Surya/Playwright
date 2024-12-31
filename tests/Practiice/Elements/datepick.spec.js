const { test, expect } = require('@playwright/test');

test('Datepicker Test', async ({ page }) => {
    await page.goto('https://demo.automationtesting.in/Datepicker.html');
  
    // Assuming there are input fields for datepicker
    const datepickerSelector = '#datepicker1';
  
    // Click on the datepicker field to open the calendar
    await page.click(datepickerSelector);
  
    let month = await page.locator("xpath=//span[@class='ui-datepicker-month']").textContent()
    let year = await page.locator("xpath=//span[@class='ui-datepicker-year']").textContent()

    console.log("month: " + month, "year: " + year)
     
    // const Gmonth = September
    const GYear = 2021; // Adjusted the target year here
    const GMonth = "September";
    while (year != GYear) {
        if (GYear < year) {
            console.log("year: " + year, "GYear: " + GYear)
            await page.click("xpath=//span[@class='ui-icon ui-icon-circle-triangle-w']")
        } else if (GYear > year) {
            console.log("===================")
            await page.click("xpath=//span[@class='ui-icon ui-icon-circle-triangle-e']")  
        } else {
            console.log("8888888888888888888888888")
            break;
        }
        
        // Update the year value after the click
        year = await page.locator("xpath=//span[@class='ui-datepicker-year']").textContent()
    }

     
    console.log("month: " + month, "year: " + year)
    await page.waitForTimeout(5000) 
    console.log(" =================================================")

    while (monthOrder(month) != monthOrder(GMonth)) {
        console.log("month: " + month, "Gmonth: "+ GMonth)
        if ( year === GYear && monthOrder(month) == monthOrder(GMonth) ) {
            break;
        } else if (year === GYear && monthOrder(GMonth) < monthOrder(month)) {  // 9 < 12
            await page.click("xpath=//span[@class='ui-icon ui-icon-circle-triangle-w']") 
        } else {
            await page.click("xpath=//span[@class='ui-icon ui-icon-circle-triangle-e']")
        }
        
        // Update the month value after the click
        month = await page.locator("xpath=//span[@class='ui-datepicker-month']").textContent()
    }

    console.log("after month: " + month, "after year: " + year)
    await page.waitForTimeout(5000)    
    // Close the browser
    await page.close();
});

// Function to get the order of the month
function monthOrder(month) {
    const monthsOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthsOrder.indexOf(month);
}
