import { test, expect } from '@playwright/test'

test('that currency types can be swapped and currency can be exchanged', async ({
  page
}) => {
  await page.goto('/')

  // get exchange rate from text
  const exchangeRateText = await page
    .locator('p', { hasText: /1 GBP =/ })
    .textContent()
  const exchangeRate = exchangeRateText?.split('=')[1].slice(0, -4).trim()
  if (!exchangeRate) throw new Error()

  // type 10 into base currency input
  const baseCurrencyInput = page.getByLabel('baseAmount')
  await expect(baseCurrencyInput).toBeVisible()
  await baseCurrencyInput.fill('10')
  await expect(baseCurrencyInput).toHaveValue('10.00')

  // exchange money
  const exchangeButton = page.getByRole('button', { name: 'Exchange' })
  await exchangeButton.click()

  // check GBP and EUR balances are correct
  const gbpAccountBalance = page.getByLabel('GBP Balance')
  await expect(gbpAccountBalance).toHaveText('GBP: £40.00')
  const eurAccountBalance = page.getByLabel('EUR Balance')
  const newToBalance = 50 + 10 * Number(exchangeRate)
  await expect(eurAccountBalance).toHaveText(`EUR: €${newToBalance.toFixed(2)}`)

  // add 10 into base currency inputs
  await baseCurrencyInput.fill('10')
  await expect(baseCurrencyInput).toHaveValue('10.00')

  //swap currency type and values
  const swapButton = page.getByAltText('swap icon')
  await swapButton.click()

  // check currency types have been swapped correctly
  const toCurrencyInput = page.getByLabel('toAmount')
  await expect(toCurrencyInput).toHaveValue('10.00')
  const toCurrencySelect = page.getByLabel('Exchange from wallet')
  await expect(toCurrencySelect).toHaveValue('EUR')

  // exchange money
  await exchangeButton.click()

  // check GBP and EUR account balances are correct
  await expect(gbpAccountBalance).toHaveText('GBP: £50.00')
  await expect(eurAccountBalance).toHaveText('EUR: €50.00')
})
