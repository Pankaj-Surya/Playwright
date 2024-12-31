const {test, expect} = require('@playwright/test');

const {POManager}  = require('../../../pageobjects/POManager')
 //Json->string->js object
const dataset =  JSON.parse(JSON.stringify(require("../../../utils/placeorderTestData.json")));

for(const data of dataset){
    test(`@Webs Client App login for ${data.productName}`, async ({page})=>{
           //js file- Login js, DashboardPage
           const us = data.username;
           const ps = data.password;
           console.log(us, ps);
           const poManager = new POManager(page);
           const loginPage = poManager.getLoginPage()
           await loginPage.goto()
           await loginPage.login(us, ps)
                           
    })
}