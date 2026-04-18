import {expect, test} from '@playwright/test'

const BASE_URL = 'https://eventhub.rahulshettyacademy.com'

async function login(page) {
    await page.getByPlaceholder('you@email.com').fill('pvivek6651@gmail.com')
    await page.getByLabel('Password').fill('EveHb@6651')
    await page.locator('#login-btn').click()
    const browseEveLink = page.getByRole('link', {name:'Browse Events →'})
    await expect(browseEveLink).toBeVisible()
}

test('Booking Flow Assignment - Single ticket booking', async ({page}) => {

    //Test 1 — Single ticket booking is eligible for refund

    //Step 1 — Login
    await page.goto(BASE_URL)
    await login(page)
    
    //Step 3 — Find the event card and capture seats
    await page.goto(BASE_URL+'/events')
    const firstEventCard = page.getByTestId('event-card').first()
    await expect(firstEventCard).toBeVisible()
    const bookNowBtn = firstEventCard.getByTestId('book-now-btn')
    await expect(bookNowBtn).toBeVisible()
    await bookNowBtn.click()

    await page.getByLabel('Full Name').fill('Vivek')
    await page.locator('#customer-email').fill('pvivek6651@gmail.com')
    await page.getByPlaceholder('+91 98765 43210').fill('8766466469')
    await page.locator('.confirm-booking-btn').click()

    // Step 3 — Navigate to booking detail
    await page.getByRole('button', {name:'View My Bookings'}).click()
    await expect(page).toHaveURL(BASE_URL+'/bookings')

    const firstBookingCard = await page.locator('#booking-card').first()
    await expect(firstBookingCard).toBeVisible()
    await firstBookingCard.getByRole('button', {name:'View Details'}).click()
    const BookConfirmMsg = page.getByText('Booking Information')
    await expect(BookConfirmMsg).toBeVisible()

    // Step 4 — Validate booking ref
    const bookingRef = page.locator('.items-start span').first().innerText()
    const eveTitle = page.locator('.items-start h1').innerText()
    expect((await bookingRef).charAt(0)).toBe((await eveTitle).charAt(0))

    // Step 5 — Check refund eligibility
    const refunfBtn = page.getByTestId('check-refund-btn')
    await refunfBtn.click()
    const spinner1 = page.locator('#refund-spinner')
    await expect(spinner1).toBeVisible()
    await page.pause(6000)
    await expect(spinner1).not.toBeVisible()

    // Step 6 — Validate result
    const result = page.locator('#refund-result')
    await expect(result).toBeVisible()
    await expect(result).toContainText('Eligible for refund')
    await expect(result).toContainText('Single-ticket bookings qualify for a full refund')

})

test('Booking Flow Assignment - Group ticket booking', async ({page}) => {

    // Test 2 — Group ticket booking is NOT eligible for refund

    //Step 1 — Login
    await page.goto(BASE_URL)
    await login(page)
    
    //Step 3 — Find the event card and capture seats
    await page.goto(BASE_URL+'/events')
    const firstEventCard = page.getByTestId('event-card').first()
    await expect(firstEventCard).toBeVisible()
    const bookNowBtn = firstEventCard.getByTestId('book-now-btn')
    await expect(bookNowBtn).toBeVisible()
    await bookNowBtn.click()

    // await page.getByRole('button', {name:'+'}).dblclick()
    await page.getByRole('button').filter({hasText:'+'}).dblclick()
    // await page.locator('button:has-text("+")').click()
    // await page.locator('button:has-text("+")').click()
    await page.getByLabel('Full Name').fill('Vivek')
    await page.locator('#customer-email').fill('pvivek6651@gmail.com')
    await page.getByPlaceholder('+91 98765 43210').fill('8766466469')
    await page.locator('.confirm-booking-btn').click()

    // Step 3 — Navigate to booking detail
    await page.getByRole('button', {name:'View My Bookings'}).click()
    await expect(page).toHaveURL(BASE_URL+'/bookings')

    const firstBookingCard = await page.locator('#booking-card').first()
    await expect(firstBookingCard).toBeVisible()
    await firstBookingCard.getByRole('link', {name:'View Details'}).click()
    
    const BookConfirmMsg = page.getByText('Booking Information')
    await expect(BookConfirmMsg).toBeVisible()

    // Step 4 — Validate booking ref
    const bookingRef = page.locator('.items-start span').first().innerText()
    const eveTitle = page.locator('.items-start h1').innerText()
    expect((await bookingRef).charAt(0)).toBe((await eveTitle).charAt(0))

    // Step 5 — Check refund eligibility
    const refunfBtn = page.getByTestId('check-refund-btn')
    await refunfBtn.click()
    const spinner1 = page.locator('#refund-spinner')
    await expect(spinner1).toBeVisible()
    await expect(spinner1).not.toBeVisible({ timeout: 6000 })

    // Step 6 — Validate result
    const result = page.locator('#refund-result')
    await expect(result).toBeVisible()
    await expect(result).toContainText('Not eligible for refund')
    await expect(result).toContainText('Group bookings (3 tickets) are non-refundable')
})