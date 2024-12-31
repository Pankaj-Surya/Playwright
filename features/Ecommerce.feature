Feature: Ecommerce
    @Regression
    # Scenario: Log : Say Hello
    Scenario Outline: Scenario Outline Say Hi
        Given a login to Ecommerece application with "<username>" and "<password>"
        When Add "<productName>" to Cart
        Then Verify that "<productName>" is displayed in the Cart
        When Enter valid details and place the Order
        Then Verify that order is present in the OrderHistory

        Examples:
            | username             | password  | productName |
            | pankaj1998@gmail.com | Table@123 | ZARA COAT 3 |

    
    @LoginValid
    Scenario Outline:  : Check Login
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then Verify Error message is displayed

        Examples:
            | username             | password   |
            | pankaj1998@gmail.com | Table@1234 |

# Feature: Login Functionality
#     Scenario: Login Functionality
#         Given User navigates to the application
#         When I enter the username as "actual_username"
#         When I enter the password as "actual_password"
#         When I click on login button
#         Then User should be logged in successfully
#         Then Logout from the application





