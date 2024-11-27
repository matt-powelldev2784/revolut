import { useAppContext } from 'context/AppContext'
import revolutLogo from '../assets/revolut_logo.svg'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

type WalletType = 'GBP' | 'USD' | 'EUR'

interface FormSchema {
  fromWallet: WalletType
  fromAmount: number
  toWallet: WalletType
  toAmount: number
}

const formsSchema = yup.object().shape({
  fromWallet: yup
    .string()
    .matches(/(GBP|USD|EUR)/)
    .required() as yup.Schema<WalletType>,
  fromAmount: yup.number().required(),
  toWallet: yup
    .string()
    .matches(/(GBP|USD|EUR)/)
    .required() as yup.Schema<WalletType>,
  toAmount: yup.number().required()
})

const App = () => {
  const { usdBalance, gbpBalance, eurBalance, currencyTypes } = useAppContext()

  const { register, handleSubmit } = useForm<FormSchema>({
    defaultValues: {
      fromWallet: 'GBP',
      fromAmount: 0,
      toWallet: 'EUR',
      toAmount: 0
    },
    resolver: yupResolver(formsSchema)
  })
  const handleRegistration = (data: FormSchema) => console.log(data)

  return (
    <main className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-white">
      <img src={revolutLogo} alt="Revolut Logo" className="m-2" />

      <section className="flex flex-col items-center">
        <h1 className="text-lg font-bold">Account Balances</h1>
        <div className="flex flex-row text-lg">
          <p className="mx-4">
            EUR: <span className="text-blue-600">€{eurBalance}</span>
          </p>
          <p className="mx-4">
            GBP: <span className="text-blue-600">€{gbpBalance}</span>
          </p>
          <p className="mx-4">
            USD: <span className="text-blue-600">${usdBalance}</span>
          </p>
        </div>
      </section>

      <form
        onSubmit={handleSubmit(handleRegistration)}
        className="flex w-full max-w-[500px] flex-col items-center justify-center gap-4  pt-4"
      >
        <div className="flex flex-row items-center justify-center gap-4">
          <label className="hidden">From Wallet</label>
          <select className="h-10 w-[80px] p-2" {...register('fromWallet')}>
            {currencyTypes.map((currencyType) => {
              return (
                <option
                  key={currencyType}
                  value={currencyType}
                  className="w-40"
                >
                  {currencyType}
                </option>
              )
            })}
          </select>
          -
          <input
            className="h-10 w-[200px] border-2 border-black p-2"
            {...register('fromAmount')}
          />
        </div>

        <div className="flex flex-row items-center justify-center gap-4">
          <label className="hidden">From Wallet</label>
          <select className="h-10 w-[80px] p-2" {...register('toWallet')}>
            {currencyTypes.map((currencyType) => {
              return (
                <option
                  key={currencyType}
                  value={currencyType}
                  className="w-40"
                >
                  {currencyType}
                </option>
              )
            })}
          </select>
          -
          <input
            className="h-10 w-[200px] border-2 border-black p-2"
            {...register('toAmount')}
          />
        </div>

        <button className="h-10 w-[300px] rounded-xl bg-blue-600 text-xl text-white">
          Exchange
        </button>
      </form>
    </main>
  )
}

export default App
