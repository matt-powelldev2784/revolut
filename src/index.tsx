import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import App from 'components/App'
import { AppContextProvider } from 'context/AppContext'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <AppContextProvider>
    <App />
  </AppContextProvider>
)
