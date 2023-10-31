import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { PrimeReactProvider } from "primereact/api";
import store from './store/index.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <PrimeReactProvider value={{ unstyled: true, pt: {}  }}>
    <Provider store={store}>
      <App />
    </Provider>
  </PrimeReactProvider>
    
)
