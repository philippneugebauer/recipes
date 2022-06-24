import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import Popper from 'popper.js'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./app";

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('app')

  const root = ReactDOM.createRoot(rootEl)
  root.render(<App />)
})
