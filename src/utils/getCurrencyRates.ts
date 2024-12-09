import axios, { isAxiosError } from 'axios'
import { CurrencyType } from 'context/AppContext'

interface GetCurrencyRates {
  currencyTypes: CurrencyType[]
  baseCurrency: CurrencyType
}
interface CurrencyRate {
  currency: CurrencyType
  rate: number
}

export type ApiResponse = CurrencyRate[] | { error: boolean } | undefined

export const getCurrencyRates = async ({
  currencyTypes,
  baseCurrency
}: GetCurrencyRates) => {
  const urlPrefix = 'https://api.freecurrencyapi.com/v1/latest?apikey='
  const apiKey = import.meta.env.VITE_FREE_CURRENCY_API_KEY
  const currencyTypesString = currencyTypes.join(',')

  try {
    const response = await axios.get(
      `${urlPrefix}${apiKey}&base_currency=${baseCurrency}&currencies=${currencyTypesString}`
    )

    const data = response.data.data

    const ratesArray = []
    for (const [key, value] of Object.entries(data)) {
      const rate = { currency: key, rate: value } as CurrencyRate
      ratesArray.push(rate)
    }

    return ratesArray
    //
  } catch (error) {
    if (!isAxiosError(error)) return
    return { error: true }
  }
}
