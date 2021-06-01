import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { reducer } from './reducer'

const composeEnhancers =
  process.env.NODE_ENV === 'development' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose

export default createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
