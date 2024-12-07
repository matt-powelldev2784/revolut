import { useAppContext } from 'context/AppContext'

export const AccountBalances = () => {
  const { usdBalance, gbpBalance, eurBalance } = useAppContext()

  return (
    <section className="m-2 flex min-w-[500px] flex-col items-center border-2 p-2">
      <h1 className="text-xl font-bold">Account Balances</h1>

      <div className="flex flex-row text-lg">
        <p className="mx-4 min-w-[150px]">
          EUR: <span className="text-blue-600">€{eurBalance.toFixed(2)}</span>
        </p>
        <p className="mx-4 min-w-[100px]">
          GBP: <span className="text-blue-600">€{gbpBalance.toFixed(2)}</span>
        </p>
        <p className="mx-4 min-w-[100px]">
          USD: <span className="text-blue-600">${usdBalance.toFixed(2)}</span>
        </p>
      </div>
    </section>
  )
}
