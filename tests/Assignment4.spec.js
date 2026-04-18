import { expect, test } from '@playwright/test'

const BASE_URL = 'https://eventhub.rahulshettyacademy.com'
const BASE_API_URL = 'https://api.eventhub.rahulshettyacademy.com/api'
const AUTH_API_URL = BASE_API_URL + '/auth/login'
const USER_YAHOO = { email: 'pvivek6651@gmail.com', password: 'EveHb@6651' };
const USER_GMAIL = { email: 'guser@example.com', password: 'Guser9@error' };

async function loginAs(page, user) {
  await page.getByPlaceholder('you@email.com').fill(user.email)
  await page.getByLabel('Password').fill(user.password)
  await page.locator('#login-btn').click()
  const browseEveLink = page.getByRole('link', { name: 'Browse Events →' })
  await expect(browseEveLink).toBeVisible()
  await browseEveLink.click()
  await expect(page).toHaveURL(BASE_URL + '/events')
  const eventCards = page.getByTestId('event-card')
  await expect(eventCards.first()).toBeVisible()
}

test('Cross-User Booking Access Denied', async ({page, request}) => {

  //Step 1 — Login as Yahoo user via API
  const responseLogin = await request.post(AUTH_API_URL, {
    data : { email: USER_YAHOO.email, password: USER_YAHOO.password }
  })
  expect(responseLogin.ok()).toBeTruthy()
  const responseLoginJson = await responseLogin.json()
  const token = await responseLoginJson.token
  console.log(token)
  
  //Step 2 — Fetch events via API to get a valid event ID
  const responseEvents = await request.get(BASE_API_URL+'/events', {
    headers: {
      Authorization: 'Bearer '+token
    }
  })
  expect(responseEvents.ok()).toBeTruthy()
  const responseEventsJson = await responseEvents.json()
  const eventId = await responseEventsJson.data[0].id
  console.log(eventId)

  //Step 3 — Create a booking via API as Yahoo user
  const responseBookings = await request.post(BASE_API_URL+'/bookings', {
    headers: {
      Authorization: 'Bearer '+token
    },
    data : {
      'eventId' : eventId,
      'customerName' : 'Yahoo User',
      'customerEmail' : USER_YAHOO.email,
      'customerPhone' : 8712517881,
      'quantity' : 1
    }
  })
  expect(responseBookings.ok()).toBeTruthy()
  const responseBookingsJson = await responseLogin.json()
  const yahooBookingId = await responseBookingsJson.user.id
  console.log(yahooBookingId)

  //Step 4 — Login as Gmail user via browser UI
  await page.goto(BASE_URL+'/login');
  await loginAs(page, USER_GMAIL)

  //Step 5 — Navigate to Yahoo's booking URL as Gmail user
  await page.goto(BASE_URL+'/bookings/'+yahooBookingId, {waitUntil: 'networkidle'});

  //Step 6: Validate Access Denied
  await expect(page.getByText('Booking not found')).toBeVisible();
  await expect(page.getByText(`This booking doesn't exist or may have been cancelled.`)).toBeVisible();
})