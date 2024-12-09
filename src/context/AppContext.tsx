import {
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction
} from 'react'

export type CurrencyType = 'GBP' | 'USD' | 'EUR'
interface AppContext {
  accountBalances: { GBP: number; USD: number; EUR: number }
  setAccountBalances: Dispatch<
    SetStateAction<{ GBP: number; USD: number; EUR: number }>
  >
  currencyTypes: CurrencyType[]
}

export const AppContext = createContext<AppContext | undefined>(undefined)

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('App context must be used within a context provider')
  }
  return context
}

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const currencyTypes: CurrencyType[] = ['EUR', 'GBP', 'USD']
  const [accountBalances, setAccountBalances] = useState({
    EUR: 50,
    GBP: 50,
    USD: 50
  })

  return (
    <AppContext.Provider
      value={{
        accountBalances,
        setAccountBalances,
        currencyTypes
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
