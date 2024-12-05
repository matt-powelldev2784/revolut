import { useAppContext } from 'context/AppContext'

export const AccountBalances = () => {
  const { usdBalance, gbpBalance, eurBalance } = useAppContext()

  return (
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
  )
}
