// import { Given, When, Then } from "@cucumber/cucumber";
// import playwright from '@playwright/test'
// import { POManager } from '../../pageobjects/POManager.js'
// import {dataset} from '../../utils/placeorderTestData.json'

const { Given, When, Then } = require("@cucumber/cucumber")
const dataset = require('../../utils/placeorderTestData.json');
const { expect } = require("allure-playwright");
// const fs = require('fs')
// const path = require('path')

// const dataset = JSON.parse(
//   fs.readFileSync(path.join(__dirname, '../../utils/placeorderTestData.json'), 'utf8')
// )

Given(/^User launches ECom website$/, async function () {
    this.loginPage = this.poManager.getLoginPage()
    await this.loginPage.goTo()
});

When(/^User logs in with username "([^"]*)" and password "([^"]*)"$/, async function (username, password) {
    this.username = username
    await this.loginPage.validLogin(this.username, password)
});

Then(/^User should see dashboard page$/, {timeout: 10*1000}, async function () {
    this.dashboardPage = this.poManager.getDashboardPage()
    this.products = await this.dashboardPage.getProductNames()
});

When(/^User select product "([^"]*)" and perform checkout$/, async function (productName) {
    await this.dashboardPage.searchProductAddToCart(this.products, productName)
    await this.dashboardPage.navigateToCart()

    this.checkoutPage = this.poManager.getCheckoutPage()
    await this.checkoutPage.verifyProductAndCheckout(productName)   
    
});

When(/^User provide valid details and place order$/, async function () {
    this.orderDetailsPage = this.poManager.getOrderDetailsPage()

    await this.orderDetailsPage.verifyUserInfo(this.username)
    await this.orderDetailsPage.chooseCountry(dataset.searchCountry, dataset.country)
    // await this.orderDetailsPage.chooseCountry("ind", "India")
    await this.orderDetailsPage.placeOrder()
});

Then(/^User should see order details in OrderHistory$/, async function () {
    this.orderConfirmPage = this.poManager.getOrderConfirmPage()

    this.orderId = await this.orderConfirmPage.verifyOrderConfirmation()
    await this.orderConfirmPage.verifyOrderInMyOrders(this.orderId)
    
});

Then(/^User should be on login page$/, async function () {
    this.dashboardPage = this.poManager.getDashboardPage()
	await this.dashboardPage.verifyURL()
});

