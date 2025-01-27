const { chromium, expect, test } = require("@playwright/test")


test("Amazon search amd checkout", async () => {
    const browser = await chromium.launch();
    const ctx = await browser.newContext();
    const page = await ctx.newPage();

    //console.log(await page.getTitle())

    // expect(page).toHaveTitle("");

    await page.goto("https://www.amazon.in/")
    await page.waitForTimeout(2000);

    // Wait for manual CAPTCHA solving if detected
    await page.waitForFunction(() => document.title.includes('Online Shopping site'), { timeout: 5 * 60 * 1000 });
    console.log('CAPTCHA solved, proceeding with script...');

    // Search for "Samsung Mobiles"
    const searchBox = page.locator('//input[@id="twotabsearchtextbox"]');
    await searchBox.fill('Samsung Mobiles');

    const searchButton = page.locator('//input[@id="nav-search-submit-button"]');
    await searchButton.click();

    // Wait for product list to load
    const productLinks = page.locator("//a[@class='a-link-normal s-line-clamp-2 s-link-style a-text-normal']", { strict: false });


    await productLinks.nth(1).waitFor({ state: "attached" });

    const productCount = await productLinks.count();
    console.log(`Total Products Found: ${productCount}`);


    

    //await productLinks.nth(2).click();
    const [productPage] = await Promise.all([
        ctx.waitForEvent('page'),
       productLinks.nth(2).click()
    ])

    await productPage.waitForLoadState('domcontentloaded');


    // Wait for the price to be visible
    const priceEle = productPage.locator("//div[@class='a-section a-spacing-none aok-align-center aok-relative']//span[@class='a-price-whole']");
    await priceEle.waitFor({ state: "attached" });
    const priceText = await priceEle.innerText();
    console.log(`Price: ${priceText}`);


    // await page.waitForTimeout(10000);

    // await page.locator("twotabsearchtextbox").fill("samsung mobile")
    // await page.locator("nav-search-submit-button").click()
    // const productsList = await page.locator("//a[@class='a-link-normal s-line-clamp-2 s-link-style a-text-normal']").waitForSelector()
    // console.log(productsList)
    // const productsList1 = await page.locator("//a[@class='a-link-normal s-line-clamp-2 s-link-style a-text-normal']")
    // console.log("productsList1 : " + productsList)
})