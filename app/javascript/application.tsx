import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import Popper from 'popper.js'
import 'bootstrap/dist/js/bootstrap.bundle.min'

const App = () => {
  return (<div>Hello, Rails 7!</div>)
}

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('app')
  const root = ReactDOM.createRoot(rootEl)
  root.render(<App />)
})
