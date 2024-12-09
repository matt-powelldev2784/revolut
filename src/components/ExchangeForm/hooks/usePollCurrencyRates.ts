import { CurrencyType, useAppContext } from 'context/AppContext'
import { useEffect, useState } from 'react'
import { ApiResponse, getCurrencyRates } from 'utils/getCurrencyRates'

export const usePollCurrencyRates = (baseCurrency: CurrencyType) => {
  const [currencyRates, setCurrencyRates] = useState<ApiResponse>()
  const { currencyTypes } = useAppContext()
  // refresh data every 10 seconds
  // TODO REDUCE TIMER
  const POLLING_INTERVAL = 10000

  useEffect(() => {
    const handleRatesData = async () => {
      const ratesData = await getCurrencyRates({ currencyTypes, baseCurrency })
      setCurrencyRates(ratesData)
    }

    // get data on first load
    handleRatesData()

    // set interval for subsequent data requests
    const timeoutId = setInterval(handleRatesData, POLLING_INTERVAL)

    return () => {
      clearInterval(timeoutId)
    }
  }, [currencyTypes, baseCurrency])

  return { currencyRates }
}
