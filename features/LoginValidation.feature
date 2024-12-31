Feature: LoginValidation
@Smoke
@LoginValid
Scenario Outline:  : Check Login
Given a login to Ecommerce2 application with "<username>" and "<password>"
Then Verify Error message is displayed

Examples: 
  | username             |  password   |
  | pankaj1998@gmail.com | Table@1234  | 


#  npx cucumber-js  --exit 
# npx cucumber-js features/LoginValidation.feature
#  npx cucumber-js --tags @Smoke --exit 
#  npx cucumber-js --tags @Smoke --retry=1 --exit 
#  npx cucumber-js --tags @LoginValid --parallel 2 --exit 
#  npx cucumber-js --tags @Smoke --exit --format html:cucumber-reports/cucumber-report.html
