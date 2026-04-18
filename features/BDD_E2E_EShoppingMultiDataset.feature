Feature: E2E shopping experience

    This is to check the ECom shopping experience

    @Smoke @MultiUser
    Scenario Outline: 1 Verify E2E User shopping experience with different users
        Given User launches ECom website
        When User logs in with username "<username>" and password "<password>"
        Then User should see dashboard page
        When User select product "<productname>" and perform checkout
        And User provide valid details and place order
        Then User should see order details in OrderHistory

    Examples:
        | username              | password      | productname   |
        | vivek123@example.com  | Hknd@u72      | ZARA COAT 3   |
        | anshika@gmail.com     | Iamking@000   | iphone 13 pro |

    