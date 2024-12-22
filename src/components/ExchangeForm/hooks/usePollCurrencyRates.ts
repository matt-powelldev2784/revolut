import { CurrencyType, useAppContext } from 'context/AppContext'
import { useEffect, useState } from 'react'
import { ApiResponse, getCurrencyRates } from 'utils/getCurrencyRates'

export const usePollCurrencyRates = (baseCurrency: CurrencyType) => {
  const [currencyRates, setCurrencyRates] = useState<ApiResponse>()
  const { currencyTypes } = useAppContext()
  const POLLING_INTERVAL = 10000 // 10 seconds

  useEffect(() => {
    const handleRatesData = async () => {
      const ratesData = await getCurrencyRates({ currencyTypes, baseCurrency })
      setCurrencyRates(ratesData)
    }

    // get data on first load
    handleRatesData()

    // set interval for subsequent data requests
    const intervalId = setInterval(handleRatesData, POLLING_INTERVAL)

    return () => {
      clearInterval(intervalId)
    }
  }, [currencyTypes, baseCurrency])

  return { currencyRates }
}
