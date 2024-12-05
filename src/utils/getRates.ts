import axios from 'axios'
import { CurrencyType } from 'context/AppContext'

interface getRates {
  currencyTypes: CurrencyType[]
  baseCurrency: CurrencyType
}

export const getRates = async ({ currencyTypes, baseCurrency }: getRates) => {
  const urlPrefix = 'https://api.freecurrencyapi.com/v1/latest?apikey='
  const apiKey = import.meta.env.VITE_FREE_CURRENCY_API_KEY
  const currencyTypesString = currencyTypes.join(',')

  try {
    const response = await axios.get(
      `${urlPrefix}${apiKey}&base_currency=${baseCurrency}&currencies=${currencyTypesString}`
    )
    const rates = response.data.data
    return rates
  } catch (error) {
    console.error(error)
    return 'error'
  }
}
