import { CurrencyType, useAppContext } from 'context/AppContext'
import { useEffect, useState } from 'react'
import { ApiResponse, getCurrencyRates } from 'utils/getCurrencyRates'

export const useRatesInterval = (baseCurrency: CurrencyType) => {
  const [currencyRates, setCurrencyRates] = useState<ApiResponse>()
  const { currencyTypes } = useAppContext()

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const getRatesData = async () => {
      const ratesData = await getCurrencyRates({ currencyTypes, baseCurrency })
      setCurrencyRates(ratesData)
      timeoutId = setTimeout(getRatesData, 100000)
    }

    getRatesData()

    return () => {
      clearTimeout(timeoutId)
    }
  }, [currencyTypes, baseCurrency])

  return { currencyRates }
}
