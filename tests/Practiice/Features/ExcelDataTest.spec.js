const { test, expect } = require('@playwright/test');
const ExcelJS = require('exceljs'); 
const { ExcelUtils } = require('../../../utils/ExcelUtils');

//update Mango Price to 350. 
//writeExcelTest("Mango",350,{rowChange:0,colChange:2},"/Users/rahulshetty/downloads/excelTest.xlsx");
test('Upload download excel validation',async ({page})=>
{
  const excelUtils = new ExcelUtils()
  const textSearch = 'Mango';
  const updateValue = '350';
  await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
  page.pause()
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button',{name:'Download'}).click();
  await downloadPromise;
  excelUtils.writeExcelTest(textSearch,updateValue,{rowChange:0,colChange:2},"D:/Downloads/download.xlsx");
  await page.locator("#fileinput").click();
  await page.locator("#fileinput").setInputFiles("D:/Downloads/download.xlsx");
  const textlocator = page.getByText(textSearch);
  const desiredRow = await page.getByRole('row').filter({has :textlocator });
  await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
})





test.only('Login cred with excel', async ({ page }) => {
   const workbook = new ExcelJS.Workbook();
   await workbook.xlsx.readFile('E:/Playwright/Practice/credentials.xlsx'); // Assuming the Excel file is named 'credentials.xlsx'
   
   const worksheet = workbook.getWorksheet(1);
   let statusColumn = worksheet.getColumn('C');


   for (let i = 2; i <= statusColumn.values.length; i++) {
       const username = worksheet.getCell(`A${i}`).value;
       const password = worksheet.getCell(`B${i}`).value;
       // Check if username or password is empty
       if (!username || !password) {
        console.log(`Empty username or password at row ${i}, skipping...`);
        continue;
    }

       console.log(username, password);
       const currentURL = await page.url();
       console.log("Current URL:", currentURL)
       if (currentURL.includes("https://rahulshettyacademy.com/client/dashboard/dash")) {
       await page.click("button:has-text('Sign Out')");
       }
       await page.goto("https://rahulshettyacademy.com/client");
       await page.locator("#userEmail").fill(username);
       await page.locator("#userPassword").fill(password);
       //page.pause();

       await page.locator("[value='Login']").click();

       
       const inval = await page.getByLabel('Incorrect email or password.');
       const logout = await page.locator("//button[normalize-space()='Sign Out']")
      // console.log("logout :  ", await logout.textContent())

       // Check if login was successful
       
      // Wait for navigation to complete

    const isLoggedIn = await page.url();
    console.log("Current URL after login:", isLoggedIn);

    const statusCell = worksheet.getCell(`C${i}`);
    
    if (isLoggedIn === "https://rahulshettyacademy.com/client/dashboard/dash") {
        statusCell.value = 'pass';
        console.log("Login successful.");
    } else {
        statusCell.value = 'fail';
        console.log("Login failed.");
    }

   }

   // Save the workbook with updated status
   await workbook.xlsx.writeFile('credentials.xlsx');
});

