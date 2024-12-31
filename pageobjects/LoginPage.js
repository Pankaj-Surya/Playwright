class LoginPage{
    constructor(page){
       this.page = page 
       
       this.username =  page.locator("#userEmail");
       this.password = page.locator("#userPassword")
       this.signInButton = page.locator("[value='Login']");
        page.waitForLoadState('networkidle');
    }

    async goto(){
         await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async login(us,ps){
       await this.username.fill(us)
        await this.password.fill(ps)
        await this.signInButton.click()
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = {LoginPage}