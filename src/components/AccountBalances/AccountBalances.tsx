import { useAppContext } from 'context/AppContext'

export const AccountBalances = () => {
  const { accountBalances } = useAppContext()

  return (
    <section className="m-2 flex min-w-[500px] flex-col items-center border-2 p-2">
      <h1 className="text-xl font-bold">Account Balances</h1>

      <div className="flex flex-row text-lg">
        <p className="mx-4 min-w-[120px]">
          EUR:{' '}
          <span className="text-blue-600">
            €{accountBalances.EUR.toFixed(2)}
          </span>
        </p>
        <p className="mx-4 min-w-[120px]">
          GBP:{' '}
          <span className="text-blue-600">
            €{accountBalances.GBP.toFixed(2)}
          </span>
        </p>
        <p className="mx-4 min-w-[120px]">
          USD:{' '}
          <span className="text-blue-600">
            €{accountBalances.USD.toFixed(2)}
          </span>
        </p>
      </div>
    </section>
  )
}
