import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import './index.css'
import routes from './routes'
import LoadingSpinner from './components/Shared/LoadingSpinner'

// import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<LoadingSpinner />}>{renderRoutes(routes)}</Suspense>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

// ok this is cool

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log)
