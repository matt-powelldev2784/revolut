import { useAppContext } from 'context/AppContext'
import revolutLogo from '../assets/revolut_logo.svg'

const App = () => {
  const { usdBalance, gbpBalance, eurBalance } = useAppContext()
  console.log('usdBalance', usdBalance)
  console.log('gbpBalance', gbpBalance)
  console.log('eurBalance', eurBalance)

  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden bg-white">
      <img src={revolutLogo} alt="Revolut Logo" className="m-2" />
    </div>
  )
}

export default App
