import {expect, test} from '@playwright/test'

test('Handle the calendar', async ({page}) => {

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers')
    await page.waitForLoadState('networkidle')

    const date = '21'
    const month = '3'
    const year = '2026'
    
    const datepicker = page.locator('.react-date-picker__inputGroup')
    const bool = await datepicker.isVisible()
    expect(bool).toBeTruthy()

    await datepicker.click()

    const yearEle = await page.locator('.react-calendar__navigation__label')
    await yearEle.click()
    await yearEle.click()

    const selectYear = await page.getByText(year)
    await selectYear.click()

    const selectMonth = await page.locator('.react-calendar__year-view__months__month').nth(Number(month)-1)
    await selectMonth.click()

    const selectDate = await page.locator('button.react-calendar__month-view__days__day abbr').getByText(date)
    await selectDate.click()

    const actualDate = await page.locator('input[name="date"]').getAttribute('value')
    const expectedDate = year+"-0"+month+"-"+date
    expect(actualDate).toEqual(expectedDate)

    //ArrayList approach

    const expectedList = [month,date,year]
    const inputs = await page.locator('input.react-date-picker__inputGroup__input')
    for (let i=0; i<expectedList.length; i++) {
        const actualValue = await inputs.nth(i).getAttribute('value')
        console.log(actualValue)
        expect(actualValue).toEqual(expectedList[i])
    }
})