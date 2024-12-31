import { chromium, expect,test } from '@playwright/test';

test("Window Handling", async () => {
    const browser = await chromium.launch();
    const page =  await browser.newPage();
    page.goto("https://demoqa.com/browser-windows")
    const [newWindow] = await Promise.all([
        page.locator("//button[@id='windowButton']").click(),
    ])
})


test("Window Handling-2", async () => {
    const browser = await chromium.launch();
    const page =  await browser.newPage();
    page.goto("https://www.lambdatest.com/selenium-playground/window-popup-modal-demo")

    const [newWindow] = await Promise.all([
        page.waitForEvent("popup"),
        page.click("'Follow On Twitter'")
    ]
    )
    console.log(newWindow.url());

})
