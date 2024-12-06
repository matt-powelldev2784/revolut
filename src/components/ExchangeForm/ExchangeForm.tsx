import { CurrencyType, useAppContext } from 'context/AppContext'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ChangeEvent, useState } from 'react'
import { useRatesInterval } from './hooks/useRatesInterval'
import swapIcon from '../../assets/swap.svg'
import errorIcon from '../../assets/error.svg'

interface FormSchema {
  fromWallet: CurrencyType
  fromAmount: string
  toWallet: CurrencyType
  toAmount: string
}

const formsSchema = yup.object().shape({
  fromWallet: yup
    .string()
    .matches(/(GBP|USD|EUR)/)
    .required() as yup.Schema<CurrencyType>,
  fromAmount: yup.string().required(),
  toWallet: yup
    .string()
    .matches(/(GBP|USD|EUR)/)
    .required() as yup.Schema<CurrencyType>,
  toAmount: yup.string().required()
})

const ErrorJsx = () => {
  return (
    <div className="m-8 flex flex-col items-center rounded-xl border-2 border-red-500 bg-red-100">
      <img src={errorIcon} alt="error icon" className="m-2" />
      <p className="px-4 pb-2">
        An error has occurred when fetch the exchange rates
      </p>
    </div>
  )
}

export const ExchangeForm = () => {
  const [baseCurrency, setBaseCurrency] = useState<CurrencyType>('GBP')
  const [savedFromAmount, setSavedFromAmount] = useState('0.00')
  const [savedToAmount, setSavedToAmount] = useState('0.00')
  const { currencyTypes } = useAppContext()
  const { rates } = useRatesInterval(baseCurrency)

  console.log('rates---', rates)

  const { register, setValue, handleSubmit, getValues } = useForm<FormSchema>({
    defaultValues: {
      fromWallet: baseCurrency,
      fromAmount: savedFromAmount,
      toWallet: 'EUR',
      toAmount: savedToAmount
    },
    resolver: yupResolver(formsSchema)
  })
  const handleRegistration = (data: FormSchema) => console.log(data)

  const onChangeFromAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    // if value cannot be converted to number return previously saved number
    if (isNaN(value)) return setValue('fromAmount', savedFromAmount)

    const valueWithTwoDecimalPlaces = value.toFixed(2)
    setSavedFromAmount(valueWithTwoDecimalPlaces)
    setValue('fromAmount', valueWithTwoDecimalPlaces)
  }

  const onChangeToAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    // if value cannot be converted to number return previously saved number
    if (isNaN(value)) return setValue('toAmount', savedToAmount)

    const valueWithTwoDecimalPlaces = value.toFixed(2)
    setSavedToAmount(valueWithTwoDecimalPlaces)
    setValue('toAmount', valueWithTwoDecimalPlaces)
  }

  if (!rates?.data) return <ErrorJsx />
  if ('error' in rates) return <ErrorJsx />

  return (
    <form
      className="flex w-full max-w-[500px] flex-col items-center justify-center gap-4  pt-4"
      onSubmit={handleSubmit(handleRegistration)}
    >
      <div className="flex flex-row items-center justify-center gap-4">
        <label className="hidden">From Wallet</label>
        <select className="h-10 w-[80px] p-2" {...register('fromWallet')}>
          {currencyTypes.map((currencyType) => {
            return (
              <option key={currencyType} value={currencyType} className="w-40">
                {currencyType}
              </option>
            )
          })}
        </select>
        -
        <input
          className="h-10 w-[200px] border-2 border-black p-2"
          {...register('fromAmount')}
          onChange={onChangeFromAmount}
        />
      </div>

      <button
        onClick={(e) => {
          e.preventDefault()
          const currentFromCurrency = getValues('fromWallet')
          const currentToCurrency = getValues('toWallet')

          setValue('fromWallet', currentToCurrency)
          setValue('toWallet', currentFromCurrency)
          setBaseCurrency(currentToCurrency)
        }}
      >
        <img src={swapIcon} alt="swap icon" />
      </button>

      <div className="flex flex-row items-center justify-center gap-4">
        <label className="hidden">From Wallet</label>
        <select className="h-10 w-[80px] p-2" {...register('toWallet')}>
          {currencyTypes.map((currencyType) => {
            return (
              <option key={currencyType} value={currencyType} className="w-40">
                {currencyType}
              </option>
            )
          })}
        </select>
        -
        <input
          className="h-10 w-[200px] border-2 border-black p-2"
          {...register('toAmount')}
          onChange={onChangeToAmount}
        />
      </div>

      <button className="h-10 w-[300px] rounded-xl bg-blue-600 text-xl text-white">
        Exchange
      </button>
    </form>
  )
}
