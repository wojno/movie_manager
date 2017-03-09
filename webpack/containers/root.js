import React, { Component } from 'react'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import movies from '../reducers'
import { createStore, applyMiddleware } from 'redux'
//import Hello from '../components/hello'
import MyMoviesContainer from './myMoviesContainer'
import createLogger from 'redux-logger'
const loggerMiddleware = createLogger()

const store = createStore(
  movies,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <MyMoviesContainer />
      </Provider>
    )
  }
}
