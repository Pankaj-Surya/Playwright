const { test, expect } = require('@playwright/test');
const { customtest } = require('../utils/test-base')
const { POManager } = require('../pageobjects/POManager')


customtest(`Custom Test Client App login `, async ({ page, testDataForOrder }) => {
    //js file- Login js, DashboardPage
    console.log(testDataForOrder.username, testDataForOrder.password);
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage()
    await loginPage.goto()
    await loginPage.login(testDataForOrder.username, testDataForOrder.password)

})
