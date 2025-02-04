const { test, firefox } = require('@playwright/test');

test("Broken Link", async () => {
    const browser = await firefox.launch({ headless: true });
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const brokenLinks = [];

    await page.goto("https://www.flipkart.com/");
    await page.waitForSelector("//div[@class='_1ZMrY_']");

    const links = page.locator("//div[@class='_1ZMrY_']/div/a");
    const linkCount = await links.count();
    console.log("Total Links: " + linkCount);

    if (linkCount === 0) {
        console.log("No links found in the specified XPath.");
        return;
    }

    for (let i = 0; i < linkCount; i++) {
        const link = links.nth(i);
        let href = await link.getAttribute("href");
        console.log("Raw Link: " + href);

        if (!href) {
            console.log("⚠️ Missing or invalid href attribute.");
            continue;
        }

        if (!href.startsWith("http")) {
            href = new URL(href, "https://www.flipkart.com").toString();
        }

        try {
            const response = await page.request.get(href);
            if (response.status() >= 400) {
                console.log(`❌ Broken link: ${href} (Status: ${response.status()})`);
                brokenLinks.push({ href, status: response.status() });
            } else {
                console.log(`✅ Valid link: ${href} (Status: ${response.status()})`);
            }
        } catch (error) {
            console.log(`⚠️ Error fetching link: ${href}. Error: ${error.message}`);
        }

        // Add a short delay between requests
        await page.waitForTimeout(200);
    }

    console.log("Broken Links Report:", brokenLinks);
    await browser.close();
});
