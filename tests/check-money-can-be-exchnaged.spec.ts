import { test, expect } from '@playwright/test'

test('should check that money can be exchanged', async ({ page }) => {
  await page.goto('/')

  // type 10 into base currency input
  const baseCurrencyInput = page.getByLabel('baseAmount')
  await expect(baseCurrencyInput).toBeVisible()
  await baseCurrencyInput.fill('10')
  await expect(baseCurrencyInput).toHaveValue('10.00')

  // exchange money
  const exchangeButton = page.getByRole('button', { name: 'Exchange' })
  await exchangeButton.click()

  // check GBP balance is £40
  const gbpAccountBalance = page.getByLabel('GBP Balance')
  await expect(gbpAccountBalance).toHaveText('GBP: £40.00')
})
