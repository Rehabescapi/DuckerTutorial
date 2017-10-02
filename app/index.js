import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from 'config/routes'
import users from 'redux/modules/users'
import thunk from 'redux-thunk'
import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import {checkIfAuthed} from 'helpers/auth'
import restricted from 'helpers/restricted'

import * as reducers from 'redux/modules'
// import PropType from 'prop-types'
const store = createStore(combineReducers(reducers), compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f))

function checkAuth (component) {
  return restricted(component, store)
}
const isAuthed = checkIfAuthed(store)
console.log('is Auth  ' + isAuthed)
// console.log(nextState.location)

ReactDOM.render(
  <Provider store={store}>
    {getRoutes(checkAuth)}
  </Provider>,
  document.getElementById('app')
)
