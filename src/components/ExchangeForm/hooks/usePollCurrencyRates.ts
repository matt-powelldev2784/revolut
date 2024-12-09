import { CurrencyType, useAppContext } from 'context/AppContext'
import { useEffect, useState } from 'react'
import { ApiResponse, getCurrencyRates } from 'utils/getCurrencyRates'

export const usePollCurrencyRates = (baseCurrency: CurrencyType) => {
  const [currencyRates, setCurrencyRates] = useState<ApiResponse>()
  const { currencyTypes } = useAppContext()
  // refresh data every 10 seconds
  // TODO REDUCE TIMER
  const POLLING_INTERVAL = 100000

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const getRatesData = async () => {
      const ratesData = await getCurrencyRates({ currencyTypes, baseCurrency })
      setCurrencyRates(ratesData)
      timeoutId = setInterval(getRatesData, POLLING_INTERVAL)
    }

    // get data on first  load
    getRatesData()

    return () => {
      clearInterval(timeoutId)
    }
  }, [currencyTypes, baseCurrency])

  return { currencyRates }
}
