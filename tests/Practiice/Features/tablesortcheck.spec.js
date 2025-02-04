const { test, chromium } = require("@playwright/test")


test("Webtable sorting", async () => {
    const broswer = await chromium.launch({
        args: ["--start-maximized"]
    });
    const ctx = await broswer.newContext({ viewport: null });
    const page = await ctx.newPage();

    await page.goto("https://demoqa.com/webtables");

    //div[@class='rt-tr-group']//div[@class='rt-td']
    // Get all rows using XPath
    const rows = await page.locator("//div[@class='rt-tr-group']").all(); // FIX: Use .all()
    console.log("No of rows:", rows.length);


    let firstNameBeforeArr = [];
    for (const row of rows) {
        const firstname = await row.locator("//div[@class='rt-td']").nth(1).textContent();
        const lastname = await row.locator("//div[@class='rt-td']").nth(2).textContent();
        const age = await row.locator("//div[@class='rt-td']").nth(3).textContent();
        if (firstname.trim() != '') {
            firstNameBeforeArr.push(firstname);
            console.log(firstname + " , " + lastname + " , " + age)
        }
    }

    // console.log("Before Sorting : " + firstNameBeforeArr);
    // console.log("After Sorting : " + firstNameBeforeArr.sort());

    // Convert both lists to lowercase for case-insensitive comparison
    let expectedSortedNames = [...firstNameBeforeArr].map(name => name.toLowerCase()).sort();
    let actualSortedNames = firstNameBeforeArr.map(name => name.toLowerCase());


    console.log("Before Sorting : " + expectedSortedNames.sort());
    console.log("After Sorting : " + actualSortedNames);

    if (JSON.stringify(actualSortedNames) === JSON.stringify(expectedSortedNames.sort())) {
        console.log("\n✅ Table is sorted correctly by First Name.");
    } else {
        console.log("\n❌ Table is NOT sorted correctly.");
    }
    await broswer.close();

})