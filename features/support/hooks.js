const { Before, After, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber')
const playwright = require('@playwright/test')
const { POManager } = require('../../pageobjects/POManager.js')

Before(async function () {
    this.browser = await playwright.chromium.launch({
        headless : true
    })
    this.context = await this.browser.newContext()
    this.page = await this.context.newPage()
    this.poManager = new POManager(this.page)
})

BeforeStep(async function () {
    await this.page.screenshot({path: 'screenshot_before.png'})
})

AfterStep(async function ({result}) {
    if (result.status === Status.FAILED) {
        await this.page.screenshot({path: 'screenshot_after.png'})
    }
})

After(async function (){
    await this.page.close()
    await this.context.close()
})