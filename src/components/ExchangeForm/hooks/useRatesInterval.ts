import { useAppContext } from 'context/AppContext'
import { useEffect, useState } from 'react'
import { getRates } from 'utils/getRates'

export const useRatesInterval = () => {
  const [rates, setRates] = useState()
  const { currencyTypes } = useAppContext()

  useEffect(() => {
    const getRatesData = async () => {
      const ratesData = await getRates({ currencyTypes, baseCurrency: 'GBP' })
      setRates(ratesData)
    }

    if (!rates) getRatesData()

    const intervalId = setInterval(getRatesData, 100000)

    console.log('intervalId', intervalId)

    return () => {
      clearInterval(intervalId)
    }
  }, [currencyTypes, rates])

  return { rates }
}
