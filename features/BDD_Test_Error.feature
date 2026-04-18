Feature: E2E shopping experience

    This is to check the ECom shopping experience

    @InValid
    Scenario: 1 Verify Invalid User login
        Given User launches ECom website
        When User logs in with username "123@example.com" and password "Hknd@u72"
        Then User should be on login page