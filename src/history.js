/* eslint-disable no-undef */
let history

if (process.env.NODE_ENV === 'unittest') {
  history = require('history').createMemoryHistory()
} else {
  history = require('history').createBrowserHistory()
}

export default history
