import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import './i18n'
import { Providers } from './Providers'
import reportWebVitals from './reportWebVitals'
import * as serviceWorker from './serviceWorker'

const container = document.getElementById('root')
if (!container) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(container)

// we could rewrite webpack configuration, but this is waaay easier...
// fixes "buffer is not defined" errors from rainbowkit (and any other dependency)
window.Buffer = window.Buffer || require('buffer').Buffer

root.render(
  <React.StrictMode>
    <Providers />
  </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
