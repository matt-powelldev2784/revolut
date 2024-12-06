import { CurrencyType, useAppContext } from 'context/AppContext'
import { useEffect, useState } from 'react'
import { ApiResponse, getRates } from 'utils/getRates'

export const useRatesInterval = (baseCurrency: CurrencyType) => {
  const [rates, setRates] = useState<ApiResponse | undefined>()
  const { currencyTypes } = useAppContext()

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const getRatesData = async () => {
      const ratesData = await getRates({ currencyTypes, baseCurrency })
      setRates(ratesData)
      timeoutId = setTimeout(getRatesData, 100000)
    }

    getRatesData()

    return () => {
      clearTimeout(timeoutId)
    }
  }, [currencyTypes, baseCurrency])

  return { rates }
}
