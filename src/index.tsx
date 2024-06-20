import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import 'react-toastify/dist/ReactToastify.css'
import swDev from '../src/swDev'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)

swDev()
