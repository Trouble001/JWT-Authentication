import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AppProvider } from './context/AppContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AppProvider>
        <Provider store={store}>
          <div className='w-full h-full min-h-screen bg-slate-50 dark:bg-slate-900'>
            <App />
          </div>
        </Provider>
      </AppProvider>
    </ThemeProvider>
  </StrictMode>,
)
