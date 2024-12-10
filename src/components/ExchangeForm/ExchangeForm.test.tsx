import { render, screen } from '@testing-library/react'
import { ExchangeForm } from './ExchangeForm'
import { AppContextProvider } from 'context/AppContext'
import { usePollCurrencyRates } from './hooks/usePollCurrencyRates'
import { ApiResponse } from 'utils/getCurrencyRates'

vi.mock('./hooks/usePollCurrencyRates')
const mockUsePollCurrencyRates = vi.mocked(usePollCurrencyRates)
const currencyRates: ApiResponse = [
  { currency: 'EUR', rate: 1.2075195735 },
  { currency: 'GBP', rate: 1 },
  { currency: 'USD', rate: 1.2749246003 }
]

test('should first', () => {
  mockUsePollCurrencyRates.mockReturnValue({ currencyRates })

  render(
    <AppContextProvider>
      <ExchangeForm />
    </AppContextProvider>
  )

  screen.debug()
})
