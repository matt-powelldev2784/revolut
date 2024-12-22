import { CurrencyType, useAppContext } from 'context/AppContext'
import { useForm } from 'react-hook-form'
import { ChangeEvent, MouseEvent, useState } from 'react'
import { usePollCurrencyRates } from './hooks/usePollCurrencyRates'
import swapIcon from '../../assets/swap.svg'
import errorIcon from '../../assets/error.svg'
import trendIcon from '../../assets/trend.svg'
import plusIcon from '../../assets/plus.svg'
import minusIcon from '../../assets/minus.svg'

interface FormSchema {
  baseWallet: CurrencyType
  baseAmount: string
  toWallet: CurrencyType
  toAmount: string
}

const ErrorJsx = () => {
  return (
    <div className="m-8 flex flex-col items-center rounded-xl border-2 border-red-500 bg-red-100">
      <img src={errorIcon} alt="error icon" className="m-2" />
      <p className="px-4 pb-2">
        An error has occurred when fetching the exchange rates
      </p>
    </div>
  )
}

export const ExchangeForm = () => {
  const [baseCurrency, setBaseCurrency] = useState<CurrencyType>('GBP')
  const [toCurrency, setToCurrency] = useState<CurrencyType>('EUR')
  const [savedBaseAmount, setSavedBaseAmount] = useState('0.00')
  const [savedToAmount, setSavedToAmount] = useState('0.00')
  const [errorMessage, setErrorMessage] = useState('')
  const { currencyTypes, accountBalances, setAccountBalances } = useAppContext()
  const { currencyRates } = usePollCurrencyRates(baseCurrency)

  const { register, setValue, handleSubmit, getValues } = useForm<FormSchema>({
    defaultValues: {
      baseWallet: baseCurrency,
      baseAmount: savedBaseAmount,
      toWallet: toCurrency,
      toAmount: savedToAmount
    }
  })

  // return null if api is yet to return data
  if (currencyRates === undefined) return null
  // return error if the api has an error state
  if ('error' in currencyRates) return <ErrorJsx />

  const baseCurrencyRate = currencyRates.filter((currencyRate) => {
    return currencyRate.currency === getValues('baseWallet')
  })[0]
  const toCurrencyRate = currencyRates.filter((currencyRate) => {
    return currencyRate.currency === getValues('toWallet')
  })[0]

  const onBaseAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    // if value cannot be converted to number return previously saved number
    if (isNaN(value)) return setValue('baseAmount', savedBaseAmount)

    const valueWithTwoDecimalPlaces = value.toFixed(2)
    setValue('baseAmount', valueWithTwoDecimalPlaces)
    setSavedBaseAmount(valueWithTwoDecimalPlaces)

    const calculatedToAmount = (value * toCurrencyRate.rate).toFixed(2)
    setValue('toAmount', calculatedToAmount)
    setSavedToAmount(calculatedToAmount)
  }

  const onToAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    // if value cannot be converted to number return previously saved number
    if (isNaN(value)) return setValue('toAmount', savedToAmount)

    const valueWithTwoDecimalPlaces = value.toFixed(2)
    setValue('toAmount', valueWithTwoDecimalPlaces)
    setSavedToAmount(valueWithTwoDecimalPlaces)

    const calculatedBaseAmount = (value / toCurrencyRate.rate).toFixed(2)
    setValue('baseAmount', calculatedBaseAmount)
    setSavedBaseAmount(calculatedBaseAmount)
  }

  const onBaseCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setBaseCurrency(e.target.value as CurrencyType)
    setValue('baseWallet', e.target.value as CurrencyType)
  }

  const onToCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(e.target.value as CurrencyType)
    setValue('toWallet', e.target.value as CurrencyType)
  }

  const onCurrencySwap = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const currentBaseCurrency = getValues('baseWallet')
    const currentToCurrency = getValues('toWallet')
    const currentToAmount = getValues('toAmount')
    const currentBaseAmount = getValues('baseAmount')

    setValue('baseWallet', currentToCurrency)
    setValue('baseAmount', currentToAmount)

    setValue('toWallet', currentBaseCurrency)
    const calculatedToAmount = (
      Number(currentToAmount) / toCurrencyRate.rate
    ).toFixed(2)
    setValue('toAmount', calculatedToAmount)

    setBaseCurrency(currentToCurrency)
    setSavedBaseAmount(currentToAmount)
    setSavedToAmount(currentBaseAmount)
  }

  const onCurrencyExchange = (data: FormSchema) => {
    setErrorMessage('')

    // return error is base wallet currency is the same is to wallet currency
    if (data.baseWallet === data.toWallet)
      return setErrorMessage(
        'Both wallets are set to the same currency. Change one of the currency types if you wish to exchange money.'
      )

    const baseAmount = data.baseAmount
    const baseCurrency = data.baseWallet
    const baseCurrencyNewBalance =
      accountBalances[baseCurrency] - Number(baseAmount)

    const toAmount = data.toAmount
    const toCurrency = data.toWallet
    const toCurrencyNewBalance = accountBalances[toCurrency] + Number(toAmount)

    // return error if insufficient balance to make transaction
    if (baseCurrencyNewBalance < 0)
      return setErrorMessage(
        'You have insufficient balance in your account to make this transaction'
      )

    setAccountBalances({
      ...accountBalances,
      [baseCurrency]: baseCurrencyNewBalance,
      [toCurrency]: toCurrencyNewBalance
    })

    setValue('baseAmount', '0.00')
    setValue('toAmount', '0.00')
  }

  return (
    <form
      className="flex w-full max-w-[500px] flex-col items-center justify-center gap-4 pt-4"
      onSubmit={handleSubmit(onCurrencyExchange)}
    >
      <div className="flex flex-col items-center">
        <p className="text-xl font-bold">Move Money</p>
        <div className="flex flex-row items-center">
          <img src={trendIcon} alt="error icon" className="m-2" />
          <p className="text-sm text-blue-600">
            {baseCurrencyRate.rate} {baseCurrencyRate.currency} ={' '}
            {toCurrencyRate.rate} {toCurrencyRate.currency}
          </p>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center gap-4">
        <label htmlFor="baseWallet" className="sr-only">
          Base Wallet
        </label>

        <select
          className="h-10 w-[80px] rounded-lg p-2 focus:outline-none"
          {...register('baseWallet')}
          onChange={onBaseCurrencyChange}
          aria-label="Exchange from wallet"
        >
          {currencyTypes.map((currencyType) => {
            return (
              <option key={currencyType} value={currencyType} className="w-40">
                {currencyType}
              </option>
            )
          })}
        </select>

        <img src={minusIcon} alt="minus icon" />

        <label htmlFor="baseAmount" className="sr-only">
          Base Amount
        </label>

        <input
          className="h-10 w-[200px] rounded-lg border-2 border-black p-2"
          {...register('baseAmount')}
          onChange={onBaseAmountChange}
          aria-label="baseAmount"
        />
      </div>

      <button onClick={onCurrencySwap}>
        <img src={swapIcon} alt="swap icon" />
      </button>

      <div className="flex flex-row items-center justify-center gap-4">
        <label htmlFor="toWallet" className="hidden">
          To Wallet
        </label>
        <select
          className="h-10 w-[80px] rounded-lg p-2 focus:outline-none"
          {...register('toWallet')}
          onChange={onToCurrencyChange}
          aria-label="Exchange to wallet"
        >
          {currencyTypes.map((currencyType) => {
            return (
              <option key={currencyType} value={currencyType} className="w-40">
                {currencyType}
              </option>
            )
          })}
        </select>

        <img src={plusIcon} alt="plus icon" />

        <label htmlFor="toAmount" className="sr-only">
          To Amount
        </label>
        <input
          className="h-10 w-[200px] rounded-lg border-2 border-black p-2"
          {...register('toAmount')}
          onChange={onToAmountChange}
          aria-label="toAmount"
        />
      </div>

      <button className="mt-2 h-10 w-[300px] rounded-xl bg-blue-600 text-xl text-white">
        Exchange
      </button>

      {errorMessage && (
        <p className="text-center text-red-500">{errorMessage}</p>
      )}
    </form>
  )
}
