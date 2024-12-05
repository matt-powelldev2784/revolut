import revolutLogo from '../assets/revolut_logo.svg'
import { AccountBalances } from './AccountBalances'
import { ExchangeForm } from './ExchangeForm'

const App = () => {
  return (
    <main className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-white">
      <img src={revolutLogo} alt="Revolut Logo" className="m-2" />

      <AccountBalances />
      <ExchangeForm />
    </main>
  )
}

export default App
