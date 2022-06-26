import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./app";

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('app')

  const root = ReactDOM.createRoot(rootEl)
  root.render(<App />)
})
