import { fireEvent, render, screen } from '@testing-library/react'
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

describe('ExchangeForm', () => {
  beforeEach(() => {
    mockUsePollCurrencyRates.mockReturnValue({ currencyRates })
  })

  const renderExchangeForm = () =>
    render(
      <AppContextProvider>
        <ExchangeForm />
      </AppContextProvider>
    )

  test('should not allow letter characters to be typed into inputs', () => {
    renderExchangeForm()

    // check that base amount input does not allow letter input
    const baseAmountInput: HTMLInputElement =
      screen.getByLabelText('fromAmount')
    fireEvent.change(baseAmountInput, { target: { value: '1' } })
    fireEvent.change(baseAmountInput, { target: { value: 'A' } })
    expect(baseAmountInput.value).toBe('1.00')

    // check that to amount input does not allow letter input
    const toAmountInput: HTMLInputElement = screen.getByLabelText('toAmount')
    fireEvent.change(toAmountInput, { target: { value: '0.01' } })
    fireEvent.change(toAmountInput, { target: { value: 'A' } })
    expect(toAmountInput.value).toBe('0.01')
  })
})
