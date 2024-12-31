const {test,expect} = require("@playwright/test")

test.describe.configure({ mode: 'parallel' });

test( "Demo sign in ",async ({page})=>{
  await page.goto("https://track-cargo-dev.web.app/")
  await page.locator("//button[normalize-space()='Register']").click()
  await page.locator("//input[@id='email']").fill("sam@gmail.com")
  await page.locator("#password").fill("sam@123")
  await page.locator("//input[@id='confirmPassword']").fill("sam@123") 
  await page.locator("button[type='submit']").click()
  await page.on('dialog', dialog => dialog.accept())
  await expect(page).toHaveURL("https://track-cargo-dev.web.app/register")  
  //await page.locator("")
})


test("Demo Login", async ({page})=>{
  await page.goto("https://track-cargo-dev.web.app/")
  await page.locator("button[routerlink='/login']").click()
  await page.locator("//input[@id='email']").fill("sam@gmail.com")
  await page.locator("//input[@id='password']").fill("sam@123")
  await page.locator("button[type='submit']").click()
  await page.on('dialog', dialog => dialog.accept())

})