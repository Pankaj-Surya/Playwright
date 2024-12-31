await page.waitForTimeout(5000);

await page.waitForTimeout(5000);


npx playwright test test1.spec.js --project chromium --headed

---------------

playwright config

use : {
    screenshot : "on"
    trace : "on"
}

------------------------

projects: [
        {
            name: 'chrome',
            use: {
                browserName: "chromium",
                headless: false,
                video: 'retain-on-failure',
                screenshot: "on",
                tarce: "on",
                ignoreHTTPSErrors: true,  // ssl certificate
                permissions: ['geolocation'],
                viewport: { height: 720, width: 720 },
            },
        },

        {
            name: 'firefox',
            use: {
                browserName: "firefox",
                screenshot: "on",
                tarce: "on",
                ...devices['Desktop Firefox']
            },
        },

        
    ],


npx playwright test CustomTest.spec.js --config playwright.config1.js

npx playwright test CustomTest.spec.js --config playwright.config1.js --project=chrome

--------------------------------------
retries: 1, // failed testcase retry one time

--------------------------------------

test files will trigger parallely

workes : 4 // indicate file parallel

individual tests in the file will run sequentially

test.describe.configure({mode : 'parallel'})

test.describe.configure({mode : 'serial'}) // interdepnedant on previous => fail skip next 


------------------------------------------------------------------

npx playwright test --grep @Web

npx playwright test --grep @API


--------------------------------------------

Allure Report
npm i allure-playwright
npm install -g allure-commandline --save-dev

npx playwright test --grep @API --reporter=line,allure-playwright  // cmd
npx playwright test --grep `"@API`" --reporter=line,allure-playwright // powershell
allure generate ./allure-result --clean
allure open allure-report


npx playwright test --reporter=line,allure-playwright --config=playwright.config1.js
allure generate my-allure-results -o allure-report --clean
--------------------------------------------------

run script
  "scripts": {
    "regression": "npx playwright test",
    "APITests": "npx playwright test --grep @API",
    "WebTests": "npx playwright test --grep @Web",
    "ChromeNewCofig": "npx playwright test CustomTest.spec.js --config playwright.config1.js --project=chrome"
  }, 


// type in terminal
npm run ChromeNewCofig


--------------------------------

1. npm i @cucumber/cucumber
2. extension :cucumber (Gherkin)
3. Feature : can have multiple testcase
4. create folder -> feature
5. inside create  filename ends with feature -> Ecommerce.feature
6. write code
7. npx cucumber-js -> inside node modules cucumber-js
8. npx cucumber-js  --exit