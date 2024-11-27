import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction
} from 'react'

interface AppContext {
  eurBalance: number
  setEurBalance: Dispatch<SetStateAction<number>>
  gbpBalance: number
  setGbpBalance: Dispatch<SetStateAction<number>>
  usdBalance: number
  setUsdBalance: Dispatch<SetStateAction<number>>
  currencyTypes: string[]
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
  const [eurBalance, setEurBalance] = useState(50)
  const [gbpBalance, setGbpBalance] = useState(50)
  const [usdBalance, setUsdBalance] = useState(50)
  const currencyTypes = ['EUR', 'GBP', 'USD']

  return (
    <AppContext.Provider
      value={{
        eurBalance,
        setEurBalance,
        gbpBalance,
        setGbpBalance,
        usdBalance,
        setUsdBalance,
        currencyTypes
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
