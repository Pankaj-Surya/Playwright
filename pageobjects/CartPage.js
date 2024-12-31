const {test,expect} = require("@playwright/test")

class CartPage{

    constructor(page){
      this.page = page
      this.cartProducts = page.locator("div li")
      this.checkoutBtn = page.locator("text=Checkout")
      this.cart =  page.locator("[routerlink*='cart']");
      this.orders = page.locator("button[routerlink*='myorders']");
    }
      
    async verifyProductIsDisplayed(productName){
       await this.cartProducts.first().waitFor({state :"visible"})
       const bool = await this.getProductLocator(productName)
       await expect(bool).toBeTruthy()
    }

    async checkout(){
       await this.checkoutBtn.click()
    }


    async getProductLocator(productName){
     return  await this.page.locator("h3:has-text('"+productName+"')").isVisible();
    }




}

module.exports = {CartPage}