import {expect, test} from '@playwright/test'

const BASE_URL = 'https://eventhub.rahulshettyacademy.com'

async function login(page) {
    await page.getByPlaceholder('you@email.com').fill('pvivek6651@gmail.com')
    await page.getByLabel('Password').fill('EveHb@6651')
    await page.locator('#login-btn').click()
}

test('Booking Flow Assignment', async ({page}) => {

    //Step 1 — Login
    await page.goto(BASE_URL)
    await login(page)
    const browseEveLink = page.getByRole('link', {name:'Browse Events →'})
    await expect(browseEveLink).toBeVisible()

    //Step 2 — Create a new event
    await page.goto(BASE_URL+'/admin/events')
    const uniqueEveTitle = Date.now().toString()
    await page.locator('#event-title-input').fill(uniqueEveTitle)
    await page.locator('#admin-event-form textarea').fill('New event')
    await page.getByLabel('City').fill('Bengaluru')
    await page.getByLabel('Venue').fill('Ram Ashram')
    await page.getByLabel('Event Date & Time').fill('2027-12-31T10:00');
    await page.getByLabel('Price ($)').fill('100')
    await page.getByLabel('Total Seats').fill('50')
    await page.locator('#add-event-btn').click()
    const confirmMsg = page.getByText('Event created!')
    await expect(confirmMsg).toBeVisible()
    

    //Step 3 — Find the event card and capture seats
    await page.goto(BASE_URL+'/events')
    const eventCards = page.getByTestId('event-card')
    await expect(eventCards.first()).toBeVisible()
    const createdEventCard = eventCards.filter({hasText: uniqueEveTitle})
    await expect(createdEventCard).toBeVisible({timeout:5000})
    const availableSeat = await createdEventCard.getByText('seat').first().innerText();
    const seatsBeforeBooking = parseInt(availableSeat)

    //Step 4 — Start booking
    await createdEventCard.getByTestId('book-now-btn').click()

    //Step 5 — Fill booking form
    const defaultCount = await page.locator('#ticket-count').textContent()
    expect(defaultCount).toEqual('1')
    await page.getByLabel('Full Name').fill('Vivek')
    await page.locator('#customer-email').fill('pvivek6651@gmail.com')
    await page.getByPlaceholder('+91 98765 43210').fill('8766466469')
    await page.locator('.confirm-booking-btn').click()

    //Step 6 — Verify booking confirmation
    const bookRefConfirm = await page.locator('.booking-ref').first()
    await expect(bookRefConfirm).toBeVisible()
    const bookingRef = (await bookRefConfirm.innerText()).trim()

    //Step 7 — Verify in My Bookings
    await page.getByRole('button', {name:'View My Bookings'}).click()
    await expect(page).toHaveURL(BASE_URL+'/bookings')
    const bookingCards = await page.locator('#booking-card')
    await expect(bookingCards.first()).toBeVisible()
    const matchedCard = await bookingCards.getByText(uniqueEveTitle)
    await expect(matchedCard).toBeVisible()
    await expect(matchedCard).toContainText(uniqueEveTitle)

    //Step 8 — Verify seat reduction
    await page.goto(BASE_URL+'/events')
    await expect(eventCards.first()).toBeVisible()
    const updatedEventCard = eventCards.filter({hasText: uniqueEveTitle})
    await expect(updatedEventCard).toBeVisible({timeout:5000})
    const availableMySeat = await updatedEventCard.getByText('seat').first().innerText();
    const seatsAfterBooking = parseInt(availableMySeat)
    expect(seatsAfterBooking).toBe(seatsBeforeBooking-1)
    
})