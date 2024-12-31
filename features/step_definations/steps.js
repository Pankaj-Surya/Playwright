const { defineParameterType, When, Given, Then } = require("@cucumber/cucumber");
const playwright = require('@playwright/test');
const { chromium, expect } = require("@playwright/test");
const { POManager } = require("../../pageobjects/POManager");

let poManager;

// Define a custom parameter type to handle the transformation
// defineParameterType({
//     name: 'cleanString',
//     regexp: /"([^"]*)"/,
//     transformer: str => str.replace(/["<>]/g, '')
//   });

Given('a login to Ecommerece application with {word} and {word}', async function (username, password) {
    console.log("Given Before : ", username, password);
    // Removing angle brackets and double quotes from username and password
    username = username.replace(/["<>]/g, '');
    password = password.replace(/["<>]/g, '');

    console.log("Given After : ", username, password);
    //     console.log("i am first");
    const browser = await playwright.chromium.launch({
        headless: false,
    });
    const context = await browser.newContext();
    this.page = await context.newPage();
    poManager = new POManager(this.page);
    await poManager.loginPage.goto();

    await poManager.loginPage.login(username, password);
    //this.page.pause()
});

When('Add {string} to Cart', async function (prod) {
    console.log("Add ", await prod)
    await poManager.dashboardPage.searchProductAddCart(prod)
    await poManager.dashboardPage.navigateToCart()
});




Then('Verify that {string} is displayed in the Cart', async function (prod) {
    console.log("verify ", prod)
    await poManager.cartPage.verifyProductIsDisplayed(prod)
    await poManager.cartPage.checkout()
    //await this.page.pause()
    // Write code here that turns the phrase above into concrete actions
    // return 'pending';
});

When('Enter valid details and place the Order', async function () {
    console.log("Place Order")
    const ordersReviewPage = poManager.ordersReviewPage
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(this.orderId);
});

Then('Verify that order is present in the OrderHistory', async function () {
    await this.page.locator("button[routerlink*='myorders']").click();
    const orderHistoryPage = poManager.orderHistoryPage
    console.log('orderHistoryPage:', orderHistoryPage);
    //await orderHistoryPage.searchOrderAndSelect(this.orderId)
    //await orderHistoryPage.searchOrderAndSelect(this.orderId)
    console.log("present in the OrderHistory")


    // Write code here to verify order in OrderHistory
    //return 'pending';
});



// Login Validation

Given('a login to Ecommerce2 application with {string} and {string}', async function (us, ps) {
    // Verify that the page object is properly initialized
    const browser = await playwright.chromium.launch({
        headless: false,
    });
    const context = await browser.newContext();
    this.page = await context.newPage();
    //console.log('Page object:', this.page);

    // Navigate to the login page
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    // Log the page title to verify successful navigation
    console.log('Page title:', await this.page.title());

    // Perform login actions
    const userName = await this.page.locator('#username');
    const passwordInput = await this.page.locator("[type='password']");
    const signInButton = await this.page.locator("#signInBtn");

    await userName.fill(us);
    await passwordInput.fill(ps);
    await signInButton.click();

});


Then('Verify Error message is displayed', async function () {
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});









// const { Given, When, Then } = require("@cucumber/cucumber");
// const { chromium, expect } = require("@playwright/test");

// Given("User navigates to the application", async () => {
//   const browser = await chromium.launch({ headless: false });
//   const context = await browser.newContext();
//   this.page = await context.newPage();
//   await this.page.goto("https://talent500.co/auth/signin");
// });

// When("I enter the username as {string}", async (username) => {
//   console.log("us .......... => ", username)
//   await this.page.locator("[data-id=email-field-login]").click();
//   await this.page.locator("[data-id=email-field-login]").type(username);
// });

// When("I enter the password as {string}", async (password) => {
//   await this.page.locator("[data-id=password-field-login]").click();
//   await this.page.locator("[data-id=password-field-login]").type(password);
// });

// When("I click on login button", async () => {
//   await this.page.locator("[data-id=submit-login-btn]").click();
// });

// Then("User should be logged in successfully", async () => {
//   const text = await this.page.locator('[id="progress-bar"]').textContent();
//   expect(text).toContain("PROFILE");
// });

// Then("Logout from the application", async () => {
//   await this.page.locator('[alt="DropDown Button"]').click();
//   await this.page.locator('[data-id="nav-dropdown-logout"]').click();
// });





