import { useAppContext } from 'context/AppContext'
import revolutLogo from '../assets/revolut_logo.svg'

const App = () => {
  const { usdBalance, gbpBalance, eurBalance } = useAppContext()

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
    </main>
  )
}

export default App
