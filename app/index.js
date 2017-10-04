import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from 'config/routes'

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

ReactDOM.render(
  <Provider store={store}>
    {getRoutes(checkAuth)}
  </Provider>,
  document.getElementById('app')
)
