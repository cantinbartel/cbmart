import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter } from "react-router-dom"
import './index.css'
import App from './App'
import ScrollToTop from './components/ScrollToTop'

const container = document.getElementById("root")
const rootContainer = ReactDOM.createRoot(container)
rootContainer.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </Provider>
)
