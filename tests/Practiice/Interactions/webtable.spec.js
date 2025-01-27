const {test, chromium } = require("@playwright/test")


test("WebTable", async()=>{
    const browser =await  chromium.launch();
    const ctx = await browser.newContext();
    const page =await ctx.newPage();
    await page.goto("https://money.rediff.com/index.html")

    const headersLocator = await page.locator("//div[@class='hmbseindicestable show']//ul[@class='bold']//li")
    // Get the count of elements
    const headersCount = await headersLocator.count();
    console.log(`Number of headers: ${headersCount}`);

    await browser.close();

    const rowsLocator = await page.locator("//div[@class='hmbseindicestable show']//ul")

    for(let i=0; i<rows.length; i++){
       if(i==0) continue;
       console.log("Rows : ",rowsLocator[i].locator("//li[@class='alignR']").count)
        let row = rowsLocator[i].locator("//li[@class='alignR']")
        let col = row[0];
        console.log("cols ::  ",col)
    }

    

})