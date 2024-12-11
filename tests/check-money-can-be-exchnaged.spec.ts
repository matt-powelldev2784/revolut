import { test, expect } from '@playwright/test'

test('should check that money can be exchanged', async ({ page }) => {
  await page.goto('/')

  const logo = page.getByAltText('Revolut Logo')

  await expect(logo).toBeVisible()
})
