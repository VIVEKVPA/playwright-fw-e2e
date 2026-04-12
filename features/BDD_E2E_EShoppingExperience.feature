Feature: E2E shopping experience

    This is to check the ECom shopping experience

    @Smoke @Valid
    Scenario: 1 Verify E2E User shopping experience
        Given User launches ECom website
        When User logs in with username "vivek123@example.com" and password "Hknd@u72"
        Then User should see dashboard page
        When User select product "ZARA COAT 3" and perform checkout
        And User provide valid details and place order
        Then User should see order details in OrderHistory

    @InValid
    Scenario: 1 Verify Invalid User login
        Given User launches ECom website
        When User logs in with username "123@example.com" and password "Hknd@u72"
        Then User should be on login page