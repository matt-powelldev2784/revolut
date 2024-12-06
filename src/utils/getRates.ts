import axios, { isAxiosError } from 'axios'
import { CurrencyType } from 'context/AppContext'

interface getRates {
  currencyTypes: CurrencyType[]
  baseCurrency: CurrencyType
}

export interface ApiResponse {
  data?: { [K in CurrencyType]: number }
  error?: boolean
}

export const getRates = async ({ currencyTypes, baseCurrency }: getRates) => {
  const urlPrefix = 'https://api.freecurrencyapi.com/v1/latest?apikey='
  const apiKey = import.meta.env.VITE_FREE_CURRENCY_API_KEY
  const currencyTypesString = currencyTypes.join(',')

  try {
    const response = await axios.get(
      `${urlPrefix}${apiKey}&base_currency=${baseCurrency}&currencies=${currencyTypesString}`
    )

    const data: ApiResponse = response.data
    return data
    //
  } catch (error: unknown) {
    if (!isAxiosError(error)) return
    return { error: true }
  }
}
